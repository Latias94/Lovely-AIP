const express = require('express');
const passport = require('passport');

// Load Validation
const validateCategoryInput = require('../../validation/category');

// Load Category Model
const Category = require('../../models/Category');
// Load User Model
const User = require('../../models/User');
// Load Book Model
const Book = require('../../models/Book');

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
 *     summary: Get all categories with their books
 *     description: Get all categories with their books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all categories successfully
 *       404:
 *         description: No categories found
 */
router.get('/', (req, res) => {
  const allCategories = [];
  let counter = 0;
  Category.find()
    .then((categories) => {
      categories.forEach((category) => {
        Book.find({ category: category._id })
          .then((books) => {
            counter += 1;
            const categoryResult = {};
            categoryResult._id = category._id;
            categoryResult.slug = category.slug;
            categoryResult.name = category.name;
            categoryResult.subCategories = category.subCategories;
            categoryResult.books = books;
            allCategories.push(categoryResult);
            if (counter === categories.length) {
              return res.json(allCategories);
            }
            return false;
          });
      });
    })
    .catch(() => {
      return res.status(404).json({ categorynotfound: 'No categories found' });
    });
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
      categoryResult._id = category._id;
      categoryResult.slug = category.slug;
      categoryResult.name = category.name;
      categoryResult.subCategories = category.subCategories;
      Book.find({ category: category._id })
        .then((books) => {
          categoryResult.books = books;
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
      categoryResult.subCategories = category.subCategories;
      Book.find({ category: category._id })
        .then((books) => {
          categoryResult.books = books;
          return res.json(categoryResult);
        });
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
 */
/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags:
 *       - Category
 *     summary: Create category
 *     description: Registers a new category with different name from database. Category can only be created by staff.
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
      }
      // category not exist
      const {
        errors,
        isValid,
      } = validateCategoryInput(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }
      const newCategory = new Category({
        name: req.body.name,
      });

      newCategory.save().then((categoryObject) => {
        return res.json(categoryObject);
      });
      return false;
    });

    return false;
  },
);

/**
 * @swagger
 * definitions:
 *   AddSubCategory:
 *     properties:
 *       name:
 *         type: string
 *       id:
 *         type: string
 *       slug:
 *         type: string
 */

/**
 * @swagger
 * /api/categories/{id}:
 *   post:
 *     tags:
 *       - Category
 *     summary: Edit category
 *     description: Edit a exist category (eg add sub category). Category can only be edited by staff. Slug of subCategory has higher priority than id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Edit category object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AddSubCategory'
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

    const errors = {};
    Category.findById(req.params.id)
      .then((category) => {
        if (category) {
          if (req.body.slug) {
            Category.findOne({ slug: req.body.slug })
              .then((subCategory) => {
                category.updateDate = Date.now();
                // Update
                category.subCategories.unshift({
                  subid: subCategory._id,
                  subname: subCategory.name,
                });
                category.save().then(categoryObject => res.json(categoryObject));
              })
              .catch(() => res.status(404).json({
                subcategorynotfound: 'No subCategories found',
              }));
          } else if (req.body.id) {
            Category.findById(req.body.id)
              .then((subCategory) => {
                category.updateDate = Date.now();
                // Update
                category.subCategories.unshift({
                  subid: subCategory._id,
                  subname: subCategory.name,
                });
                category.save().then(categoryObject => res.json(categoryObject));
              })
              .catch(() => res.status(404).json({
                subcategorynotfound: 'No subCategories found',
              }));
          }
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
 *       - name: "id"
 *         in: "path"
 *         description: "ID of category that needs to be deleted"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully deleted category Object
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
        }
        // user is staff
        Category.findByIdAndRemove(req.params.id, (err) => {
          return err
            ? res.status(404).json({ categorynotfound: 'No categories found' })
            : res.json({ success: true });
        });
      }
      return true;
    });
  },
);

module.exports = router;
