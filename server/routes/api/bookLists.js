const express = require('express');
const passport = require('passport');
const Book = require('../../models/Book');
const BookList = require('../../models/BookList');
const cleanCache = require('../../middlewares/cleanCache');
const { clearHash } = require('../../config/cache');

const router = express.Router();

const validateBookListInput = require('../../validation/bookList');
const validateAddBookToBookListInput = require('../../validation/addBookToBookList');

/**
 * @swagger
 * /api/booklists/test:
 *   get:
 *     tags:
 *       - BookList
 *     summary: Tests booklists route
 *     description: Tests booklists route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: BookList Works
 */
router.get('/test', (req, res) => res.json({ msg: 'BookList Works' }));

// add book title to the books in all booklists
async function embedBookToBookLists(bookLists, req) {
  if (bookLists.length < 0) return;
  const bookIds = [];
  bookLists.forEach((bookList) => {
    bookList.books.forEach(book => bookIds.push(book.bookid));
  });
  const books = await Book.find({
    _id: {
      $in: bookIds,
    }
  })
    .cache({ key: req.params.id });

  const bookObjects = [];
  books.forEach(book => bookObjects.push(book.toObject()));
  bookLists.forEach((bookList) => {
    bookList.books.forEach((book) => {
      bookObjects.forEach((object) => {
        if (book.bookid.toString() === object._id.toString()) {
          book.title = object.title;
        }
      });
    });
  });
}

/**
 * @swagger
 * /api/booklists/search/{keyword}:
 *   get:
 *     tags:
 *       - BookList
 *     summary: Get booklists by keyword with condition
 *     description: Get booklists by keyword with condition. (search in booklist title and description with weight).
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

  const interval = (page - 1) * pageSize;
  console.log(interval);
  try {
    const booklists = await BookList.find({ $text: { $search: req.params.keyword } })
      .skip(interval)
      .limit(pageSize)
      .cache()
      .lean();

    if (booklists.length === 0) {
      return res.status(404)
        .json({ noresult: 'No result is found' });
    }

    const searchResult = await BookList.find({ $text: { $search: req.params.keyword } });
    const totalPages = Math.ceil(searchResult.length / pageSize);
    if (page > totalPages) {
      return res.status(404)
        .json({ booklistoutofpages: 'The page you request is larger than the maximum number of pages' });
    }

    await embedBookToBookLists(booklists, req);

    const result = {};
    result.currentPage = page;
    result.totalPages = totalPages;
    result.booklists = booklists;

    return res.json(result);
  } catch (err) {
    return res.status(404)
      .json({ booklistnotfound: 'No booklists found' });
  }
});

/**
 * @swagger
 * /api/booklists/list:
 *   get:
 *     tags:
 *       - BookList
 *     summary: Get booklists with condition
 *     description: Get booklists with condition. e.g.http://localhost:5000/api/booklists/list?page=1&pageSize=10&createDate=1
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
 *         description: "How many booklists you want to show in one page"
 *         required: true
 *         type: "integer"
 *       - name: "create"
 *         in: "query"
 *         description: "Sort result by create date, 1 for oldest to newest, -1 for newest to oldest"
 *         required: false
 *         type: "integer"
 *     responses:
 *       200:
 *         description: Get booklists successfully
 *       404:
 *         description: No booklists found
 */
router.get('/list', async (req, res) => {
  const page = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.pageSize, 10);
  // 1 for oldest to newest, -1 for newest to oldest
  const sortByCreateDate = parseInt(req.query.createDate, 10);
  const sortParams = {};
  if (sortByCreateDate) {
    sortParams.createDate = sortByCreateDate;
  }
  const interval = (page - 1) * pageSize;

  try {
    // find booklists with multiple conditions
    const booklists = await BookList.find()
      .skip(interval)
      .limit(pageSize)
      .sort(sortParams)
      .cache()
      .lean();
    // Count all the booklists
    const counts = await BookList.countDocuments({});
    const totalPages = Math.ceil(counts / pageSize);
    if (page > totalPages) {
      return res.status(404)
        .json({ booklistoutofpages: 'The page you request is larger than the maximum number of pages' });
    }

    await embedBookToBookLists(booklists, req);

    const result = {};
    result.currentPage = page;
    result.totalPages = totalPages;
    result.booklists = booklists;
    return res.json(result);
  } catch (err) {
    return res.status(404)
      .json({ booklistnotfound: 'No booklists found' });
  }
});

/**
 * @swagger
 * /api/booklists:
 *   get:
 *     tags:
 *       - BookList
 *     summary: Get all booklists
 *     description: Get all booklists
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all booklists successfully
 *       404:
 *         description: No booklists found
 */
