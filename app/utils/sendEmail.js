// const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

// const sendEmail = async (email, subject, payload, template) => {
//   console.log(`${email} 12312`);
//   console.log(`${subject} 33333`);
//   console.log(`${payload.name} 2222`);
//   console.log(`${payload.link} 5555`);
//   console.log(`${template} 1111`);
//   try {
//     // create reusable transporter object using the default SMTP transport
//     let testAccount = await nodemailer.createTestAccount();
//     console.log(testAccount);

//     const transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//         user: testAccount.user,
//         pass: testAccount.pass, // naturally, replace both with your real credentials or an application-specific password
//       },
//     });

//     const source = fs.readFileSync(path.join(__dirname, template), 'utf8');
//     const compiledTemplate = handlebars.compile(source);
//     const options = () => {
//       return {
//         from: 'travee@gmail.com',
//         to: email,
//         subject: subject,
//         html: compiledTemplate(payload),
//       };
//     };

//     // Send email
//     transporter.sendMail(options(), (error, info) => {
//       if (error) {
//         return error;
//       } else {
//         return res.status(200).json({
//           success: true,
//         });
//       }
//     });
//   } catch (error) {
//     return error;
//   }
// };

// module.exports = sendEmail;

('use strict');
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (email, subject, payload, template) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'netustore@gmail.com',
      pass: 'ibicqawolmnvwbrr',
    },
  });

  const source = fs.readFileSync(path.join(__dirname, template), 'utf8');
  const compiledTemplate = handlebars.compile(source);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Travee ID 👻"', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: 'Hello world?', // plain text body
    html: compiledTemplate(payload),
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

module.exports = sendMail;
