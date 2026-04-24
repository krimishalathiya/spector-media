const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  type: String,
  city: String,
  date: String,
  time: String
});

module.exports = mongoose.model("Booking", bookingSchema);