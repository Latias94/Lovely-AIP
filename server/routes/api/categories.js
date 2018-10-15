const express = require('express');
const passport = require('passport');
const { clearHash } = require('../../config/cache');
const {
  categoryexist,
  categorynotfound,
  notsuccess,
  success,
  unauthorized
} = require('../../config/errMessage');
// Load Validation
const validateCategoryInput = require('../../validation/category');
// Load Category Model
const Category = require('../../models/Category');

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

// keep the parent category only
function filterSubCategories(categories) {
  let result = categories.slice();
  categories.forEach((category) => {
    if (category.subCategories.length > 0) {
      category.subCategories.forEach((subCategory) => {
        categories.forEach((c, index) => {
          if (c.name === subCategory.subname) {
            result.splice(index, 1, null);
          }
        });
      });
    }
  });
  result = result.filter(v => v);
  return result;
}

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
router.get('/', async (req, res) => {
  try {
    let categories = await Category.find()
      .sort({ name: 1 });
    categories = filterSubCategories(categories);
    if (categories) {
      return res.json(categories);
    } else {
      return res.status(404)
        .json(categorynotfound);
    }
  } catch (err) {
    return res.status(404)
      .json(categorynotfound);
  }
});

/**
 * @swagger
 * /api/categories/list:
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
router.get('/list', async (req, res) => {
  const allCategories = [];
  let counter = 0;
  try {
    let categories = await Category.find()
      .sort({ name: 1 })
      .cache();
    // keep the parent category only
    categories = filterSubCategories(categories);

    categories.forEach(async (category) => {
      const books = await Book.find({ category: category._id })
        .cache({ key: category._id });
      counter += 1;

      // create new category object for adding book property
      const categoryResult = category.toObject();
      categoryResult.books = books;
      allCategories.push(categoryResult);
      if (counter === categories.length) {
        return res.json(allCategories);
      }
    });
  } catch (err) {
    return res.status(404)
      .json(categorynotfound);
  }
  return false;
});

// Get category by condition. id or slug
async function getCategoryByCondition(condition, req, errors) {
  const category = await Category.findOne(condition)
    .cache({ key: condition });
  if (!category) {
    errors.categorynotfound = 'No categories found';
    return null;
  }

  const page = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.pageSize, 10);
  // 1 for oldest to newest, -1 for newest to oldest
  const sortByPublish = parseInt(req.query.publish, 10);
  // 1 for cheapest to most expensive
  const sortByPrice = parseInt(req.query.price, 10);
  const sortParams = {};
  if (sortByPublish) {
    sortParams.publishDate = sortByPublish;
  }
  if (sortByPrice) {
    sortParams.price = sortByPrice;
  }
  const interval = (page - 1) * pageSize;

  // find books related to this category
  const books = await Book.find({ category: category._id })
    .skip(interval)
    .limit(pageSize)
    .sort(sortParams)
    .cache({ key: category._id });

  const categoryResult = category.toObject();
  categoryResult.books = books;
  return categoryResult;
}

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
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Slug of category that needs to be fetched"
 *         required: true
 *         type: "string"
 *       - name: "page"
 *         in: "query"
 *         description: "the page you are query (powered by pageSize)"
 *         required: true
 *         type: "integer"
 *       - name: "pageSize"
 *         in: "query"
 *         description: "How many books you want to show in one page"
 *         required: true
 *         type: "integer"
 *       - name: "publish"
 *         in: "query"
 *         description: "Sort result by publish date, 1 for oldest to newest, -1 for newest to oldest"
 *         required: false
 *         type: "integer"
 *       - name: "price"
 *         in: "query"
 *         description: "Sort result by price, 1 for cheapest to most expensive, -1 for most expensive to cheapest"
 *         required: false
 *         type: "integer"
 *     responses:
 *       200:
 *         description: Get category successfully
 *       404:
 *         description: No categories found
 */
