const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(bodyData) {
  const errors = {};
  const data = bodyData;

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 100 })) {
    errors.text = 'Post must be between 10 and 100 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
