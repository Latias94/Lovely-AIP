const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // avatar: {
  //   type: String,
  // },
  date: {
    type: Date,
    default: Date.now,
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  cart: [{
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
    coverUrl: {
      type: String,
    },
    quantity: {
      type: Number,
      min: 0,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  }],
});

module.exports = mongoose.model('users', UserSchema);
