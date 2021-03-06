/* eslint-disable no-console */
const nodemailer = require('nodemailer');

require('dotenv').config();

class SmtpClient {
  constructor() {
    this.transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PW,
      },
    });
  }

  notifyMe(subject, text = '') {
    const message = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      subject,
      text,
    };

    this.transport.sendMail(message, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log(info);
      }
    });
  }
}

module.exports = SmtpClient;
