const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const { Schema } = mongoose;

// create index in MongoDB
mongoose.set('useCreateIndex', true);

const BookSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  categoryName: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  authors: [{
    name: {
      type: String,
      required: true,
    },
  }],
  reviews: [{
    reviewid: {
      type: Schema.Types.ObjectId,
      ref: 'reviews',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    username: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    content: {
      type: String,
      required: true,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  }],
  description: {
    type: String,
    required: true,
  },
  publishDate: {
    type: Date,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
  coverUrl: {
    type: String,
    // required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    min: 0,
    max: 5,
  },
});

BookSchema.plugin(URLSlugs('title', { field: 'slug' }));
BookSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: { // name has more weights than description
    name: 5,
    description: 1,
  }
});

module.exports = mongoose.model('books', BookSchema);
