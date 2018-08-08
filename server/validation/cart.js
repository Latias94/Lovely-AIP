const isEmpty = require('./is-empty');

module.exports = function validateCartInput(bodyData) {
  const errors = {};
  const data = bodyData;
  data.quantity = !isEmpty(data.quantity) ? Number(data.quantity) : NaN;

  function isInt(value) {
    return !Number.isNaN(value)
      && parseInt(Number(value), 10) !== value
      && !Number.isNaN(parseInt(value, 10));
  }

  if (data.quantity <= 0) {
    errors.quantity = 'Quantity must be larger than zero';
  }
  if (isInt(data.stock)) {
    errors.quantity = 'Quantity must be an integer';
  }
  if (Number.isNaN(data.quantity)) {
    errors.quantity = 'Quantity field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
