const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const { Schema } = mongoose;

// create index in MongoDB
mongoose.set('useCreateIndex', true);

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
  books: [{
    bookid: {
      type: Schema.Types.ObjectId,
      ref: 'books',
    },
    recommendation: {
      type: String,
    }
  }],
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

BookListSchema.index({
  title: 'text',
  description: 'text',
}, {
  weights: {
    name: 5, // name has more weights than description
    description: 1,
  }
});

module.exports = mongoose.model('bookLists', BookListSchema);
