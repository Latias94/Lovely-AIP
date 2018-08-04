const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const swaggerJSDoc = require('swagger-jsdoc');
const users = require('./routes/api/users');
const books = require('./routes/api/books');
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

let db;
// Connect to MongoDB
const mongooseConfig = {
  useNewUrlParser: true,
};

if (process.env.NODE_ENV === 'test') {
  db = require('./config/keys').testMongoURL;
  console.log('You are under the test Node environment');
} else {
  db = require('./config/keys').mongoURI;
}

mongoose
  .connect(db, mongooseConfig)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Public Folder
app.use(express.static('./public'));

// cross origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/books', books);
app.use('/api/categories', categories);

// change port according to node environment
const port = process.env.NODE_ENV === 'test'
  ? require('./config/keys').test_port
  : require('./config/keys').port;

if (!module.parent) {
  app.listen(port,
    () => console.log(`Server running on port ${port}`));
}

module.exports = { app };
