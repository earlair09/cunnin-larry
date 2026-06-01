require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post("/send", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text
    });

    res.json({ ok: true });

  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(3000, () => console.log("SMTP running"));
