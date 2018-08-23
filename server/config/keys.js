module.exports = {
  mongoURI: 'mongodb://lovely-aip:lovelyaip726@ds253871.mlab.com:53871/lovely-aip',
  secretOrKey: 'secret',
  port: process.env.PORT || 5000,
  testMongoURL: 'mongodb://lovely-aip:lovelyaip726@ds020208.mlab.com:20208/lovely-aip-test',
  // testMongoURL: 'mongodb://localhost:27017/aiptest',
  test_port: 5001,
  email: process.env.EMAIL,
  emailPwd: process.env.EMAIL_PWD,
};
