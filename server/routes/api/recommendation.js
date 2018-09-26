const express = require('express');

const Review = require('../../models/Review');
const Book = require('../../models/Book');
const { euclidean } = require('../../recommendation/similarity');
const { similarityList } = require('../../recommendation/sketch');

const router = express.Router();

/**
 * @swagger
 * /api/recommendation/test:
 *   get:
 *     tags:
 *       - Recommendation
 *     summary: Tests recommendation route
 *     description: Tests recommendation route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Recommendation Works
 */
router.get('/test', (req, res) => res.json({
  msg: 'Recommendation Works',
}));

function group(reviews) {
  const review = {};
  for (let i = 0; i < reviews.length; i += 1) {
    review[reviews[i]._id.user] = {};

    for (let j = 0; j < reviews[i].book.length; j += 1) {
      review[reviews[i]._id.user][reviews[i].book[j]] = reviews[i].star[j];
    }
  }
  return review;
}

function removeSameBook(user, other) {
  const userBooks = [];
  let otherBooks = [];
  for (let i = 0; i < user.length; i += 1) {
    userBooks.push(user[i].book.toString());
  }
  for (let i = 0; i < other.length; i += 1) {
    otherBooks.push(other[i].book.toString());
  }
  otherBooks = Array.from(new Set(otherBooks));
  return otherBooks.filter(v => !userBooks.includes(v));
}

function getMostSimilarUserByNum(scores, numOfUser) {
  const result = [];
  numOfUser = scores.length < numOfUser ? scores.length : numOfUser;

  for (let i = 0; i < numOfUser; i += 1) {
    result.push(scores[i].user);
  }
  return result;
}

/**
 * @swagger
 * /api/recommendation/book/{id}:
 *   get:
 *     tags:
 *       - Recommendation
 *     summary: Get recommend books by user id
 *     description: Get recommend books by user id. The recommendation is simply using KNN mechanism.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         description: "ID of user"
 *         required: true
 *         type: "string"
 *     responses:
 *       200:
 *         description: Get recommend book successfully
 *       404:
 *         description: No recommend books found
 */
router.get('/book/:id', async (req, res) => {
  try {
    const reviews = await Review.aggregate(
      [{
        $group: {
          _id: {
            user: '$user',
          },
          book: {
            $push: '$book'
          },
          star: {
            $push: '$star'
          }
        }
      }]
    );
    if (!reviews) {
      return res.status(404)
        .json([]);
    } else {
      const groupByUser = group(reviews);
      const scores = similarityList(groupByUser, req.params.id, euclidean);
      console.log(scores);
      // get the three most similar user
      const similarUser = getMostSimilarUserByNum(scores, 3);
      // find user reviews
      const userReviews = await Review.find({ user: req.params.id })
        .cache({ key: req.params.id });
      if (userReviews) {
        // find other user reviews
        const otherReviews = await Review.find({ user: { $in: similarUser } })
          .where('star')
          .gte(4); // star more than or equal to 4
        if (otherReviews) {
          const result = removeSameBook(userReviews, otherReviews);
          console.log(result);
          // get the recommend books
          const books = await Book.find({ _id: { $in: result } })
            .cache();
          if (books) {
            return res.json(books);
          }
        }
      }
    }
  } catch (err) {
    return res.status(404)
      .json([]);
  }
  return res.status(404)
    .json([]);
});

module.exports = router;
