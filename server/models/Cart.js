const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  books: [{
    bookid: {
      type: Schema.Types.ObjectId,
      ref: 'books',
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
    },
    quantity: {
      type: Number,
      min: 0,
    },
    coverUrl: {
      type: String,
      required: true,
    },
  }],
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('reviews', CartSchema);
