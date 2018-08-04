const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentInput(bodyData) {
  const errors = {};
  const data = bodyData;

  data.content = !isEmpty(data.content) ? data.content : '';
  data.star = !isEmpty(data.star) ? Number(data.star) : NaN;

  function isInt(value) {
    return !Number.isNaN(value)
      && parseInt(Number(value), 10) !== value
      && !Number.isNaN(parseInt(value, 10));
  }

  if (!Validator.isLength(data.content, { min: 10, max: 100 })) {
    errors.content = 'Content must be between 10 and 100 characters';
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = 'Content field is required';
  }

  if (data.star <= 0) {
    errors.star = 'Star must be larger than zero';
  }
  if (data.star > 5) {
    errors.star = 'Star must be less than five';
  }
  if (isInt(data.star)) {
    errors.star = 'Star must be an integer';
  }
  if (Number.isNaN(data.star)) {
    errors.star = 'Star field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