router.get('/', async (req, res) => {
  try {
    const booklists = await BookList.find()
      .sort({ updateDate: -1 });
    return res.json(booklists);
  } catch (e) {
    return res.status(404)
      .json({ booklistnotfound: 'No bookLists found' });
  }
});

async function embedBookToBookList(bookList, req) {
  // if booklist.book not empty, embed book details in booklist object
  if (bookList.books.length < 0) return;
  // get bookid array
  const bookIds = [];
  bookList.books.forEach(book => bookIds.push(book.bookid));
  const books = await Book.find({
    _id: {
      $in: bookIds,
    }
  })
    .cache({ key: req.params.id });
  const bookObjects = [];
  // map book to proper field in booklist, cause result return from
  // mongoose query is not in sequence
  books.forEach(book => bookObjects.push(book.toObject()));

  bookObjects.forEach((book) => {
    book.reviews.forEach((review) => {
      // find user reviews of each book and add to book object
      if (review.user.toString() === bookList.user.toString()) {
        book.reviewContent = review.content;
        book.reviewStar = review.star;
      }
    });
  });

  for (let i = 0; i < bookObjects.length; i += 1) {
    bookList.books.forEach((book) => {
      if (book.recommendation !== undefined
        && bookObjects[i]._id.toString() === book.bookid.toString()) {
        bookObjects[i].recommendation = book.recommendation;
      }
    });
  }
  bookList.books = bookObjects;
}

/**
 * @swagger
 * /api/booklists/slug/{slug}:
 *   get:
 *     tags:
 *       - BookList
 *     summary: Get BookList by slug
 *     description: Get BookList by slug. Example http://localhost:5000/api/booklists/slug/game Any details please refer to https://github.com/talha-asad/mongoose-url-slugs
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get BookList successfully
 *       404:
 *         description: No booklists found
 */
router.get('/slug/:slug', async (req, res) => {
  const errors = {};
  try {
    const bookList = await BookList.findOne({ slug: req.params.slug })
      .lean();
    if (!bookList) {
      errors.booklistnotfound = 'No booklists found';
      return res.status(404)
        .json(errors);
    }

    await embedBookToBookList(bookList, req);

    return res.json(bookList);
  } catch (err) {
    errors.booklistnotfound = 'No booklists found';
    return res.status(404)
      .json(errors);
  }
});

/**
 * @swagger
 * /api/booklists/{id}:
 *   get:
 *     tags:
 *       - BookList
 *     summary: Get a BookList with the user reviews by id
 *     description: Get a BookList with the user reviews by id. This can only be done by the logged in user (JWT token required in the header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "The ID of the BookList"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Get BookList successfully
 *       404:
 *         description: No booklists found
 */
router.get('/:id',
  async (req, res) => {
    const errors = {};
    try {
      const bookList = await BookList.findById(req.params.id)
        .lean();
      if (!bookList) {
        errors.booklistnotfound = 'No booklists found';
        return res.status(404)
          .json(errors);
      }

      await embedBookToBookList(bookList, req);

      return res.json(bookList);
    } catch (err) {
      errors.booklistnotfound = 'No booklists found';
      return res.status(404)
        .json(errors);
    }
  });


/**
 * @swagger
 * definitions:
 *   BookList:
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 */
/**
 * @swagger
 * /api/booklists:
 *   post:
 *     tags:
 *       - BookList
 *     summary: Create a BookList
 *     description: Create a new BookList. Title and description field is required. Description must be between 10 and 500 characters. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Created BookList object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BookList'
 *     responses:
 *       200:
 *         description: Successfully created
 *       400:
 *         description: Form validation fail
 *       401:
 *         description: Cannot create the BookList
 *       404:
 *         description: BookList name has existed
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
    } = validateBookListInput(req.body);
    if (!isValid) {
      return res.status(400)
        .json(errors);
    }
    const newBookList = new BookList({
      title: req.body.title,
      user: req.user.id,
      username: req.user.name,
      description: req.body.description,
    });
    try {
      // save new booklist
      const bookList = await newBookList.save();
      return res.json(bookList);
    } catch (err) {
      return res.status(404)
        .json({ success: false });
    }
  }
);

/**
 * @swagger
 * /api/booklists/{id}:
 *   post:
 *     tags:
 *       - BookList
 *     summary: Edit BookList
 *     description: Edit a exist BookList. Both title and description fields are required. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Edit BookList object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BookList'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of BookList that needs to be edited"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully edited
 *       401:
 *         description: Cannot edit the BookList
 *       404:
 *         description: No booklists found or BookList name has existed
 *     security:
 *       - JWT: []
 */
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cleanCache,
  async (req, res) => {
    const {
      errors,
      isValid,
    } = validateBookListInput(req.body);
    if (!isValid) {
      return res.status(400)
        .json(errors);
    }
    const bookListFields = {};
    if (req.body.title) bookListFields.title = req.body.title;
    if (req.body.description) bookListFields.description = req.body.description;

    try {
      const bookList = await BookList.findById(req.params.id);
      if (bookList) {
        if (bookList.user.toString() !== req.user.id) {
          // can only edit the book list user created
          errors.unauthorized = 'Cannot edit the booklist';
          return res.status(401)
            .json(errors);
        }

        bookListFields.updateDate = Date.now();
        clearHash(req.params.id);
        // Update book
        BookList.findOneAndUpdate(
          { _id: req.params.id },
          bookListFields,
          { new: true },
          (err, bookListObject) => {
            return err ? res.status(404)
              .json(err) : res.json(bookListObject);
          }
        );
      } else {
        errors.booklistnotfound = 'No booklists found';
        return res.status(404)
          .json(errors);
      }
    } catch (err) {
      errors.booklistnotfound = 'No booklists found';
      return res.status(404)
        .json(errors);
    }
    return false;
  }
);

