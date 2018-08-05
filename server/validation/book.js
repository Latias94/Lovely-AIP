const Validator = require('validator');
const ISBN = require('isbnjs');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(bodyData) {
  const errors = {};
  const data = bodyData;

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.publishDate = !isEmpty(data.publishDate) ? data.publishDate : '';
  data.isbn = !isEmpty(data.isbn) ? data.isbn : '';
  data.price = !isEmpty(data.price) ? Number(data.price) : NaN;
  data.stock = !isEmpty(data.stock) ? Number(data.stock) : NaN;

  function isInt(value) {
    return !Number.isNaN(value)
      && parseInt(Number(value), 10) !== value
      && !Number.isNaN(parseInt(value, 10));
  }

  function validateAuthors(authors) {
    authors = !isEmpty(authors) ? authors : '';
    if (!Validator.isLength(authors, { min: 2, max: 30 })) {
      errors.authors = 'Authors must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(authors)) {
      errors.authors = 'Authors field is required';
    }
  }

  if (!Array.isArray(data.authors)) {
    validateAuthors(data.authors);
  } else {
    data.authors.forEach(validateAuthors);
  }

  if (!Validator.isLength(data.title, { min: 2, max: 80 })) {
    console.log('title len: ' + data.title.length);
    errors.title = 'Book title must be between 2 and 80 characters';
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (!Validator.isLength(data.description, { min: 10, max: 1000 })) {
    console.log('description len: ' + data.description.length);
    errors.description = 'Book description must be between 10 and 1000 characters';
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }
  const date = new Date(data.publishDate);
  if (Number.isNaN(date)) {
    errors.publishDate = 'publish date is invalid';
  }
  if (Validator.isEmpty(data.publishDate)) {
    errors.publishDate = 'Publish date field is required';
  }

  if (data.price <= 0) {
    errors.price = 'Product price must be larger than zero';
  }
  if (Number.isNaN(data.price)) {
    errors.price = 'Price field is required';
  }

  if (data.stock <= 0) {
    errors.stock = 'Stock must be larger than zero';
  }
  if (isInt(data.stock)) {
    errors.stock = 'Stock must be an integer';
  }
  if (Number.isNaN(data.stock)) {
    errors.stock = 'Stock field is required';
  }

  if (!Validator.isEmpty(data.isbn) && !ISBN.parse(data.isbn).isIsbn13()) {
    errors.isbn = 'ISBN is invalid';
  }
  if (Validator.isEmpty(data.isbn)) {
    errors.isbn = 'ISBN field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
