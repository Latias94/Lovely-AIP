const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBookListInput(bodyData) {
  const errors = {};
  const data = bodyData;

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.title, { min: 2, max: 50 })) {
    errors.title = 'Title must be between 2 and 50 characters';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if (!Validator.isLength(data.description, { min: 10, max: 500 })) {
    errors.description = 'Description must be between 10 and 500 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
