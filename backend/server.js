require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const blogRoute = require("./routes/blog");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((responce) => {
    console.log("Connected to MongoDB , ", responce.connection.name);
  })
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


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		// origin: "http://localhost:3000"
		// methods: "GET,POST,PUT,DELETE",
	})
);

app.use("/api/auth", authRoute);
app.use("/auth", authRoute);
app.use("/blogs", blogRoute);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
