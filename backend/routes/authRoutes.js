const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { googleAuth } = require("../controllers/authController");
require("dotenv").config();
const router = express.Router();

// 🔹 SIGNUP (Manual Registration)
router.post("/auth/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received signup request:", req.body); // Debugging

  try {
    const existingUser = await User.findOne({ email });

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

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error); // Log exact error
    res.status(500).json({ error: "Error registering user" });
  }
});

// 🔹 LOGIN (Manual)
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

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
  res.json({ token });
});

// 🔹 GOOGLE LOGIN
router.get("/auth/google", googleAuth);

module.exports = router;
