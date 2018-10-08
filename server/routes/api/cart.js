const express = require('express');
const passport = require('passport');

const User = require('../../models/User');
const Book = require('../../models/Book');
const cleanCache = require('../../middlewares/cleanCache');
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
}), async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .cache({ key: req.user.id });
    if (user) {
      return res.json(user.cart);
    }
  } catch (err) {
    return res.status(404)
      .json({ usernotfound: 'User not found' });
  }
  return res.status(404)
    .json({ usernotfound: 'User not found' });
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
 *     security:
 *       - JWT: []
 */
router.post(
  '/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  cleanCache,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const book = await Book.findById(req.params.id);
      const newBook = {};
      newBook.bookid = req.params.id;
      newBook.title = book.title;
      newBook.price = book.price;
      newBook.coverUrl = book.coverUrl;
      newBook.authors = book.authors;
      newBook.quantity = 1;
      user.cart.unshift(newBook);
      const currentUser = await user.save();
      if (currentUser) {
        return res.json(currentUser.cart);
      }
    } catch (err) {
      return res.status(404)
        .json({ booknotfound: 'No books found' });
    }
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
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
 *     security:
 *       - JWT: []
 */
router.post(
  '/:id/:quantity',
  passport.authenticate('jwt', {
    session: false,
  }),
  cleanCache,
  async (req, res) => {
    const {
      errors,
      isValid,
    } = validateCartInput(req.params);
    if (!isValid) {
      return res.status(400)
        .json(errors);
    }

    try {
      const user = await User.findById(req.user.id);

      if (user.cart.filter(book => book.bookid.toString()
        === req.params.id).length === 0) {
        return res.status(404)
          .json({ booknotfound: 'No books found' });
      }
      // Find book index and update quantity
      const editIndex = user.cart.map(book => book.bookid.toString())
        .indexOf(req.params.id);
      user.cart[editIndex].quantity = req.params.quantity;
      // Save changes
      const currentUser = await user.save();
      if (currentUser) {
        return res.json(currentUser.cart);
      }
    } catch (err) {
      return res.status(404)
        .json({ booknotfound: 'No books found' });
    }
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
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
 *     security:
 *       - JWT: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cleanCache,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      // If cannot find book in user cart
      if (user.cart.filter(book => book.bookid.toString()
        === req.params.id).length === 0) {
        return res.status(404)
          .json({ booknotfound: 'No books found' });
      }
      // Find book, and get the delete index of the book
      const deleteIndex = user.cart.map(book => book.bookid.toString())
        .indexOf(req.params.id);
      user.cart.splice(deleteIndex, 1);
      // Save changes
      const currentUser = await user.save();
      if (currentUser) {
        return res.json(currentUser.cart);
      }
    } catch (err) {
      return res.status(404)
        .json({ booknotfound: 'No books found' });
    }
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
);

module.exports = router;
