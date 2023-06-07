const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  otp: {
    type: Number,
  },
});

module.exports = mongoose.model("Otp", UserSchema);
