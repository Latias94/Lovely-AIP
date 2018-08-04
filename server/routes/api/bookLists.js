const express = require('express');
const passport = require('passport');

const BookList = require('../../models/BookList');
const User = require('../../models/User');
const Book = require('../../models/Book');
const Review = require('../../models/Review');

const router = express.Router();

// format information
// function filterSecret(bookList) {
//   /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
//   return {
//     id: bookList._id,
//     slug: bookList.slug,
//     title: bookList.title,
//     reviews: bookList.reviews,
//     books: bookList.books,
//     user: bookList.user,
//     username: bookList.username,
//   };
// }

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
 *     responses:
 *       200:
 *         description: Get all booklists successfully
 *       404:
 *         description: No booklists found
 */
router.get('/', (req, res) => {
  const errors = {};

  BookList.find()
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
    User.findById(req.user.id)
      .then((user) => {
        const newBookList = new BookList({
          title: req.body.title,
          user: req.user.id,
          username: user.name,
          description: req.body.description,
        });

        newBookList.save().then((bookList) => {
          return res.json(bookList);
        });
      });
  },
);

/**
 * @swagger
 * /api/booklists/{id}:
 *   post:
 *     tags:
 *       - BookList
 *     summary: Edit BookList
 *     description: Edit a exist BookList. Both title and description fields are required.
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
    const errors = {};
    // Get fields
    const bookListFields = {};
    if (req.body.title) bookListFields.title = req.body.title;
    if (req.body.description) bookListFields.description = req.body.description;

    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList) {
          bookListFields.updateDate = Date.now();
          // Update
          BookList.findByIdAndUpdate(
            req.params.id,
            bookListFields,
            { new: true },
            (err, bookListObject) => {
              return err ? res.status(404).json(err)
                : res.json(bookListObject);
            },
          );
        } else {
          errors.booklistnotfound = 'No booklists found';
          return res.status(404).json(errors);
        }
        return false;
      });
    return false;
  },
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
  'book/:id/:book_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList) {
          Book.findById(req.params.book_id)
            .then((book) => {
              Review.find({ user: req.user.id, book: req.params.id })
                .then((review) => {
                  const bookListFields = {};
                  bookListFields.books = bookList.books;
                  bookListFields.updateDate = Date.now();
                  const bookFields = {};
                  bookFields.book = req.params.book_id;
                  bookFields.description = book.description;
                  bookFields.score = book.score;
                  bookFields.reviewid = review._id;
                  bookFields.reviewContent = review.content;
                  bookListFields.books.unshift(bookFields);
                  // Update
                  BookList.findByIdAndUpdate(
                    req.params.id,
                    bookListFields,
                    { new: true },
                    (err, bookListObject) => {
                      return err ? res.status(404).json(err)
                        : res.json(bookListObject);
                    },
                  );
                }).catch(err => res.status(404).json(err));
            }).catch(err => res.status(404).json(err));
        } else {
          errors.booklistnotfound = 'No booklists found';
          return res.status(404).json(errors);
        }
        return false;
      });
    return false;
  },
);

/**
 * @swagger
 * /api/booklists/book/{id}/{book_id}:
 *   delete:
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
router.delete(
  'book/:id/:book_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    BookList.findById(req.params.id)
      .then((bookList) => {
        if (bookList) {
          if (bookList.books.filter(book => book._id.toString() === req.params.book_id)
            .length === 0) {
            return res
              .status(404)
              .json({
                booknotexists: 'Book does not exist',
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
  },
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
            .status(400)
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
  },
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
  },
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
 *       404:
 *         description: No booklists found
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    BookList.findByIdAndRemove(req.params.id, (err) => {
      return err
        ? res.status(404).json({ booklistnotfound: 'No booklists found' })
        : res.json({ success: true });
    });
  },
);

module.exports = router;
