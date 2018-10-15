const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const crypto = require('crypto');
const mailer = require('./../../utils/mailer');
const keys = require('../../config/keys');
const { authLimiter } = require('../../middlewares/rateLimit');
const {
  activationfail,
  emailexist,
  usernotfound,
  notsuccess,
  success,
  isactive,
  notactive,
  pwdincorrect,
  booklistnotfound,
  reviewnotfound,
  avatarnotfound,
} = require('../../config/errMessage');
// Load Input Validation
const validationRegisterInput = require('../../validation/register');
const validationLoginInput = require('../../validation/login');

const User = require('../../models/User');
const BookList = require('../../models/BookList');
const Review = require('../../models/Review');

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
/**
 * @swagger
 * definitions:
 *   UserForActivate:
 *     properties:
 *       email:
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
 *     description: Registers a new user with different email from database, and send email for activation. Allow 2 request each minute only (Rate Limit).
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
router.post('/register', authLimiter, async (req, res) => {
  const {
    errors,
    isValid,
  } = validationRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400)
      .json(errors);
  }
  try {
    // Validate whether email is existed
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400)
        .json(emailexist);
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      // avatar,
      password: req.body.password,
      activeToken: '',
      activeExpires: null,
    });

    crypto.randomBytes(20, (err, buf) => {
      // unique token
      newUser.activeToken = req.body.email + buf.toString('hex');
      // expire time is one day
      newUser.activeExpires = Date.now() + 24 * 3600 * 1000;
      // const link = `http://localhost:5000/api/users/active/${newUser.activeToken}`;
      const link = `${keys.frontendHost}/activate/${newUser.activeToken}`;
      // send validation email
      mailer({
        to: req.body.email,
        subject: 'Welcome to Knight Frank',
        html: `<p>Please click <a href="${link}"> Here </a> to activate your account.</p>`,
      });
    });

    bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (error, hash) => {
        if (error) {
          return res.status(404)
            .json(notsuccess);
        }
        newUser.password = hash;
        const userObject = await newUser.save();
        if (userObject) {
          return res.json(success);
        } else {
          return res.status(404)
            .json(notsuccess);
        }
      });
    });
  } catch (err) {
    return res.status(404)
      .json(notsuccess);
  }
  return false;
});

/**
 * @swagger
 * /api/users/active/{active}:
 *   get:
 *     tags:
 *       - User
 *     summary: Activate user account
 *     description: Activate user account.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "active"
 *         description: "user activate token"
 *         in: path
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully activate account
 *       404:
 *         description: The token is invalid. Please Re-activate your email.
 */
router.get('/active/:activeToken', async (req, res) => {
  try {
    const user = await User.findOne({
      activeToken: req.params.activeToken,
      activeExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(404)
        .json(activationfail);
    }
    user.active = true;
    const userObj = user.save();
    if (userObj) {
      return res.json(success);
    } else {
      return res.status(404)
        .json(notsuccess);
    }
  } catch (err) {
    return res.status(404)
      .json(notsuccess);
  }
});

/**
 * @swagger
 * /api/users/active/:
 *   post:
 *     tags:
 *       - User
 *     summary: Send activate email to user email
 *     description: Send activate email to user email. Allow 2 request each minute only (Rate Limit).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user email
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserForActivate'
 *     responses:
 *       200:
 *         description: Successfully send activate email
 *       404:
 *         description: No user found Or Account has activated
 */
router.post('/active/', authLimiter, async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404)
        .json(usernotfound);
    }

    if (user.active) {
      return res.status(404)
        .json(isactive);
    }
    crypto.randomBytes(20, async (err, buf) => {
      // unique token
      user.activeToken = user.email + buf.toString('hex');
      // expire time is one day
      user.activeExpires = Date.now() + 24 * 3600 * 1000;
      const link = `${keys.frontendHost}/activate/${user.activeToken}`;
      // resend validation email
      mailer({
        to: req.body.email,
        subject: 'Welcome to Knight Frank',
        html: `<p>Please click <a href="${link}"> Here </a> to activate your account.</p>`,
      });

      const userObj = await user.save();
      if (userObj) {
        return res.json(success);
      } else {
        return res.status(404)
          .json(notsuccess);
      }
    });
  } catch (err) {
    return res.status(404)
      .json(notsuccess);
  }
  return res.status(404)
    .json(notsuccess);
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
 *       404:
 *         description: Account is not activated
 */
