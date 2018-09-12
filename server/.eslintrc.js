module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  plugins: [
    'import',
    'jest',
  ],
  env: {
    node: true,
    'jest/globals': true,
  },
  rules: {
    "linebreak-style": 0,
    "no-underscore-dangle": 0,
    "max-len": 0,
    "arrow-body-style": 0,
    "no-param-reassign": 0,
    "global-require": 0,
    "no-else-return": 0,
    "import/order": 0,
    "import/no-extraneous-dependencies": 0,
    "comma-dangle": 0,
    "func-names": 0,
    "new-cap": 0,
  }
};