const express = require('express');
const passport = require('passport');

// Load Validation
const validateCategoryInput = require('../../validation/category');

// Load Category Model
const Category = require('../../models/Category');
// Load User Model
const User = require('../../models/User');

const router = express.Router();

// @route   GET api/categories/test
// @desc    Tests category route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Category Works' }));

// @route   GET api/categories/all
// @desc    Get all categories
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Category.find()
    .then((categories) => {
      if (!categories) {
        errors.nocategories = 'No category found';
        return res.status(404).json(errors);
      }

      res.json(categories);
      return false;
    })
    .catch(() => res.status(404).json({ nocategories: 'No category found' }));
});

// @route   GET api/categories/slug/:slug
// @desc    Get category by slug
// @access  Public
router.get('/slug/:slug', (req, res) => {
  const errors = {};

  Category.findOne({ handle: req.params.slug })
    .then((category) => {
      if (!category) {
        errors.nocategories = 'No category found';
        res.status(404).json(errors);
      }

      res.json(category);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/categories/:id
// @desc    Get category by id
// @access  Public
router.get('/:id', (req, res) => {
  const errors = {};

  Category.findById(req.params.id)
    .then((category) => {
      if (!category) {
        errors.nocategories = 'No category found';
        res.status(404).json(errors);
      }

      res.json(category);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/categories
// @desc    Create category
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

    newCategory.save().then(category => res.json(category));
    return false;
  },
);

// @route   POST api/categories/:id
// @desc    Update Category
// @access  Private
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // find out whether user is staff
    User.findOne({ user: req.user.id }).then((user) => {
      if (user) {
        if (!user.isStaff) {
          errors.unauthorized = 'Cannot edit the category';
          return res.status(401).json(errors);
        }
      }
      return true;
    });

    // Get fields
    const categoryFields = {};
    if (req.body.description) {
      categoryFields.description = req.body.description;
    }
    if (req.body.name) {
      categoryFields.name = req.body.name;
    }

    Category.findById(req.params.id)
      .then((category) => {
        if (category) {
          categoryFields.updateDate = Date.now();
          // Update
          category.findOneAndUpdate(
            { _id: req.params.id },
            { $set: categoryFields },
            { new: true },
          ).then(categoryObject => res.json(categoryObject));
        } else {
          errors.nocategories = 'No category found';
          res.status(404).json(errors);
        }
      });
    return false;
  },
);

// @route   DELETE api/categories/:id
// @desc    Delete category
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    // find out whether user is staff
    User.findOne({ user: req.user.id }).then((user) => {
      if (user) {
        if (!user.isStaff) {
          errors.unauthorized = 'Cannot delete the category';
          return res.status(401).json(errors);
        }
      }
      return true;
    });

    Category.findOneAndRemove({ _id: req.params.id })
      .then(() => {
        res.json({ success: true });
      })
      .catch(() => res.status(404).json({ success: false }));
  },
);

module.exports = router;
