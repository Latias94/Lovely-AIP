const express = require('express');
const passport = require('passport');
const Book = require('../../models/Book');
const Review = require('../../models/Review');
const BookList = require('../../models/BookList');

const router = express.Router();

const validateBookListInput = require('../../validation/bookList');

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
 *       - name: "update"
 *         in: "query"
 *         description: "Sort result by update date, 1 for oldest to newest, -1 for newest to oldest"
 *         required: false
 *         type: "integer"
 *       - name: "title"
 *         in: "query"
 *         description: "Sort result by title, default = 1"
 *         required: false
 *         type: "integer"
 *     responses:
 *       200:
 *         description: Get all booklists successfully
 *       404:
 *         description: No booklists found
 */
router.get('/', (req, res) => {
  const errors = {};

  const page = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.pageSize, 10);
  // 1 for oldest to newest, -1 for newest to oldest
  const sortByUpdate = parseInt(req.query.update, 10);
  const sortByTitle = parseInt(req.query.title, 10);
  const sortParams = {};
  if (sortByUpdate) {
    sortParams.updateDate = sortByUpdate;
  }
  if (sortByTitle) {
    sortParams.title = sortByTitle;
  } else {
    sortParams.title = 1;
  }
  const interval = (page - 1) * pageSize;

  BookList.find()
    .skip(interval)
    .limit(pageSize)
    .sort(sortParams)
    .then((bookLists) => {
      if (!bookLists) {
        errors.booklistnotfound = 'No bookLists found';
        return res.status(404).json(errors);
      }

      return res.json(bookLists);
    })
    .catch(() => res.status(404).json({ booklistnotfound: 'No bookLists found' }));
});

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
router.get('/slug/:slug', (req, res) => {
  const errors = {};

  BookList.findOne({ slug: req.params.slug })
    .then((bookList) => {
      if (!bookList) {
        errors.booklistnotfound = 'No booklists found';
        return res.status(404).json(errors);
      }
      return res.json(bookList);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @swagger
 * /api/booklists/{id}:
 *   get:
 *     tags:
 *       - BookList
 *     summary: Get BookList by id
 *     description: Get BookList by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of BookList that needs to be fetched"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Get BookList successfully
 *       404:
 *         description: No booklists found
 */
router.get('/:id', (req, res) => {
  const errors = {};

  BookList.findById(req.params.id)
    .lean()
    .then((bookList) => {
      if (!bookList) {
        errors.booklistnotfound = 'No booklists found';
        return res.status(404).json(errors);
      }

      if (bookList.books.length > 0) {
        // get bookid array
        const bookIds = [];
        bookList.books.forEach(book => bookIds.push(book.bookid));
        Book.find({
          _id: {
            $in: bookIds,
          }
        })
          .then((books) => {
            // bookList.toObject();
            const bookObjects = [];
            books.forEach(book => bookObjects.push(book.toObject()));
            bookList.books = bookObjects;
            return res.json(bookList);
          })
          .catch(() => res.status(404).json({ booknotfound: 'No books found' }));
        return false;
      } else {
        return res.json(bookList);
      }
    })
    .catch((err) => {
      return res.status(404).json(err);
    });
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
 *     summary: Create BookList
 *     description: Create a new BookList. Title and description field is required. This can only be done by the logged in user (add JWT token to header).
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
    } = validateBookListInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newBookList = new BookList({
      title: req.body.title,
      user: req.user.id,
      username: req.user.name,
      description: req.body.description,
    });

    newBookList.save().then((bookList) => {
      return res.json(bookList);
    });
    return false;
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
 */
router.post(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const {
      errors,
      isValid,
    } = validateBookListInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const bookListFields = {};
    if (req.body.title) bookListFields.title = req.body.title;
    if (req.body.description) bookListFields.description = req.body.description;

    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList) {
          if (bookList.user.toString() !== req.user.id) {
            // can only edit the book list user created
            errors.unauthorized = 'Cannot edit the booklist';
            return res.status(401).json(errors);
          }

          bookListFields.updateDate = Date.now();
          // Update
          BookList.findByIdAndUpdate(
            req.params.id,
            bookListFields,
            { new: true },
            (err, bookListObject) => {
              return err ? res.status(404).json(err)
                : res.json(bookListObject);
            }
          );
        } else {
          errors.booklistnotfound = 'No booklists found';
          return res.status(404).json(errors);
        }
        return false;
      });
    return false;
  }
);

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
 *     responses:
 *       200:
 *         description: Successfully Added
 *       404:
 *         description: No booklists found or other internal error
 */
router.post(
  '/book/:id/:book_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList) {
          if (bookList.books.filter(book => book.bookid.toString()
            === req.params.book_id).length > 0) {
            return res
              .status(404)
              .json({
                alreadyadded: 'User already added this book',
              });
          }
          Book.findById(req.params.book_id)
            .then((book) => {
              if (!book) {
                return res.status(404).json({ booknotfound: 'No books found' });
              }
              const bookFields = {};
              bookFields.bookid = req.params.book_id;

              const bookListFields = {};
              bookListFields.books = bookList.books;
              bookListFields.updateDate = Date.now();
              bookListFields.books.unshift(bookFields);

              // Update
              BookList.findByIdAndUpdate(
                req.params.id,
                bookListFields,
                { new: true },
                (err, bookListObject) => {
                  return err ? res.status(404).json(err)
                    : res.json(bookListObject);
                }
              );
              return false;
            }).catch(() => res.status(404).json({ booknotfound: 'No books found' }));
        } else {
          errors.booklistnotfound = 'No booklists found';
          return res.status(404).json(errors);
        }
        return false;
      });
    return false;
  }
);

