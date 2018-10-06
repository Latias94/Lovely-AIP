module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: 'secret',
  port: process.env.PORT || 5000,
  testMongoURL: 'mongodb://lovely-aip:lovelyaip726@ds020208.mlab.com:20208/lovely-aip-test',
  testPort: 5001,
  email: process.env.EMAIL,
  emailPwd: process.env.EMAIL_PWD,
  frontendHost: 'http://knight-frank-web.s3-website-ap-southeast-2.amazonaws.com',
  redisURI: process.env.REDIS_URI,
  redisPort: process.env.REDIS_PORT,
  redisPwd: process.env.REDIS_PWD,
};
