const express = require('express');
const passport = require('passport');

const User = require('../../models/User');
const Book = require('../../models/Book');
const validateCartInput = require('../../validation/cart');

const router = express.Router();


/**
 * @swagger
 * /api/cart/test:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Tests cart route
 *     description: Tests cart route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Cart Works
 */
router.get('/test', (req, res) => res.json({ msg: 'Cart Works' }));

/**
 * @swagger
 * /api/cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get all books in the user cart
 *     description: Get all books in the user cart. This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all books in the user cart successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Something error
 *     security:
 *       - JWT: []
 */
router.get('/', passport.authenticate('jwt', {
  session: false,
}), (req, res) => {
  User.findById(req.user.id)
    .then((user) => {
      return res.json(user.cart);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @swagger
 * /api/cart/{id}:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add one book into cart
 *     description: Add one book into cart. This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "id of book that want to add into cart"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully created
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book Id not exist or Something wrong
 */
router.post(
  '/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    User.findById(req.user.id)
      .then((user) => {
        Book.findById(req.params.id)
          .then((book) => {
            const newBook = {};
            newBook.bookid = req.params.id;
            newBook.title = book.title;
            newBook.price = book.price;
            newBook.coverUrl = book.coverUrl;
            newBook.quantity = 1;
            user.cart.unshift(newBook);
            user.save().then(currentUser => res.json(currentUser.cart));
          })
          .catch(() => res.status(404).json({
            booknotfound: 'No books found',
          }));
      });
  },
);

/**
 * @swagger
 * /api/cart/{id}/{quantity}:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Edit purchase quantity of book in cart
 *     description: Add one book into cart. This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "quantity"
 *         in: "path"
 *         description: "Purchase quantity of book"
 *         required: true
 *         type: "Number"
 *     responses:
 *       200:
 *         description: Successfully edited
 *       400:
 *         description: Quantity is invalid
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book id not exist or Something wrong
 */
router.post(
  '/:id/:quantity',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    const {
      errors,
      isValid,
    } = validateCartInput(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findById(req.user.id)
      .then((user) => {
        if (req.params.quantity <= 0) {
          errors.quantity = 'Quantity is invalid';
          return res
            .status(400)
            .json(errors);
        }
        if (user.cart.filter(book => book.bookid.toString()
          === req.params.id).length === 0) {
          return res
            .status(404)
            .json({
              booknotfound: 'No books found',
            });
        }
        const editIndex = user.cart.map(book => book.bookid.toString()).indexOf(req.params.id);
        user.cart[editIndex].quantity = req.params.quantity;
        user.save().then(currentUser => res.json(currentUser.cart));
        return false;
      });
    return false;
  },
);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Delete one book from cart
 *     description: Delete one book from cart. This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of book that needs to be deleted"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully deleted the book
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No books found
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then((user) => {
        if (user.cart.filter(book => book.bookid.toString()
          === req.params.id).length === 0) {
          return res
            .status(404)
            .json({
              booknotfound: 'No books found',
            });
        }
        const editIndex = user.cart.map(book => book.bookid.toString()).indexOf(req.params.id);
        user.cart.splice(editIndex, 1);
        user.save().then(currentUser => res.json(currentUser.cart));
        return true;
      });
  },
);

module.exports = router;
