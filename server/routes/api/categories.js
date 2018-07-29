const express = require('express');
const passport = require('passport');

// Load Validation
const validateCategoryInput = require('../../validation/category');

// Load Category Model
const Category = require('../../models/Category');
// Load User Model
const User = require('../../models/User');
// Load Product Model
const Product = require('../../models/Product');

const router = express.Router();


/**
 * @swagger
 * /api/categories/test:
 *   get:
 *     tags:
 *       - Category
 *     summary: Tests categories route
 *     description: Tests categories route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Category Works
 */
router.get('/test', (req, res) => res.json({ msg: 'Category Works' }));

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get all categories
 *     description: Get all categories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all categories successfully
 *       404:
 *         description: No categories found
 */
router.get('/', (req, res) => {
  const errors = {};

  Category.find()
    .then((categories) => {
      if (!categories) {
        errors.categorynotfound = 'No categories found';
        return res.status(404).json(errors);
      }

      res.json(categories);
      return false;
    })
    .catch(() => res.status(404).json({ categorynotfound: 'No categories found' }));
});

/**
 * @swagger
 * /api/categories/slug/{slug}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by slug
 *     description: Get category by slug. Example http://localhost:5000/api/categories/slug/game Any details please refer to https://github.com/talha-asad/mongoose-url-slugs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get category successfully
 *       404:
 *         description: No categories found
 */
router.get('/slug/:slug', (req, res) => {
  const errors = {};

  Category.findOne({ slug: req.params.slug })
    .then((category) => {
      if (!category) {
        errors.categorynotfound = 'No categories found';
        return res.status(404).json(errors);
      }
      const categoryResult = {};
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      categoryResult._id = category._id;
      categoryResult.slug = category.slug;
      categoryResult.name = category.name;
      categoryResult.description = category.description;
      Product.find({ category: category._id })
        .then((products) => {
          categoryResult.products = products;
          return res.json(categoryResult);
        });
      return false;
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags:
 *       - Category
 *     summary: Get category by id
 *     description: Get category by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of category that needs to be fetched"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Get category successfully
 *       404:
 *         description: No categories found
 */
router.get('/:id', (req, res) => {
  const errors = {};

  Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        errors.categorynotfound = 'No categories found';
        return res.status(404).json(errors);
      }

      const categoryResult = {};
      categoryResult.id = category._id;
      categoryResult.slug = category.slug;
      categoryResult.name = category.name;
      categoryResult.description = category.description;
      Product.find({ category: category._id })
        .then((products) => {
          categoryResult.products = products;
          return res.json(categoryResult);
        })
      return false;
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @swagger
 * definitions:
 *   Category:
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 */
/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create category
 *     description: Registers a new category with different name from database. Category can only be created by staff. Description field is not required.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Created category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Form validation fail
 *       401:
 *         description: Cannot create the category
 *       404:
 *         description: Category name has existed
 */
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    // find out whether user is staff
    User.findOne({ user: req.user.id }).then((user) => {
      if (user) {
        if (!user.isStaff) {
          return res.status(401).json({
            unauthorized: 'Cannot create the category',
          });
        }
      }
      return true;
    });

    Category.findOne({ name: req.body.name }).then((hasFound) => {
      if (hasFound) {
        return res.status(404).json({
          categoryexist: 'Category name has existed',
        });
      } else {
        const {
          errors,
          isValid,
        } = validateCategoryInput(req.body);

        // Check Validation
        if (!isValid) {
          // If any errors, send 400 with errors object
          return res.status(400).json(errors);
        }

        const newCategory = new Category({
          description: req.body.description,
          name: req.body.name,
        });

        newCategory.save().then((category) => {
          return res.json(category);
        });
        return false;
      }
    });

    return false;
  },
);

/**
 * @swagger
 * /api/categories/{id}:
 *   post:
 *     tags:
 *       - Category
 *     summary: Edit category
 *     description: Edit a exist category. Category can only be edited by staff. Both name and description fields are required.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Edit category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of category that needs to be edited"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully edited
 *       401:
 *         description: Cannot edit the category
 *       404:
 *         description: No categories found or Category name has existed
 */
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // find out whether user is staff
    User.findOne({ user: req.user.id }).then((user) => {
      if (user) {
        if (!user.isStaff) {
          return res.status(401).json({
            unauthorized: 'Cannot delete the category',
          });
        }
      }
      return true;
    });

    const { errors, isValid } = validateCategoryInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const categoryFields = {};
    if (req.body.description) categoryFields.description = req.body.description;
    if (req.body.name) categoryFields.name = req.body.name;

    Category.findById(req.params.id)
      .then((category) => {
        if (category) {
          categoryFields.updateDate = Date.now();
          // Update
          Category.findByIdAndUpdate(
            req.params.id,
            categoryFields,
            { new: true },
            (err, categoryObject) => {
              return err ? res.status(404).json(err)
                : res.json(categoryObject);
            },
          );
        } else {
          errors.categorynotfound = 'No categories found';
          return res.status(404).json(errors);
        }
        return false;
      });
    return false;
  },
);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags:
 *       - Category
 *     summary: Delete category
 *     description: Delete a exist category. Category can only be deleted by staff. Description field is not required.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Delete category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Category'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of category that needs to be deleted"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully deletedproductObject
 *       401:
 *         description: Cannot delete the category
 *       404:
 *         description: No categories found
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    // find out whether user is staff
    User.findById(req.user.id).then((user) => {
      if (user) {
        if (!user.isStaff) {
          errors.unauthorized = 'Cannot delete the category';
          return res.status(401).json(errors);
        } else {
          Category.findByIdAndRemove(req.params.id, (err) => {
            return err
              ? res.status(404).send(err)
              : res.json({ success: true });
          });
        }
      }
      return true;
    });
  },
);

module.exports = router;
