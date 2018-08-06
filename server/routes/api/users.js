const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

// Load Input Validation
const validationRegisterInput = require('../../validation/register');
const validationLoginInput = require('../../validation/login');

const User = require('../../models/User');
const BookList = require('../../models/BookList');

const router = express.Router();

/**
 * @swagger
 * /api/users/test:
 *   get:
 *     tags:
 *       - User
 *     summary: Tests users route
 *     description: Tests users route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User Works
 */
router.get('/test', (req, res) => res.json({
  msg: 'User Works',
}));

/**
 * @swagger
 * definitions:
 *   UserForRegister:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   UserForLogin:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

// https://swagger.io/docs/specification/2-0/authentication/api-keys/
/**
 * @swagger
 * securityDefinitions:
 *   JWT:
 *     description: JWT token from user login
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register user
 *     description: Registers a new user with different email from database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Created user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserForRegister'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Form validation fail
 */
router.post('/register', (req, res) => {
  const {
    errors,
    isValid,
  } = validationRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }
    // TODO
    // const avatar = 'temp';
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      // avatar,
      password: req.body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) throw error;
        newUser.password = hash;
        newUser
          .save()
          .then(userObject => res.json(userObject))
          .catch(errorMsg => console.log(errorMsg));
      });
    });
    return false;
  });
  return false;
});


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login user into the system
 *     description: User login (example> email:test@test.com passwprd:123456)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user email
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserForLogin'
 *     responses:
 *       200:
 *         description: Successfully login and return JWT Token
 *       400:
 *         description: Invalid username/password supplied
 */
router.post('/login', (req, res) => {
  const {
    errors,
    isValid,
  } = validationLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email } = req.body;
  const { password } = req.body;
  // Find user by email
  User.findOne({
    email,
  })
    .then((user) => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      // Check Password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // User Matched
            const payload = {
              id: user.id,
              name: user.name,
              // avatar: user.avatar,
            }; // Create JWT payload
            // Sign Token
            jwt.sign(payload,
              keys.secretOrKey, {
                // expires in 3 hours
                expiresIn: 10800,
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              });
            return true;
          }
          errors.password = 'Password incorrect';
          return res.status(404).json(errors);
        });
      return false;
    });
  return false;
});

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     tags:
 *       - User
 *     summary: Return current user
 *     description: This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return current user successfully
 *     security:
 *       - JWT: []
 */
router.get('/current', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});

/**
 * @swagger
 * /api/users/current/like/booklist:
 *   get:
 *     tags:
 *       - BookList
 *     summary: Return the bookLists current user liked
 *     description: This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return bookLists successfully
 *     security:
 *       - JWT: []
 */
router.get('/current/like/booklist', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  BookList.find({ user: req.user.id })
    .then((bookLists) => {
      if (bookLists) {
        return res.json(bookLists);
      } else {
        return res.status(404).json({
          booklistnotfound: 'No booklists found',
        });
      }
    })
    .catch(() => res.status(404).json({
      booklistnotfound: 'No booklists found',
    }));
});

module.exports = router;