router.post('/login', async (req, res) => {
  const {
    errors,
    isValid,
  } = validationLoginInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400)
      .json(errors);
  }

  const { email } = req.body;
  const { password } = req.body;
  // Find user by email
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404)
        .json(usernotfound);
    }
    // Check Password
    bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          if (!user.active) {
            return res.status(404)
              .json(notactive);
          }
          // User Matched
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            isStaff: user.isStaff
            // avatar: user.avatar,
          }; // Create JWT payload
          // Sign Token
          jwt.sign(payload,
            keys.secretOrKey, {
              // expires in 3 hours
              expiresIn: 10800,
            },
            (err, token) => {
              return res.json({
                success: true,
                token: `Bearer ${token}`,
              });
            });
        } else {
          return res.status(404)
            .json(pwdincorrect);
        }
      });
  } catch (err) {
    return res.status(404)
      .json(usernotfound);
  }
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
}), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404)
        .json(usernotfound);
    } else if (user.avatar !== null) {
      const {
        id, name, email, isStaff
      } = req.user;
      return res.json({
        id,
        name,
        email,
        isStaff,
        avatar: user.avatar
      });
    } else {
      return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        isStaff: req.user.isStaff
      });
    }
  } catch (err) {
    return res.status(404)
      .json(notsuccess);
  }
});

/**
 * @swagger
 * /api/users/current/booklist:
 *   get:
 *     tags:
 *       - User
 *     summary: Return the bookLists current user created
 *     description: This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return bookLists successfully
 *     security:
 *       - JWT: []
 */
router.get('/current/booklist', passport.authenticate('jwt', {
  session: false,
}), async (req, res) => {
  try {
    const bookLists = await BookList.find({ user: req.user.id })
      .cache();
    if (bookLists) {
      return res.json(bookLists);
    } else {
      return res.status(404)
        .json(booklistnotfound);
    }
  } catch (err) {
    return res.status(404)
      .json(booklistnotfound);
  }
});

/**
 * @swagger
 * /api/users/current/review:
 *   get:
 *     tags:
 *       - User
 *     summary: Return the reviews current user created
 *     description: This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return reviews successfully
 *     security:
 *       - JWT: []
 */
router.get('/current/review', passport.authenticate('jwt', {
  session: false,
}), async (req, res) => {
  try {
    const reviews = await Review.findById({ user: req.user.id })
      .cache({ key: req.params.id });
    if (reviews) {
      return res.json(reviews);
    } else {
      return res.status(404)
        .json(reviewnotfound);
    }
  } catch (err) {
    return res.status(404)
      .json(reviewnotfound);
  }
});

/**
 * @swagger
 * /api/users/avatar/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user avatar according to user id
 *     description: Get user avatar according to user id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id of the user"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully get the avatar
 *       404:
 *         description: No avatars found
 */
router.get('/avatar/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .cache({ key: req.params.id });
    if (user.avatar) {
      return res.json({
        avatar: user.avatar,
      });
    } else {
      return res.status(404)
        .json(avatarnotfound);
    }
  } catch (err) {
    return res.status(404)
      .json(usernotfound);
  }
});

/**
 * @swagger
 * /api/users/:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     description: Get all users. This can only be done by the staff.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully get the users
 *       401:
 *         description: Cannot get the data
 *     security:
 *       - JWT: []
 */
router.get('/', passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (!req.user.isStaff) {
        return res.status(401)
          .json({ unauthorized: 'Cannot modify the book' });
      }
      const users = await User.find()
        .select({
          name: 1,
          email: 1,
          active: 1,
        });
      return res.json(users);
    } catch (err) {
      return res.status(404)
        .json(usernotfound);
    }
  });

module.exports = router;