router.get('/slug/:slug', async (req, res) => {
  const errors = {};
  try {
    const category = await getCategoryByCondition(
      { slug: req.params.slug }, req, errors
    );
    if (category) {
      return res.json(category);
    }
  } catch (err) {
    return res.status(404)
      .json(categorynotfound);
  }
  return res.status(404)
    .json(errors);
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
 *       - name: "page"
 *         in: "query"
 *         description: "the page you are query (powered by pageSize)"
 *         required: true
 *         type: "integer"
 *       - name: "pageSize"
 *         in: "query"
 *         description: "How many books you want to show in one page"
 *         required: true
 *         type: "integer"
 *       - name: "publish"
 *         in: "query"
 *         description: "Sort result by publish date, 1 for oldest to newest, -1 for newest to oldest"
 *         required: false
 *         type: "integer"
 *       - name: "price"
 *         in: "query"
 *         description: "Sort result by price, 1 for cheapest to most expensive, -1 for most expensive to cheapest"
 *         required: false
 *         type: "integer"
 *     responses:
 *       200:
 *         description: Get category successfully
 *       404:
 *         description: No categories found
 */
router.get('/:id', async (req, res) => {
  const errors = {};
  try {
    const category = await getCategoryByCondition(
      { _id: req.params.id }, req, errors
    );
    if (category) {
      return res.json(category);
    } else {
      return res.status(404)
        .json(categorynotfound);
    }
  } catch (err) {
    return res.status(404)
      .json(categorynotfound);
  }
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
  async (req, res) => {
    if (!req.user.isStaff) {
      return res.status(401)
        .json(unauthorized);
    }
    try {
      const hasFound = await Category.findOne({ name: req.body.name });
      if (hasFound) {
        return res.status(404)
          .json(categoryexist);
      }
      // category not exist
      const {
        errors,
        isValid,
      } = validateCategoryInput(req.body);

      if (!isValid) {
        return res.status(400)
          .json(errors);
      }
      const newCategory = new Category({
        name: req.body.name,
      });

      const categoryObject = await newCategory.save();
      if (categoryObject) {
        return res.json(success);
      } else {
        return res.status(404)
          .json(notsuccess);
      }
    } catch (err) {
      return res.status(404)
        .json(categorynotfound);
    }
  }
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
 *     security:
 *       - JWT: []
 */
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (!req.user.isStaff) {
        return res.status(401)
          .json(unauthorized);
      }

      const category = await Category.findById(req.params.id);
      if (category) {
        // if update with slug
        if (req.body.slug) {
          const subCategory = await Category.findOne({ slug: req.body.slug });
          category.updateDate = Date.now();
          category.subCategories.unshift({
            subid: subCategory._id,
            subname: subCategory.name,
          });
          const categoryObject = await category.save();
          if (categoryObject) {
            clearHash('');
            return res.json(categoryObject);
          }
          // if update with id
        } else if (req.body.id) {
          const subCategory = await Category.findById(req.body.id);
          category.updateDate = Date.now();
          category.subCategories.unshift({
            subid: subCategory._id,
            subname: subCategory.name,
          });

          const categoryObject = await category.save();
          if (categoryObject) {
            clearHash(req.body.id);
            return res.json(success);
          } else {
            return res.status(404)
              .json(notsuccess);
          }
        }
      }
    } catch (err) {
      return res.status(404)
        .json(categorynotfound);
    }
    return res.status(404)
      .json(categorynotfound);
  }
);

// if there is parent category that contain this sub category,
// we need to find out the parent category which we need to modify
function removeSubCategory(subid, parentCategories) {
  const modifiedCategories = [];
  parentCategories.forEach((parentCategory) => {
    // found whether subCategory is in the parentCategory
    if (parentCategory.subCategories.filter(subCategory => subCategory.subid.toString()
      === subid.toString()).length > 0) {
      // get index of subcategory
      const index = parentCategory.subCategories
        .map(subCate => subCate.subid.toString())
        .indexOf(subid.toString());
      // remove subCategory
      parentCategory.subCategories.splice(index, 1);
      modifiedCategories.push(parentCategory);
    }
  });
  return modifiedCategories;
}

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
 *     security:
 *       - JWT: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (!req.user.isStaff) {
        return res.status(401)
          .json(unauthorized);
      }
      const category = await Category.findOneAndDelete({ _id: req.params.id });

      const parentCategories = await Category.find({ 'subCategories.subid': req.params.id });

      // if there is parent category that contain this sub category,
      // we need to modify the parent category as well
      if (parentCategories) {
        let isSuccess = true;

        const modifiedCategories = removeSubCategory(req.params.id, parentCategories);
        modifiedCategories.forEach(async (modifiedCategory) => {
          // update each parent category which contain this subCategory
          const result = await Category.findOneAndUpdate(
            { _id: modifiedCategory._id },
            modifiedCategory,
            { new: true }
          );
          // if one update fail, throw error
          if (isSuccess && !result) isSuccess = false;
        });
        if (category && isSuccess) {
          clearHash(req.params.id);
          return res.json(success);
        } else {
          return res.status(404)
            .json(notsuccess);
        }
      } else {
        // if the category is parent category
        // delete it directly
        if (category) {
          clearHash(req.params.id);
          return res.json(success);
        } else {
          return res.status(404)
            .json(notsuccess);
        }
      }
    } catch (err) {
      return res.status(404)
        .json(categorynotfound);
    }
  }
);

module.exports = router;
