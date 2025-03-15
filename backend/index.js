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
app.use("/auth/", authRoutes);

// 🔹 Email Transporter Setup (Use App Password for Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// 🔹 Define Schema & Model (Best Placed Near Related Routes)
const requestSchema = new mongoose.Schema({
  name: String,
  documentId: String,
  correctionType: String,
  reason: String,
  userEmail: String, // Storing the email for reference
});
const Request = mongoose.model("Request", requestSchema);

// 🔹 Route to Submit Correction Request
app.post("/auth/submit", async (req, res) => {
  const { userEmail, name, documentId, correctionType, reason } = req.body;

  // Validate Required Fields
  if (!userEmail) {
    return res.status(400).json({ message: "User email is required." });
  }

  // Save Request to MongoDB
  try {
    const newRequest = new Request({
      name,
      documentId,
      correctionType,
      reason,
      userEmail,
    });
    await newRequest.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Correction Request Submission",
      text: `Dear Anganvagi Team,

      A correction request has been submitted by ${userEmail}.

      Details:
      - Name: ${name}
      - Document ID: ${documentId}
      - Correction Type: ${correctionType}
      - Reason: ${reason}

      Best regards,
      Correction Request System`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Your request has been submitted successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error submitting request." });
  }
});

// 🔹 Handle 404 Errors Last
app.all("*", (req, res) => {
  res
    .status(404)
    .json({ message: `Can't find ${req.originalUrl} on the server` });
});

// 🔹 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
