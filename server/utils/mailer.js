const _ = require('lodash');
const nodemailer = require('nodemailer');
const { email, emailPwd } = require('../config/keys');

// usage
// mailer({
//   to: 'someone@example.com',
//   subject: 'test',
//   text: 'something',
// });

const config = {
  host: 'smtp.ethereal.email',
  port: 587,
  // secureConnection: true,
  auth: {
    user: email,
    pass: emailPwd,
  },
};

const transporter = nodemailer.createTransport(config);

const defaultMail = {
  from: `Knight Frank <${email}>`,
  subject: 'Hello',
  html: '<b>Hello world?</b>', // html body
};

module.exports = (mail) => {
  // default setting
  mail = _.merge({}, defaultMail, mail);

  // send email
  transporter.sendMail(mail, (error, info) => {
    if (error) return console.log(error);
    console.log('mail sent:', info.response);
    return false;
  });
};
