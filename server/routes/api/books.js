const express = require('express');
const passport = require('passport');
const ISBN = require('isbnjs');

const Book = require('../../models/Book');
const Category = require('../../models/Category');
const User = require('../../models/User');
const Review = require('../../models/Review');
const cleanCache = require('../../middlewares/cleanCache');
const { clearHash, clearAll } = require('../../config/cache');

// Validation
const validateBookInput = require('../../validation/book');
const validateReviewInput = require('../../validation/review');

const router = express.Router();

/**
 * @swagger
 * /api/books/test:
 *   get:
 *     tags:
 *       - Book
 *     summary: Tests books route
 *     description: Tests books route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Book Works
 */
router.get('/test', (req, res) => res.json({
  msg: 'Book Works',
}));

/**
 * @swagger
 * /api/books:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get all books
 *     description: Get all books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all books successfully
 *       404:
 *         description: No books found
 */
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
        .select({
            title: 1,
            authors: 1,
            isbn: 1
        })
      .sort({ date: -1 });
    if (books) {
      return res.json(books);
    }
  } catch (err) {
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
  return res.status(404)
    .json({ booknotfound: 'No books found' });
});

/**
 * @swagger
 * /api/books/list:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get books with condition
 *     description: Get books with condition. e.g.http://localhost:5000/api/books/list?page=2&pageSize=10&price=-1&publish=1
 *     produces:
 *       - application/json
 *     parameters:
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
 *         description: Get books successfully
 *       404:
 *         description: No books found
 */
