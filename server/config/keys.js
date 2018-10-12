module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: 'secret',
  port: process.env.PORT || 5000,
  testMongoURL: 'mongodb://lovely-aip:lovelyaip726@ds020208.mlab.com:20208/lovely-aip-test',
  testPort: 5001,
  email: process.env.EMAIL,
  emailPwd: process.env.EMAIL_PWD,
  frontendHost: process.env.NODE_ENV === 'production'
    ? 'http://knight-frank-web.s3-website-ap-southeast-2.amazonaws.com' : 'http://localhost:3000',
  backendHost: process.env.NODE_ENV === 'production'
    ? 'lovely-aip.herokuapp.com' : `localhost:${process.env.PORT || 5000}`,
  redisURI: process.env.REDIS_URI,
  redisPort: process.env.REDIS_PORT,
  redisPwd: process.env.REDIS_PWD,
};
