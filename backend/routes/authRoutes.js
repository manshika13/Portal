const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { googleAuth } = require("../controllers/authController");
require("dotenv").config();
const router = express.Router();

// 🔹 SIGNUP (Manual Registration)
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received signup request:", req.body); // Debugging

  try {
    const existingUser = await User.findOne({ email });
    console.log("check", existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      provider: "manual",
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    await newUser.save();

    res.json({ data: { token: token, user: newUser } });
  } catch (error) {
    console.error("Signup Error:", error); // Log exact error
    res.status(500).json({ error: "Error registering user" });
  }
});

// 🔹 LOGIN (Manual)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.provider === "google") {
      return res.status(400).json({ error: "Please sign in with Google" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ data: { token: token, user: user } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// 🔹 GOOGLE LOGIN
router.get("/google/:access_token", googleAuth);

router.post("/submit", (req, res) => {
  res.status(200).json({ message: "Request received" });
});

module.exports = router;
