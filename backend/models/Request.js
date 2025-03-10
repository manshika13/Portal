const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
  name: String,
  documentId: String,
  correctionType: String,
  reason: String,
  userEmail: String, // Storing the email for reference
});
const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
