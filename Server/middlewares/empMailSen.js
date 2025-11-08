const nodemailer = require('nodemailer');

const useMailsender = (uname, uemail, upass) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yyash9631@gmail.com',
      pass: 'hnqv beyv ckup vcsz',
    },
  });

  const mailOptions = {
    from: 'yyash9631@gmail.com',
    to: uemail,
    subject: 'Sending Email by Admin using Node.js Task Management System',
    text: `Dear ${uname},\nYour Password: ${upass}\nYou can login with your email and this password.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};

module.exports = { useMailsender };
