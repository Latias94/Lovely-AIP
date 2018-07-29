const express = require('express');
const passport = require('passport');

// Product model
const Product = require('../../models/Product');
const Category = require('../../models/Category');

// Validation
const validateProductInput = require('../../validation/product');
const validateCommentInput = require('../../validation/comment');

const router = express.Router();

/**
 * @swagger
 * /api/products/test:
 *   get:
 *     tags:
 *       - Product
 *     summary: Tests products route
 *     description: Tests products route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Product Works
 */
router.get('/test', (req, res) => res.json({
  msg: 'Product Works',
}));

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get all products
 *     description: Get all products
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all products successfully
 *       404:
 *         description: No products found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get product by id
 *     description: Get product by id. For some reason, please send an extra request to find out whether the related category is exist.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of product that needs to be fetched"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Get product successfully
 *       404:
 *         description: No products found with that ID
 */
router.get('/:id', (req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(() => res.status(404).json({
      productnotfound: 'No products found with that ID',
    }));
});

/**
 * @swagger
 * definitions:
 *   Product:
 *     properties:
 *       name:
 *         type: string
 *       text:
 *         type: string
 *       category:
 *         type: string
 *       price:
 *         type: integer
 */
/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create product
 *     description: Create a new product. This can only be done by the logged in user (add JWT token to header). Category field (category id) is not required.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Created product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Form validation fail
 *       404:
 *         description: Cannot create the Product with invalid category ID
 */
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

    if (req.body.category) {
      // find whether category is exist
      Category.findById(req.body.category)
        .then((category) => {
          if (!category) {
            errors.categorynotfound = 'No categories found with that ID';
            return res.status(400).json(errors);
          }
          return false;
        })
        .catch(() => {
          return res.status(404).json({
            categorynotfound: 'Cannot create the Product with invalid category ID',
          });
        });
    }

    const newProduct = new Product({
      user: req.user.id,
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      totalInventory: req.body.totalInventory,
      text: req.body.text,
    });

    newProduct.save().then((product) => {
      return res.json(product);
    });
    return false;
  },
);

/**
 * @swagger
 * /api/products/slug/{slug}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get product by slug
 *     description: Get product by slug.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get product successfully
 *       404:
 *         description: No products found
 */
router.get('/slug/:slug', (req, res) => {
  const errors = {};

  Product.findOne({ slug: req.params.slug })
    .then((product) => {
      if (!product) {
        errors.categorynotfound = 'No products found';
        return res.status(404).json(errors);
      } else {
        return res.json(product);
      }
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete product
 *     description: Delete a exist product owned by current user. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Delete product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of product that needs to be deleted"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       401:
 *         description: Cannot delete the product
 *       404:
 *         description: No products found
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Product.findById(req.params.id)
      .then((product) => {
        if (product) {
          // Check for product owner
          if (product.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({
                notauthorized: 'User not authorized',
              });
          } else {
            // Delete
            Product.findByIdAndRemove(req.params.id, (err) => {
              return err
                ? res.status(404).send(err)
                : res.json({ success: true });
            });
          }
        } else {
          return res.status(404).json({
            productnotfound: 'No products found',
          });
        }
        return false;
      })
      .catch(() => res.status(404).json({
        productnotfound: 'No products found',
      }));
  },
);

/**
 * @swagger
 * /api/products/like/{id}:
 *   post:
 *     tags:
 *       - Product
 *     summary: Like product
 *     description: Like a exist product. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of product that needs to be liked"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully liked
 *       400:
 *         description: User already liked this product
 *       404:
 *         description: No products found
 */
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
        productnotfound: 'No products found',
      }));
  },
);

/**
 * @swagger
 * /api/products/unlike/{id}:
 *   post:
 *     tags:
 *       - Product
 *     summary: Unlike product
 *     description: Unlike a exist product. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of product that needs to be unliked"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully Unliked
 *       400:
 *         description: You have not yet liked this product
 *       404:
 *         description: No products found
 */
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
        productnotfound: 'No products found',
      }));
  },
);
/**
 * @swagger
 * definitions:
 *   Comment:
 *     properties:
 *       title:
 *         type: string
 *       text:
 *         type: string
 */
/**
 * @swagger
 * /api/products/comment/{id}:
 *   post:
 *     tags:
 *       - Product
 *     summary: Add comment to product
 *     description: Add comment to product. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Comment object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Comment'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of comment that needs to be added"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully added comment
 *       400:
 *         description: Form validation fail
 *       404:
 *         description: No products found
 */
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
        productnotfound: 'No products found',
      }));
    return false;
  },
);

/**
 * @swagger
 * /api/products/comment/{id}/{comment_id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Remove comment from product
 *     description: Remove comment from product. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Comment object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Comment'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of product that needs to be modified"
 *         required: true
 *         type: "string"
 *       - name: "comment_id"
 *         in: "path"
 *         description: "ID of comment that needs to be deleted"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully removed comment
 *       404:
 *         description: No products found or comment does not exist
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   post:
 *     tags:
 *       - Product
 *     summary: Edit product
 *     description: Edit a exist product owned by current user. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Edit product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of product that needs to be edited"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully edited
 *       401:
 *         description: You are not the owner of product
 *       404:
 *         description: No products found
 */
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
        // if find product
        if (product) {
          // if product user isnt current user
          if (product.user.toString() !== req.user.id) {
            errors.unauthorized = 'You are not the owner of product';
            return res.status(401).json(errors);
          } else {
            productFields.updateDate = Date.now();
            // Update
            Product.findByIdAndUpdate(
              req.params.id,
              productFields,
              { new: true },
              (err, productObject) => {
                return err ? res.status(404).json(err)
                  : res.json(productObject);
              },
            );
          }
        } else {
          errors.productnotfound = 'No products found';
          return res.status(404).json(errors);
        }
        return false;
      });
    return false;
  },
);

module.exports = router;