/**
 * @swagger
 * /api/booklists/book/{id}/{book_id}:
 *   delete:
 *     tags:
 *       - BookList
 *     summary: Delete Book to BookList
 *     description: Delete Book from a exist BookList. Both BookList id and Book id fields are required.
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
 */
router.delete(
  '/book/:id/:book_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList) {
          if (bookList.user.toString() !== req.user.id) {
            // can only edit the book list user created
            errors.unauthorized = 'Cannot delete the booklist';
            return res.status(401).json(errors);
          }

          if (bookList.books.filter(book => book.bookid.toString() === req.params.book_id)
            .length === 0) {
            return res
              .status(404)
              .json({
                booknotfound: 'No books found',
              });
          }
          // Get remove index
          const removeIndex = bookList.books
            .map(book => book._id.toString())
            .indexOf(req.params.book_id);
          bookList.books.splice(removeIndex, 1);
          bookList.save().then(bookListObject => res.json(bookListObject));
        } else {
          errors.booklistnotfound = 'No booklists found';
          return res.status(404).json(errors);
        }
        return false;
      });
    return false;
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
 */
router.post(
  '/like/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList.likes.filter(like => like.user.toString()
          === req.user.id).length > 0) {
          return res
            .status(404)
            .json({
              alreadyliked: 'User already liked this booklist',
            });
        }

        // Add user id to likes array
        bookList.likes.unshift({
          user: req.user.id,
        });

        bookList.save().then(bookListObject => res.json(bookListObject));
        return false;
      })
      .catch(() => res.status(404).json({
        booklistnotfound: 'No booklists found',
      }));
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
 */
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  (req, res) => {
    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList.likes.filter(like => like.user.toString()
          === req.user.id).length === 0) {
          return res
            .status(400)
            .json({
              notliked: 'You have not yet liked this booklist',
            });
        }

        // Get remove index
        const removeIndex = bookList.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        bookList.likes.splice(removeIndex, 1);

        // Save
        bookList.save().then(bookListObject => res.json(bookListObject));
        return false;
      })
      .catch(() => res.status(404).json({
        booklistnotfound: 'No booklists found',
      }));
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
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList.user.toString() !== req.user.id) {
          // can only edit the book list user created
          errors.unauthorized = 'Cannot delete the booklist';
          return res.status(401).json(errors);
        }

        BookList.findByIdAndRemove(req.params.id, (err) => {
          return err
            ? res.status(404).json({ booklistnotfound: 'No booklists found' })
            : res.json({ success: true });
        });
        return false;
      });
  }
);

module.exports = router;
