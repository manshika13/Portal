const mongoose = require("mongoose");
require("dotenv").config(); // Ensure environment variables are loaded

const DB_URL = process.env.DB_URL;
console.log("DB--", DB_URL);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.error("DB CONNECTION FAILED");
    console.error("ERR: ", err);
  });
module.exports = mongoose;