/**
 * @swagger
 * definitions:
 *   AddBookToBookList:
 *     properties:
 *       recommendation:
 *         type: string
 */
/**
 * @swagger
 * /api/booklists/book/{id}/{book_id}:
 *   post:
 *     tags:
 *       - BookList
 *     summary: Add Book to BookList
 *     description: Add Book to a exist BookList. Both BookList id and Book id fields are required.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of BookList that needs to be edited"
 *         required: true
 *         type: "string"
 *       - name: "book_id"
 *         in: "path"
 *         description: "ID of Book that needs to be added to BookList"
 *         required: true
 *         type: "string"
 *       - name: body
 *         description: Add recommendation for the book (optional)
 *         in: body
 *         schema:
 *           $ref: '#/definitions/AddBookToBookList'
 *     responses:
 *       200:
 *         description: Successfully Added
 *       400:
 *         description: Form validation fail
 *       404:
 *         description: No booklists found or other internal error
 *     security:
 *       - JWT: []
 */
router.post(
  '/book/:id/:book_id',
  passport.authenticate('jwt', { session: false }),
  cleanCache,
  async (req, res) => {
    const {
      errors,
      isValid,
    } = validateAddBookToBookListInput(req.body);
    if (!isValid) {
      return res.status(400)
        .json(errors);
    }
    try {
      // find bookList by id
      const bookList = await BookList.findById(req.params.id);
      if (bookList) {
        if (bookList.books.filter(book => book.bookid.toString()
          === req.params.book_id).length > 0) {
          return res
            .status(404)
            .json({
              alreadyadded: 'User already added this book',
            });
        }
        // find book by id
        const book = await Book.findById(req.params.book_id)
          .cache({ key: req.params.book_id });
        if (!book) {
          return res.status(404)
            .json({ booknotfound: 'No books found' });
        }
        const bookFields = {};
        bookFields.bookid = req.params.book_id;
        bookFields.recommendation = req.body.recommendation;

        const bookListFields = {};
        bookListFields.books = bookList.books;
        bookListFields.updateDate = Date.now();
        bookListFields.books.unshift(bookFields);

        // Update booklist
        BookList.findOneAndUpdate(
          { _id: req.params.id },
          bookListFields,
          { new: true },
          (err, bookListObject) => {
            // clean redis cache
            clearHash({ key: req.params.id });
            return err ? res.status(404)
              .json(err) : res.json(bookListObject);
          }
        );
      } else {
        errors.booklistnotfound = 'No booklists found';
        return res.status(404)
          .json(errors);
      }
    } catch (err) {
      errors.booklistnotfound = 'No booklists found';
      return res.status(404)
        .json(errors);
    }
    return false;
  }
);

/**
 * @swagger
 * /api/booklists/book/{id}/{book_id}:
 *   delete:
 *     tags:
 *       - BookList
 *     summary: Delete a Book from a BookList
 *     description: Delete a Book from a exist BookList. Both BookList id and Book id fields are required.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of BookList that needs to be edited"
 *         required: true
 *         type: "string"
 *       - name: "book_id"
 *         in: "path"
 *         description: "ID of Book that needs to be added to BookList"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully Deleted
 *       401:
 *         description: Cannot delete the BookList
 *       404:
 *         description: No booklists found or other internal error
 *     security:
 *       - JWT: []
 */
