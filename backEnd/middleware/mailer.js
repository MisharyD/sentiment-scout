// backEnd/mailer.js
const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
  "60487e48d77cdcc3b38285abf6a1eead",
  "e6a2cb205026cbdab82c355b85839e54"
);
  
  const sendMail = (toEmail, toUser, subject, textContent, htmlContent) => {
    return mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'sentimentscout@gmail.com', // Replace with a verified sender email
            Name: 'Sentiment Scout',
          },
          To: [
            {
              Email: toEmail,
              Name: toUser,
            },
          ],
          Subject: subject,
          TextPart: textContent,
          HTMLPart: htmlContent,
        },
      ],
    });
  };
  
  module.exports = sendMail;
  