router.get('/list', async (req, res) => {
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

  try {
    // find book with multiple conditions
    const books = await Book.find()
      .skip(interval)
      .limit(pageSize)
      .sort(sortParams)
      .cache()
      .lean();
    // Count all the books
    const counts = await Book.countDocuments({});
    const totalPages = Math.ceil(counts / pageSize);
    if (page > totalPages) {
      return res.status(404)
        .json({ bookoutofpages: 'The page you request is larger than the maximum number of pages' });
    }

    const result = {};
    result.currentPage = page;
    result.totalPages = totalPages;
    result.books = books;
    return res.json(result);
  } catch (err) {
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
});

function mapAvatarToReviews(reviews, users) {
  for (let i = 0; i < reviews.length; i += 1) {
    for (let j = 0; j < users.length; j += 1) {
      if (reviews[i].user.toString() === users[j]._id.toString()) {
        Object.assign(reviews[i], { avatar: users[j].avatar });
      }
    }
  }
}

// get book by condition, id, slug, or isbn
async function getBookByCondition(condition) {
  const book = await Book.findOne(condition)
    .lean();

  // find parent category according to book's category
  const category = await Category.findOne({
    subCategories: { $elemMatch: { subid: book.category._id } }
  });

  if (category) {
    book.parentCategory = category.name;
    book.parentCategoryId = category._id;
    if (book.reviews.length > 0) {
      const userIds = [];
      book.reviews.forEach(review => userIds.push(review.user));

      // map book reviews to the book
      const users = await User.find({ _id: { $in: userIds } })
        .cache();
      if (users) {
        mapAvatarToReviews(book.reviews, users);
      }
    }
  }
  return book;
}

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get book by id
 *     description: Get book by id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of book that needs to be fetched"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Get book successfully
 *       404:
 *         description: No books found with that ID
 */
router.get('/:id', async (req, res) => {
  try {
    const book = await getBookByCondition({ _id: req.params.id });
    return res.json(book);
  } catch (err) {
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
});


/**
 * @swagger
 * /api/books/slug/{slug}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get book by slug
 *     description: Get book by slug.
 *     parameters:
 *       - name: "slug"
 *         in: "path"
 *         description: "Slug of book that needs to get"
 *         required: true
 *         type: "string"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get book successfully
 *       404:
 *         description: No books found
 */
router.get('/slug/:slug', async (req, res) => {
  try {
    const book = await getBookByCondition({ slug: req.params.slug });
    return res.json(book);
  } catch (err) {
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
});

/**
 * @swagger
 * /api/books/isbn/{isbn}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get book by isbn
 *     description: Get book by isbn.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "isbn"
 *         in: "path"
 *         description: "ISBN of book that needs to be fetched"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Get book successfully
 *       404:
 *         description: No books found
 */
router.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = await getBookByCondition({ isbn: req.params.isbn });
    return res.json(book);
  } catch (err) {
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
});

/**
 * @swagger
 * /api/books/search/{keyword}:
 *   get:
 *     tags:
 *       - Book
 *     summary: Get books by keyword or isbn with condition
 *     description: Get book by keyword or isbn with condition. (search in book title and description with weight).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "keyword"
 *         in: "path"
 *         description: "keyword of books that needs to be fetched"
 *         required: true
 *         type: "string"
 *       - name: "page"
 *         in: "query"
 *         description: "the page you are query (powered by pageSize). Default is 1"
 *         required: false
 *         type: "integer"
 *       - name: "pageSize"
 *         in: "query"
 *         description: "How many books you want to show in one page. Default is 10"
 *         required: false
 *         type: "integer"
 *       - name: "publish"
 *         in: "query"
 *         description: "Sort result by publish date, 1 for oldest to newest, -1 for newest to oldest. Default is -1"
 *         required: false
 *         type: "integer"
 *       - name: "price"
 *         in: "query"
 *         description: "Sort result by price, 1 for cheapest to most expensive, -1 for most expensive to cheapest. Default is 1"
 *         required: false
 *         type: "integer"
 *     responses:
 *       200:
 *         description: Get books successfully
 *       404:
 *         description: No books found with that keyword
 */
router.get('/search/:keyword', async (req, res) => {
  let page = parseInt(req.query.page, 10);
  let pageSize = parseInt(req.query.pageSize, 10);
  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(pageSize)) pageSize = 10;
  // 1 for oldest to newest, -1 for newest to oldest
  let sortByPublish = parseInt(req.query.publish, 10);
  // 1 for cheapest to most expensive
  let sortByPrice = parseInt(req.query.price, 10);
  if (Number.isNaN(sortByPublish)) sortByPublish = -1;
  if (Number.isNaN(sortByPrice)) sortByPrice = 1;

  const sortParams = {};
  if (sortByPublish) {
    sortParams.publishDate = sortByPublish;
  }
  if (sortByPrice) {
    sortParams.price = sortByPrice;
  }
  const interval = (page - 1) * pageSize;
  try {
    let { keyword } = req.params;
    const result = {};

    // if query with isbn10 or isbn13.
    if (ISBN.parse(keyword) !== null && ISBN.parse(keyword)
      .isIsbn13()) {
      // 978-4-87311-336-4 to 9784873113364 or 4-87311-336-4 to 9784873113364
      keyword = ISBN.asIsbn13(keyword);
      const book = await Book.findOne({ isbn: keyword });
      if (book) {
        result.currentPage = 1;
        result.totalPages = 1;
        result.books = [book];
        return res.json(result);
      } else {
        return res.status(404)
          .json({ booknotfound: 'No books found with this ISBN' });
      }
    }

    // find book with multiple conditions
    const books = await Book.find({ $text: { $search: keyword } })
      .skip(interval)
      .limit(pageSize)
      .sort(sortParams)
      .cache()
      .lean();

    if (books.length === 0) {
      return res.status(404)
        .json({ noresult: 'No result is found' });
    }

    const searchResult = await Book.find({ $text: { $search: keyword } });
    const totalPages = Math.ceil(searchResult.length / pageSize);
    if (page > totalPages) {
      return res.status(404)
        .json({ bookoutofpages: 'The page you request is larger than the maximum number of pages' });
    }

    result.currentPage = page;
    result.totalPages = totalPages;
    result.books = books;
    return res.json(result);
  } catch (err) {
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  }
});


/**
 * @swagger
 * definitions:
 *   Book:
 *     properties:
 *       title:
 *         type: string
 *       author:
 *         type: array
 *         $ref: '#/definitions/Author'
 *       description:
 *         type: string
 *       publishDate:
 *         type: date-time
 *       coverUrl:
 *         type: string
 *       stock:
 *         type: integer
 *         format: "int32"
 *       price:
 *         type: number
 */

/**
 * @swagger
 * definitions:
 *   Author:
 *     properties:
 *       author:
 *         type: string
 */
/**
 * @swagger
 * /api/books:
 *   post:
 *     tags:
 *       - Book
 *     summary: Create book
 *     description: Create a new book. This can only be done by the staff. Category field (category id) is not required. publishDate accept '10 25 2014' '10/25/2014' etc. If have multi authors to assign, add more authors row in request form.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Created book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Form validation fail
 *       404:
 *         description: Cannot create the Book with invalid category ID
 *     security:
 *       - JWT: []
 */
