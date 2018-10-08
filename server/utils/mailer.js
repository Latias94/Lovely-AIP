const _ = require('lodash');
const nodemailer = require('nodemailer');
const { email, emailPwd } = require('../config/keys');

// use case
// mailer({
//   to: 'someone@example.com',
//   subject: 'test',
//   text: 'something',
// });

const config = {
  service: 'QQ',
  // port: 465,
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
  transporter.sendMail(mail);
};