router.delete(
  '/book/:id/:book_id',
  passport.authenticate('jwt', { session: false }),
  cleanCache,
  async (req, res) => {
    const errors = {};

    try {
      const bookList = await BookList.findById(req.params.id);
      if (bookList) {
        if (bookList.user.toString() !== req.user.id) {
          // can only edit the book list user created
          errors.unauthorized = 'Cannot delete the booklist';
          return res.status(401)
            .json(errors);
        }
        // find the book which will be deleted
        if (bookList.books.filter(book => book.bookid.toString()
          === req.params.book_id).length === 0) {
          return res.status(404)
            .json({ booknotfound: 'No books found' });
        }
        // Get remove index
        const removeIndex = bookList.books
          .map(book => book._id.toString())
          .indexOf(req.params.book_id);
        bookList.books.splice(removeIndex, 1);

        // Clean redis cache
        clearHash(req.params.id);

        // Save booklist
        const bookListObject = await bookList.save();
        return res.json(bookListObject);
      } else {
        errors.booklistnotfound = 'No booklists found';
        return res.status(404)
          .json(errors);
      }
    } catch (err) {
      errors.booklistnotfound = 'No booklists found';
      return res.status(404)
        .json(errors);
    }
  }
);

/**
 * @swagger
 * /api/booklists/like/{id}:
 *   post:
 *     tags:
 *       - BookList
 *     summary: Like BookList
 *     description: Like a exist BookList. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of BookList that needs to be liked"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully liked
 *       400:
 *         description: User already liked this BookList
 *       404:
 *         description: No BookLists found
 *     security:
 *       - JWT: []
 */
router.post(
  '/like/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  cleanCache,
  async (req, res) => {
    try {
      const bookList = await BookList.findById(req.params.id);
      // find out whether user has like this booklist
      if (bookList.likes.filter(like => like.user.toString()
        === req.user.id).length > 0) {
        return res
          .status(404)
          .json({ alreadyliked: 'User already liked this booklist' });
      }
      // Add user id to likes array
      bookList.likes.unshift({
        user: req.user.id,
      });

      // Save booklist
      const bookListObject = await bookList.save();
      return res.json(bookListObject);
    } catch (err) {
      res.status(404)
        .json({ booklistnotfound: 'No booklists found' });
    }
    return false;
  }
);

/**
 * @swagger
 * /api/booklists/unlike/{id}:
 *   post:
 *     tags:
 *       - BookList
 *     summary: Unlike bookList
 *     description: Unlike a exist bookList. This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of bookList that needs to be unliked"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully Unliked
 *       400:
 *         description: You have not yet liked this bookList
 *       404:
 *         description: No bookLists found
 *     security:
 *       - JWT: []
 */
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  cleanCache,
  async (req, res) => {
    try {
      const bookList = await BookList.findById(req.params.id);
      // find out whether user has like this booklist
      if (bookList.likes.filter(like => like.user.toString()
        === req.user.id).length === 0) {
        return res
          .status(400)
          .json({ notliked: 'User have not yet liked this booklist' });
      }

      // Get remove index
      const removeIndex = bookList.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);

      // Splice out of array
      bookList.likes.splice(removeIndex, 1);

      // Save book list
      const bookListObject = await bookList.save();
      return res.json(bookListObject);
    } catch (err) {
      return res.status(404)
        .json({ booklistnotfound: 'No booklists found' });
    }
  }
);


/**
 * @swagger
 * /api/booklists/{id}:
 *   delete:
 *     tags:
 *       - BookList
 *     summary: Delete BookList
 *     description: Delete a exist BookList.This can only be done by the logged in user (add JWT token to header).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Delete BookList object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/BookList'
 *       - name: "id"
 *         in: "path"
 *         description: "ID of BookList that needs to be deleted"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Successfully deleted bookList Object
 *       401:
 *         description: Cannot delete the booklist
 *       404:
 *         description: No booklists found
 *     security:
 *       - JWT: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  cleanCache,
  async (req, res) => {
    const errors = {};
    try {
      const bookList = await BookList.findById(req.params.id);
      if (bookList.user.toString() !== req.user.id) {
        // can only edit the book list user created
        errors.unauthorized = 'Cannot delete the booklist';
        return res.status(401)
          .json(errors);
      }

      BookList.findOneAndDelete({ _id: req.params.id }, (err) => {
        clearHash(req.params.id);
        return err
          ? res.status(404)
            .json({ booklistnotfound: 'No booklists found' })
          : res.json({ success: true });
      });
    } catch (err) {
      return res.status(404)
        .json({ booklistnotfound: 'No booklists found' });
    }
    return false;
  }
);

module.exports = router;
