const axios = require("axios");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/googleClient");
const User = require("../models/User");

/* Google Authentication API */
exports.googleAuth = async (req, res) => {
  const { code } = req.query;

  try {
    if (!code) {
      return res
        .status(400)
        .json({ message: "Authorization code is required" });
    }
    // Exchange code for access token
    const { tokens } = await oauth2Client.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });
    oauth2Client.setCredentials(tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`,
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      }
    );
    const { email, name, picture } = userRes.data;
    // console.log(userRes);
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
      token,
      user,
    });
  } catch (err) {
    console.error("Google Login Error:", err.response?.data || err.message);
    res.status(500).json({
      message: "Google login failed",
      error: err.response?.data || err.message,
    });
  }
};
