const express = require('express');
const RSS = require('rss');
const BookList = require('../../models/BookList');
const Book = require('../../models/Book');
const { frontendHost } = require('../../config/keys');
const {
  booklistnotfound,
  booknotfound,
} = require('../../config/errMessage');

const router = express.Router();

/**
 * @swagger
 * /api/feed/test:
 *   get:
 *     tags:
 *       - RSS
 *     summary: Tests rss route
 *     description: Tests rss route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: RSS Works
 */
router.get('/test', (req, res) => res.json({
  msg: 'RSS Works',
}));

/**
 * @swagger
 * /api/feed/booklists:
 *   get:
 *     tags:
 *       - RSS
 *     summary: Get RSS of 10 of newest BookLists
 *     description: Get RSS of 10 of newest BookLists
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return newest booklist RSS
 */
router.get('/booklists', async (req, res) => {
  const feed = new RSS({
    title: 'Knight Frank Booklist',
    description: 'The newest booklist from Knight Frank',
    feed_url: `${frontendHost}${req.url}`,
    site_url: `${frontendHost}`,
    author: 'Knight Frank'
  });
  try {
    const booklists = await BookList.find()
      .limit(10)
      .sort({ updateDate: -1 })
      .cache();

    if (booklists) {
      booklists.forEach((booklist) => {
        feed.item({
          title: booklist.title,
          description: booklist.description,
          url: `${frontendHost}/booklist/${booklist.slug}`,
          date: booklist.updateDate,
        });
      });
      res.type('rss');
      return res.send(feed.xml());
    } else {
      return res.status(404)
        .json(booklistnotfound);
    }
  } catch (err) {
    return res.status(404)
      .json(booklistnotfound);
  }
});

/**
 * @swagger
 * /api/feed/books:
 *   get:
 *     tags:
 *       - RSS
 *     summary: Get RSS of 10 of newest books
 *     description: Get RSS of 10 of newest books
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: return newest books RSS
 */
router.get('/books', async (req, res) => {
  const feed = new RSS({
    title: 'Knight Frank Book',
    description: 'The newest books from Knight Frank',
    feed_url: `${frontendHost}/categories`,
    site_url: `${frontendHost}`,
    author: 'Knight Frank'
  });
  try {
    const books = await Book.find()
      .limit(10)
      .sort({ updateDate: -1 })
      .cache();

    if (books) {
      books.forEach((book) => {
        const content = `
            <center><img src="${book.coverUrl}" style="max-height:200px" alt="${book.title}"></center>
            <p><b>Description: </b>${book.description}</p>
            <div style="text-align: center;"><a href="${frontendHost}/book/${book._id}">Click here to view the book</a></div>
        `;
        feed.item({
          title: book.title,
          description: content,
          url: `${frontendHost}/book/${book._id}`,
          date: book.updateDate,
          image_url: book.coverUrl,
        });
      });
      res.type('rss');
      return res.send(feed.xml());
    } else {
      return res.status(404)
        .json(booknotfound);
    }
  } catch (err) {
    return res.status(404)
      .json(booknotfound);
  }
});

module.exports = router;
