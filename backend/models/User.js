const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only for manual login
  image: { type: String }, // Only for Google login users
  provider: { type: String, enum: ["google", "manual"], required: true }, // Track login type
});

const User = mongoose.model("User", userSchema);
module.exports = User;
