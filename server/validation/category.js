const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCategoryInput(bodyData) {
  const errors = {};
  const data = bodyData;

  data.name = !isEmpty(data.name) ? data.name : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'Category name must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isEmpty(data.description)
    && !Validator.isLength(data.description, { min: 10, max: 100 })) {
    errors.description = 'Category description must be between 10 and 100 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
