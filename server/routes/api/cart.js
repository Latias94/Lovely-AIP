const express = require('express');
const passport = require('passport');

const User = require('../../models/User');
const Book = require('../../models/Book');
const cleanCache = require('../../middlewares/cleanCache');
const {
  notsuccess,
  success,
  usernotfound,
  booknotfound,
} = require('../../config/errMessage');
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
    } else {
      return res.status(404)
        .json({ usernotfound: 'User not found' });
    }
  } catch (e) {
    return res.status(404)
      .json(usernotfound);
  }
});

/**
 * @swagger
 * definitions:
 *   AddBookToCart:
 *     properties:
 *       id:
 *         type: string
 *       quantity:
 *         type: number
 */
/**
 * @swagger
 * /api/cart:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add books into cart
 *     description: Add books into cart. This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Add books to user cart
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AddBookToCart'
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
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  cleanCache,
  async (req, res) => {
    const {
      errors,
      isValid,
    } = validateCartInput(req.body);
    if (!isValid) {
      return res.status(400)
        .json(errors);
    }

    try {
      const user = await User.findById(req.user.id);
      const book = await Book.findById(req.body.id);

      if (book) {
        if (user.cart.filter(bookInCart => bookInCart.bookid.toString()
          === req.body.id).length !== 0) {
          // If book have existed in user cart, edit that book directly
          const editIndex = user.cart.map(bookInCart => bookInCart.bookid.toString())
            .indexOf(req.body.id);
          user.cart[editIndex].quantity += req.body.quantity;
        } else {
          // Can not found the book in user cart, then add books into user cart
          const newBook = {};
          newBook.bookid = req.body.id;
          newBook.title = book.title;
          newBook.price = book.price;
          newBook.coverUrl = book.coverUrl;
          newBook.authors = book.authors;
          newBook.quantity = req.body.quantity;
          user.cart.unshift(newBook);
        }

        const currentUser = await user.save();
        if (currentUser) {
          return res.json(success);
        }
      }
      return res.status(404)
        .json(booknotfound);
    } catch (e) {
      return res.status(404)
        .json(booknotfound);
    }
  }
);

/**
 * @swagger
 * definitions:
 *   EditBookInCart:
 *     properties:
 *       quantity:
 *         type: number
 */
/**
 * @swagger
 * /api/cart/{id}:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Edit purchase quantity of book in cart
 *     description: Edit one book into cart. This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Add books to user cart
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/EditBookInCart'
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
  '/:id/',
  passport.authenticate('jwt', {
    session: false,
  }),
  cleanCache,
  async (req, res) => {
    const {
      errors,
      isValid,
    } = validateCartInput(req.body);
    if (!isValid) {
      return res.status(400)
        .json(errors);
    }
    try {
      const user = await User.findById(req.user.id);

      if (user.cart.filter(book => book.bookid.toString()
        === req.params.id).length === 0) {
        return res.status(404)
          .json(booknotfound);
      }
      const editIndex = user.cart.map(book => book.bookid.toString())
        .indexOf(req.params.id);
      user.cart[editIndex].quantity = req.body.quantity;
      const currentUser = await user.save();
      if (currentUser) {
        return res.json(success);
      } else {
        return res.status(404)
          .json(booknotfound);
      }
    } catch (e) {
      return res.status(404)
        .json(booknotfound);
    }
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
 *         description: Successfully deleted the book from cart
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
      if (user.cart.filter(book => book.bookid.toString()
        === req.params.id).length === 0) {
        return res.status(404)
          .json(booknotfound);
      }
      const editIndex = user.cart.map(book => book.bookid.toString())
        .indexOf(req.params.id);
      user.cart.splice(editIndex, 1);
      const currentUser = await user.save();
      if (currentUser) {
        return res.json(success);
      } else {
        return res.json(notsuccess);
      }
    } catch (e) {
      return res
        .status(404)
        .json(booknotfound);
    }
  }
);

/**
 * @swagger
 * /api/cart:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Delete all book from cart
 *     description: Delete all book from cart. This can only be done by the logged in user (add JWT token to header)
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Delete all books from cart successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Fail to delete all books from cart
 *     security:
 *       - JWT: []
 */
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  cleanCache,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.cart = [];
      const currentUser = await user.save();
      if (currentUser && currentUser.cart.length === 0) {
        return res.json(success);
      } else {
        return res.status(404)
          .json(notsuccess);
      }
    } catch (e) {
      return res.status(404)
        .json(notsuccess);
    }
  }
);

module.exports = router;
