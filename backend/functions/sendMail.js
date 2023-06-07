var nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

function emailsender(userEmail,subject, body) {
  return new Promise(function (resolve, reject) {
    console.log(
      "emailsender inside , credential : ",
      process.env.OFFICIAL_EMAIL_ID,
      " and ",
      process.env.OFFICIAL_EMAIL_ID_PASS
    );
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.OFFICIAL_EMAIL_ID,
        pass: process.env.OFFICIAL_EMAIL_ID_PASS,
      },
    });
    var mailOptions = {
      from: "travelagency3111@gmail.com",
      to: userEmail,
      subject: subject,
      html: body,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Email sent : " + info.response);
        resolve(info);
      }
    });
  });
}

module.exports = emailsender;
