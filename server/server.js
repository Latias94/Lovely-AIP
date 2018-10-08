const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const users = require('./routes/api/users');
const books = require('./routes/api/books');
const bookLists = require('./routes/api/bookLists');
const categories = require('./routes/api/categories');
const recommendation = require('./routes/api/recommendation');
const rss = require('./routes/api/rss');
const cart = require('./routes/api/cart');
const upload = require('./routes/api/upload');
const swaggerDefinition = require('./config/swagger');
require('./config/cache');

const app = express();
// for compress http header
require('./config/prod')(app);

// options for the swagger docs
const swaggerOptions = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['routes/api/*.js', 'server.js'], // pass all in array
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Api document for staff
app.use('/swagger', express.static('api-docs/private'));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
// Api document for public
app.use('/developer', express.static('api-docs/public'));

// Body parser middleware
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(bodyParser.json());
app.use(helmet());

let db;
// Connect to MongoDB
const mongooseConfig = {
  useNewUrlParser: true,
};

if (process.env.NODE_ENV !== 'test') {
  db = require('./config/keys').mongoURI;
  mongoose
    .connect(db, mongooseConfig)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
} else {
  console.log('You are under test environment');
}

// Passport middleware
app.use(passport.initialize());

// Public Folder
app.use(express.static('public'));

const corsOptions = {
  origin: require('./config/keys').frontendHost,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/books', books);
app.use('/api/categories', categories);
app.use('/api/booklists', bookLists);
app.use('/api/recommendation', recommendation);
app.use('/api/cart', cart);
app.use('/api/upload', upload);
app.use('/api/feed', rss);
// Public Folder
// To get image in public folder, you can do as follow
// http://localhost:5000/uploads/image-1535933860912.jpg
app.use(express.static('./public'));

// change port according to node environment
const port = process.env.NODE_ENV === 'test'
  ? require('./config/keys').testPort
  : require('./config/keys').port;

if (!module.parent) {
  app.listen(port,
    () => console.log(`Server running on port ${port}`));
}

module.exports = { app };
