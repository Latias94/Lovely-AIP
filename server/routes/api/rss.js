const express = require('express');
const RSS = require('rss');
const BookList = require('../../models/BookList');

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

router.get('/rss/booklists', (req, res) => {
  const feed = new RSS({
    title: 'Knight Frank Booklist',
    description: 'The newest booklist from Knight Frank',
    feed_url: `http://${req.headers.host}${req.url}`,
    site_url: `http://${req.headers.host}`,
    author: 'Knight Frank'
  });

  BookList.find()
    .limit(10)
    .sort({
      updateDate: -1
    })
    .cache()
    .then((booklists) => {
      if (booklists) {
        // TODO change frontend route
        booklists.forEach((booklist) => {
          feed.item({
            title: booklist.title,
            description: booklist.description,
            url: `http://${req.headers.host}/api/booklists/${booklist._id}`,
            date: booklist.updateDate,
          });
        });
        res.type('rss');
        return res.send(feed.xml());
      } else {
        return res.status(404).json({ booklistnotfound: 'No booklists found' });
      }
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
