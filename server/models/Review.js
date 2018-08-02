const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const { Schema } = mongoose;

// Create Schema
const ReviewSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'books',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  star: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

ReviewSchema.plugin(URLSlugs('name', { field: 'slug' }));

module.exports = mongoose.model('reviews', ReviewSchema);
