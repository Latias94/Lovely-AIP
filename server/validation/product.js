const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(bodyData) {
  const errors = {};
  const data = bodyData;

  data.text = !isEmpty(data.text) ? data.text : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.price = !isEmpty(data.price) ? data.price : NaN;
  data.totalInventory = !isEmpty(data.totalInventory) ? data.totalInventory : NaN;

  function isInt(value) {
    return !Number.isNaN(value)
      && parseInt(Number(value), 10) === value
      && !Number.isNaN(parseInt(value, 10));
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Product description must be between 10 and 300 characters';
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.text = 'Product name must be between 10 and 300 characters';
  }
  if (Validator.isEmpty(data.name)) {
    errors.text = 'Name field is required';
  }

  if (data.price <= 0) {
    errors.text = 'Product price must be larger than zero';
  }
  if (Number.isNaN(data.price)) {
    errors.price = 'Price field is required';
  }

  if (data.totalInventory <= 0) {
    errors.totalInventory = 'Total Inventory must be larger than zero';
  }
  if (isInt(data.totalInventory)) {
    errors.totalInventory = 'Total Inventory must be an integer';
  }
  if (Number.isNaN(data.totalInventory)) {
    errors.totalInventory = 'Total Inventory field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
