const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategoryInput(bodyData) {
  const errors = {};
  const data = bodyData;

  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Category name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
