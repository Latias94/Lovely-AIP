const express = require('express');
const passport = require('passport');

// Product model
const Product = require('../../models/Product');

// Validation
const validateProductInput = require('../../validation/product');
const validateCommentInput = require('../../validation/comment');

const router = express.Router();

// @route   GET api/products/test
// @desc    Tests product route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Products Works',
}));

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', (req, res) => {
  Product.find()
    .sort({
      date: -1,
    })
    .then(products => res.json(products))
    .catch(() => res.status(404).json({
      productnotfound: 'No products found',
    }));
});

// @route   GET api/products/:id
// @desc    Get product by id
// @access  Public
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(() => res.status(404).json({
      productnotfound: 'No product found with that ID',
    }));
});

// @route   POST api/products
// @desc    Create product
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    const {
      errors,
      isValid,
    } = validateProductInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newProduct = new Product({
      user: req.user.id,
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      totalInventory: req.body.totalInventory,
      detail: req.body.detail,
    });

    newProduct.save().then(product => res.json(product));
    return false;
  },
);

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        // Check for product owner
        if (product.user.toString() !== req.user.id) {
          return res
            .status(401)
            .json({
              notauthorized: 'User not authorized',
            });
        }

        // Delete
        Product.remove().then(() => res.json({
          success: true,
        }));
        return false;
      })
      .catch(() => res.status(404).json({
        productnotfound: 'No product found',
      }));
  },
);

// @route   POST api/products/like/:id
// @desc    Like product
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        if (
          product.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({
              alreadyliked: 'User already liked this product',
            });
        }

        // Add user id to likes array
        product.likes.unshift({
          user: req.user.id,
        });

        product.save().then(productObject => res.json(productObject));
        return false;
      })
      .catch(() => res.status(404).json({
        productnotfound: 'No product found',
      }));
  },
);

// @route   POST api/products/unlike/:id
// @desc    Unlike product
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        if (
          product.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({
              notliked: 'You have not yet liked this product',
            });
        }

        // Get remove index
        const removeIndex = product.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        product.likes.splice(removeIndex, 1);

        // Save
        product.save().then(productObject => res.json(productObject));
        return false;
      })
      .catch(() => res.status(404).json({
        productnotfound: 'No product found',
      }));
  },
);

// @route   POST api/products/comment/:id
// @desc    Add comment to product
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    const {
      errors,
      isValid,
    } = validateCommentInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Product.findById(req.params.id)
      .then((product) => {
        const newComment = {
          text: req.body.text,
          title: req.body.title,
          user: req.user.id,
        };

        // Add to comments array
        product.comments.unshift(newComment);

        // Save
        product.save().then(productObject => res.json(productObject));
      })
      .catch(() => res.status(404).json({
        productnotfound: 'No product found',
      }));
    return false;
  },
);

// @route   DELETE api/products/comment/:id/:comment_id
// @desc    Remove comment from product
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        // Check to see if comment exists
        if (
          product.comments.filter(
            /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
            comment => comment._id.toString() === req.params.comment_id,
          ).length === 0
        ) {
          return res
            .status(404)
            .json({
              commentnotexists: 'Comment does not exist',
            });
        }

        // Get remove index
        const removeIndex = product.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        product.comments.splice(removeIndex, 1);

        product.save().then(productObject => res.json(productObject));
        return false;
      })
      .catch(() => res.status(404).json({
        productnotfound: 'No product found',
      }));
  },
);

// @route   POST api/products/:id
// @desc    Update product
// @access  Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProductInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const productFields = {};
    if (req.body.text) {
      productFields.text = req.body.text;
    }
    if (req.body.name) {
      productFields.name = req.body.name;
    }
    if (req.body.price) {
      productFields.price = req.body.price;
    }
    if (req.body.totalInventory) {
      productFields.totalInventory = req.body.totalInventory;
    }
    // category id
    if (req.body.category) {
      productFields.category = req.body.category;
    }

    Product.findById(req.params.id)
      .then((product) => {
        if (product.user !== req.user.id) {
          errors.unauthorized = 'You are not the owner of product';
          res.status(401).json(errors);
        }

        if (product) {
          productFields.updateDate = Date.now();
          // Update
          product.findOneAndUpdate(
            { _id: req.params.id },
            { $set: productFields },
            { new: true },
          ).then(productObject => res.json(productObject));
        } else {
          errors.productnotfound = 'No product found';
          res.status(404).json(errors);
        }
      });
    return false;
  },
);

module.exports = router;
