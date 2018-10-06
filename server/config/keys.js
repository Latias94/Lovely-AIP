module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: 'secret',
  port: process.env.PORT || 5000,
  testMongoURL: 'mongodb://lovely-aip:lovelyaip726@ds020208.mlab.com:20208/lovely-aip-test',
  testPort: 5001,
  email: process.env.EMAIL,
  emailPwd: process.env.EMAIL_PWD,
  frontendHost: 'https://knight-frank.herokuapp.com',
  redisURI: process.env.REDIS_URI,
  redisPort: process.env.REDIS_PORT,
  redisPwd: process.env.REDIS_PWD,
};
