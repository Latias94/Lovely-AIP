const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAddBookToBookListInput(bodyData) {
  const errors = {};
  const data = bodyData;

  if (data.recommendation !== undefined
    && !Validator.isLength(data.recommendation, { min: 10, max: 200 })) {
    errors.recommendation = 'Recommendation must be between 10 and 200 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
