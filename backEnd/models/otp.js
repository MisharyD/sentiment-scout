const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expires in 5 minutes
});

otpSchema.plugin(uniqueValidator);

module.exports = mongoose.model("OTP", otpSchema);
