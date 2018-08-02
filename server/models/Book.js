const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const { Schema } = mongoose;

const BookSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  title: {
    type: String,
    required: true,
  },
  author: [
    {
      type: String,
      required: true,
    },
  ],
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
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    min: 0,
    max: 5,
  },
});
BookSchema.plugin(URLSlugs('title', { field: 'slug' }));

module.exports = mongoose.model('books', BookSchema);
