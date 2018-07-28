const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const { Schema } = mongoose;

// Create Schema
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  // products: [{
  //   product: {
  //     type: Schema.Types.ObjectId,
  //     ref: 'products',
  //   },
  // }],
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.plugin(URLSlugs('name', { field: 'slug' }));

module.exports = mongoose.model('categories', CategorySchema);
