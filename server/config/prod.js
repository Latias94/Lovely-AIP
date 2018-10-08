const helmet = require('helmet');
const compression = require('compression');

// Help secure Express apps with various HTTP headers
module.exports = (app) => {
  app.use(helmet());
  app.use(compression());
};
