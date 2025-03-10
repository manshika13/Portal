const mongoose = require("mongoose");
const EmailSchema = new mongoose.Schema({
  to: String,
  subject: String,
  body: String,
  forwarded: { type: Boolean, default: false },
  timespan: { type: Date, default: Date.now },
});
const Email = mongoose.model("Email", EmailSchema);
module.exports = Email;
