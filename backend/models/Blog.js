const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
      },
      rating:{
        type:Number,
        require:false,

      },
      keywords:{
        type:Array,
        require:false
      },

      description: {
        type: String,
        required: true,
      },
      photo: {
        data:Buffer,
        contentType: String,
        // required: false,
      }
    }
  );
  
  module.exports = mongoose.model("Blog", BlogSchema);
  