const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  masseges: {
    type: Array,
    require: false,
  },
});

module.exports = mongoose.model("ContactUs", BlogSchema);
