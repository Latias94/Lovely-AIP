const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const { Schema } = mongoose;

const BookListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  books: [
    {
      bookid: {
        type: Schema.Types.ObjectId,
        ref: 'books',
      },
      description: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        min: 0,
        max: 5,
      },
      review: {
        Type: Schema.Types.ObjectId,
        ref: 'reviews',
      },
      reviewContent: {
        Type: String,
        required: true,
      },
    },
  ],
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  }],
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

BookListSchema.plugin(URLSlugs('title', { field: 'slug' }));

module.exports = mongoose.model('bookLists', BookListSchema);