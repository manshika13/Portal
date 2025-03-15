const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

// 🔹 Load Environment Variables First
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 Connect to MongoDB Early
require("./models/dbConnect");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // App Password
  },
  debug: true,
});

transporter.verify(function (error, success) {
  if (error) {
    console.log("SMTP server connection error:", error);
  } else {
    console.log(
      "SMTP server connection verified and ready to send emails" +
        process.env.EMAIL_USER +
        " " +
        process.env.EMAIL_PASS
    );
  }
});

// 🔹 Middleware (Ordering Matters)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // JSON Body Parser

// 🔹 Import Routes (Auth & Correction Requests)
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// 🔹 Handle 404 Errors Last
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: `Can't find ${req.originalUrl} on the server` });
});

// 🔹 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
