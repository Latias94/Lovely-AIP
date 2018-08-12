const nodemailer = require('nodemailer');
const { email, emailPwd } = require('../config/keys');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  // service: 'qq', // https://nodemailer.com/smtp/well-known/
  port: 587,
  secureConnection: true,
  auth: {
    user: email,
    pass: emailPwd,
  },
});

const mailOptions = {
  from: `Knight Frank <${email}>`, // sender address
  to: 'superfrankie621@gmail.com', // list of receivers
  subject: 'Hello', // Subject line
  // text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>', // html body
};

module.exports = { mailOptions, transporter };
