module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  port: process.env.PORT || 5000,
  testMongoURL: 'mongodb://lovely-aip:lovelyaip726@ds020208.mlab.com:20208/lovely-aip-test',
  // testMongoURL: 'mongodb://localhost:27017/aiptest',
  testPort: 5001,
  email: process.env.EMAIL,
  emailPwd: process.env.EMAIL_PWD,
  frontendHost: 'http://localhost:3000',
  redisURI: process.env.REDIS_URI,
  redisPort: process.env.REDIS_PORT,
  redisPwd: process.env.REDIS_PWD,
};