router.post('/',
  passport.authenticate('jwt', {
    session: false,
  }), async (req, res) => {
    try {
      if (!req.user.isStaff) {
        return res.status(401)
          .json({ unauthorized: 'Cannot modify the book' });
      }

      const {
        errors,
        isValid,
      } = validateBookInput(req.body);

      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400)
          .json(errors);
      }
      const authors = [];
      // if not an array, there should be a list of authors
      if (Array.isArray(req.body.authors)) {
        req.body.authors.forEach((author) => {
          authors.unshift({ name: author });
        });
      } else {
        authors.push({ name: req.body.authors });
      }

      const isExisted = await Book.findOne({ isbn: req.body.isbn });
      if (isExisted) {
        errors.bookexisted = 'Book has existed in the database';
        return res.status(404)
          .json(errors);
      }

      const bookObj = {
        title: req.body.title,
        price: req.body.price,
        stock: req.body.stock,
        coverUrl: req.body.coverUrl,
        description: req.body.description,
        isbn: req.body.isbn,
        publishDate: new Date(req.body.publishDate),
        authors,
      };

      // find category id
      if (req.body.category) {
        const category = await Category.findById(req.body.category)
          .cache({ key: req.body.category });
        // category id is invalid
        if (!category) {
          errors.categorynotfound = 'No categories found';
          return res.status(404)
            .json(errors);
        }
        // category exist
        bookObj.category = req.body.category;
        bookObj.categoryName = category.name;
      } else {
        // if do not provide category id, create book with empty category
        let emptyCategory = await Category.findOne({ slug: 'empty' })
          .cache();
        if (!emptyCategory) {
          // if Empty category is not exist in database, create one
          const empty = new Category({ name: 'Empty' });
          emptyCategory = await empty.save();
        }
        bookObj.category = emptyCategory._id;
        bookObj.categoryName = emptyCategory.name;
      }
      const book = await new Book(bookObj).save();
      if (book) {
        clearAll();
        return res.json(book);
      }
    } catch (err) {
      return res.status(404)
        .json({ success: false });
    }
    return res.status(404)
      .json({ success: false });
  });

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Delete book
 *     description: Delete a exist book. This can only be done by the staff.
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
 *         description: Successfully deleted
 *       401:
 *         description: Cannot delete the book
 *       404:
 *         description: No books found
 *     security:
 *       - JWT: []
 */
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      if (!req.user.isStaff) {
        return res.status(401)
          .json({ unauthorized: 'Cannot modify the book' });
      }

      const book = await Book.findOneAndDelete({ _id: req.params.id });
      if (book) {
        clearAll();
        return res.json({ success: true });
      }
    } catch (err) {
      return res.status(404)
        .json({ success: false });
    }
    return res.status(404)
      .json({ success: false });
  });

// Calculate Book score according to each star from book reviews
function calculateBookScore(book) {
  let totalScore = 0;
  book.reviews.map((re) => {
    totalScore += re.star;
    return null;
  });
  const bookScore = totalScore / book.reviews.length;
  book.toObject();
  book.score = bookScore.toFixed(2);
  return book;
}

/**
 * @swagger
 * definitions:
 *   Review:
 *     properties:
 *       star:
 *         type: Number
 *       content:
 *         type: string
 */
/**
 * @swagger
 * /api/books/review/{id}:
 *   post:
 *     tags:
 *       - Book
 *     summary: Add review to book
 *     description: Add review to book. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Review object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Review'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of book that needs to add review"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully added review
 *       400:
 *         description: Form validation fail
 *       404:
 *         description: No books found or Review has existed
 *     security:
 *       - JWT: []
 */
router.post('/review/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  cleanCache,
  async (req, res) => {
    const {
      errors,
      isValid,
    } = validateReviewInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400)
        .json(errors);
    }
    try {
      const book = await Book.findById(req.params.id);
      const review = await Review.findOne({
        book: req.params.id,
        user: req.user.id
      });
      // if user has not created review in this book yet. create one
      if (!review) {
        const newReview = new Review({
          content: req.body.content,
          star: req.body.star,
          book: req.params.id,
          user: req.user.id,
        });
        // create new review in review table, and embed to book object
        const reviewObject = await newReview.save();
        const reviewOfBook = {
          reviewid: reviewObject._id,
          content: reviewObject.content,
          star: reviewObject.star,
          user: req.user.id,
          username: req.user.name,
        };
        // Add to reviews array
        book.reviews.unshift(reviewOfBook);

        // calculate book score
        calculateBookScore(book);

        // Save
        const bookObject = await book.save();
        if (bookObject) {
          clearHash(req.params.id);
          return res.json(bookObject);
        }
      } else {
        errors.reviewexist = 'Review has existed';
        return res.status(404)
          .json(errors);
      }
    } catch (err) {
      return res.status(404)
        .json({ booknotfound: 'No books found' });
    }
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  });

