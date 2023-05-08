import asyncHandler from "express-async-handler";
// const sendGridTransport = require("nodemailer-sendgrid-transport");
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ahmadmoughrabi2020@gmail.com",
    pass: "hddwkzwgkqishixe", // naturally, replace both with your real credentials or an application-specific password
  },
});
const messageDeliver = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "ahmadmoughrabi2020@gmail.com",
    subject: "New Contact Form Submission BrainBulb",
    html: `
              <p>Name: ${name}</p>
              <p>Email: ${email}</p>
              <p>Message: ${message}</p>
          `,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ success: true });
    }
  });
});
export { messageDeliver };
