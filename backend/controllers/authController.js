const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/googleClient");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const Request = require("../models/Request");
const nodemailer = require("nodemailer");

/* Google Authentication API */
exports.googleAuth = async (req, res) => {
  const { access_token } = req.params;

  try {
    if (!access_token) {
      return res.status(400).json({ message: "Access token is required" });
    }

    // Get user info using the access token
    const userRes = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log("Google User Data:", userRes.data);

    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        image: picture,
        provider: "google",
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT || "7d",
    });

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    console.error("Error details:", err.response?.data || err.message);
    res.status(500).json({
      message: "Google login failed",
      error: err.response?.data || err.message,
    });
  }
};

exports.correctionController = async (req, res) => {
  const { userEmail, name, documentId, correctionType, reason } = req.body;
  // Validate Required Fields
  if (!userEmail) {
    return res.status(400).json({ message: "User email is required." });
  }
  // Save Request to MongoDB
  try {
    const newRequest = await Request.create({
      userEmail,
      name,
      documentId,
      correctionType,
      reason,
    });
    await newRequest.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // App Password
      },
      debug: true,
    });

    const mailOptions = {
      to: process.env.EMAIL_USER,
      from: userEmail,
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

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.messageId);
      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

      res.json({
        message: "Your request has been submitted successfully.",
        emailStatus: "Sent successfully",
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Still save the request but inform about email failure
      res.json({
        message: "Your request was saved, but email confirmation failed.",
        error: emailError.message,
      });
    }
  } catch (emailError) {
    console.error("Error:", emailError);
    res.status(500).json({ message: "Error submitting request." });
  }
};