/**
 * @swagger
 * /api/books/review/{id}/{review_id}:
 *   delete:
 *     tags:
 *       - Book
 *     summary: Remove review from book
 *     description: Remove review from book. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of book that needs to be modified"
 *         required: true
 *         type: "string"
 *       - name: "review_id"
 *         in: "path"
 *         description: "ID of review that needs to be deleted"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully removed review
 *       401:
 *         description: Cannot delete the review
 *       404:
 *         description: No books found or review does not exist
 *     security:
 *       - JWT: []
 */
router.delete('/review/:id/:review_id',
  passport.authenticate('jwt', {
    session: false,
  }),
  cleanCache,
  async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404)
          .json({ booknotfound: 'No Books found' });
      }
      const reviewObj = await Review.findOneAndDelete({ _id: req.params.review_id });
      if (!reviewObj) {
        return res.status(404)
          .json({ reviewnotfound: 'No Reviews found' });
      }
      // Delete review successfully
      // Check to see if review still exists in the book object
      if (book.reviews.filter(review => review.reviewid.toString()
        === req.params.review_id).length === 0) {
        return res.status(404)
          .json({ success: false });
      }

      // Get remove index
      const removeIndex = book.reviews
        .map(item => item.reviewid.toString())
        .indexOf(req.params.review_id);

      // The review is not created by current user
      if (book.reviews[removeIndex].user.toString() !== req.user.id.toString()) {
        return res.status(401)
          .json({ unauthorized: 'Cannot delete the review' });
      }

      // Splice review out of array
      book.reviews.splice(removeIndex, 1);

      if (book.reviews.length === 0) {
        book.score = 0;
      } else {
        // calculate book score
        calculateBookScore(book);
      }

      const bookObject = await book.save();
      if (bookObject) {
        clearHash(req.params.id);
        return res.json(bookObject);
      }
    } catch (err) {
      return res.status(404)
        .json({ success: false });
    }
    return res.status(404)
      .json({ success: false });
  });

function createUpdateField(req) {
  const bookFields = {};
  // Get fields
  if (req.body.description) {
    bookFields.description = req.body.description;
  }
  if (req.body.title) {
    bookFields.title = req.body.title;
  }
  if (req.body.coverUrl) {
    bookFields.coverUrl = req.body.coverUrl;
  }
  if (req.body.price) {
    bookFields.price = Number(req.body.price);
  }
  if (req.body.stock) {
    bookFields.stock = Number(req.body.stock);
  }
  // category id
  if (req.body.category) {
    bookFields.category = req.body.category;
  }
  if (req.body.publishDate) {
    bookFields.publishDate = new Date(req.body.publishDate);
  }
  if (req.body.isbn) {
    bookFields.isbn = req.body.isbn;
  }
  if (req.body.authors) {
    bookFields.authors = [];
    if (Array.isArray(req.body.authors)) {
      req.body.authors.forEach((author) => {
        bookFields.authors.unshift({ name: author });
      });
    } else {
      bookFields.authors.unshift({ name: req.body.authors });
    }
  }
  bookFields.updateDate = Date.now();
  return bookFields;
}

/**
 * @swagger
 * /api/books/{id}:
 *   post:
 *     tags:
 *       - Book
 *     summary: Edit book
 *     description: Edit a exist book. This can only be done by the staff.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Edit book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Book'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of book that needs to be edited"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully edited
 *       401:
 *         description: Cannot edit the book
 *       404:
 *         description: No books found
 *     security:
 *       - JWT: []
 */
router.post('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (!req.user.isStaff) {
      return res.status(401)
        .json({ unauthorized: 'Cannot modify the book' });
    }

    const bookFields = createUpdateField(req);

    try {
      // if need to modify the category of book.
      if (req.body.category) {
        const category = await Category.findById(req.body.category)
          .cache({ key: req.body.category });
        // Category exist
        if (category) {
          // Update book with new category
          bookFields.category = req.body.category;
          bookFields.categoryName = category.name;
        } else {
          // category id not found
          return res.status(404)
            .json({ categorynotfound: 'No categories found' });
        }
      }
      // Update book object with field
      const bookObject = await Book.findOneAndUpdate(
        { _id: req.params.id },
        bookFields,
        { new: true }
      );
      if (bookObject) {
        clearHash(req.params.id);
        return res.json(bookObject);
      }
    } catch (e) {
      return res.status(404)
        .json({ booknotfound: 'No books found' });
    }
    return res.status(404)
      .json({ booknotfound: 'No books found' });
  });

module.exports = router;
