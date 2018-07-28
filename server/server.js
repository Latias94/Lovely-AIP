const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerJSDoc = require('swagger-jsdoc');
const users = require('./routes/api/users');
const products = require('./routes/api/products');
const categories = require('./routes/api/categories');
const swaggerDefinition = require('./config/swagger');

const app = express();

// options for the swagger docs
const swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['routes/api/*.js', 'server.js'], // pass all in array
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/swagger', express.static('api-docs'));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
const mongooseConfig = {
  useNewUrlParser: true,
};

mongoose
  .connect(db, mongooseConfig)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/categories', categories);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
