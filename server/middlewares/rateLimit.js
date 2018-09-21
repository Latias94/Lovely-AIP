const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { client } = require('../config/cache');

// Rate limitation for register account and resend validation email
const authLimiter = new RateLimit({
  store: new RedisStore({
    client,
    expiry: 60,
    prefix: 'rl:',
  }),
  max: 2, // Allow 2 request each minute only
  handler: (req, res) => {
    return res.status(429).json({ rateLimit: 'Too many requests, please try again later.' });
  }
});

module.exports = { authLimiter };
