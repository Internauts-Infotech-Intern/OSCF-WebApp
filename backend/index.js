const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const multer = require("multer");
const path = require("path");
dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
   filename: (req, file, cb) => {
    cb(null, req.body.name);
     },
});
const upload = multer({ storage: storage });
app.use("/api/auth", authRoute);





app.listen("5000", () => {
  console.log("Backend is running.");
});