const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const { Schema } = mongoose;

const ProductSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalInventory: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
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
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  }],
});
ProductSchema.plugin(URLSlugs('name', { field: 'slug' }));

module.exports = mongoose.model('products', ProductSchema);
