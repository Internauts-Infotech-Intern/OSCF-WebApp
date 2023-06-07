const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  phone: {
    type: Number,
    // required:true,
  },
  picture: {
    type: String,
    required: true,
  },
  emailVarified: {
    type: Boolean,
    required: true,
  },
  phoneVarified: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("login_info", UserSchema);
