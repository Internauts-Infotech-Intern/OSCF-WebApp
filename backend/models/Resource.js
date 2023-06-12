const mongoose = require("mongoose");
const ResourcesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  documentations: {
    type: Array,
    require: false,
  },
  tutorials: {
    type: Array,
    require: false,
  },
  videos: {
    type: Array,
    require: false,
  },
  otherResources: {
    type: Array,
    require: false,
  },
  rating: {
    type: Number,
    require: false,
    default: 0,
  },
  keywords: {
    type: Array,
    require: false,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("resource", ResourcesSchema);
