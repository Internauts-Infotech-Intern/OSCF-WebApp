const router = require("express").Router();
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const cors = require("cors");
// const bcrypt = require("bcrypt");
router.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",

  })
);
//REGISTER
router.post("/signup", async (req, res) => {
  try {
    if(req.body.password===req.body.cpassword){
    const newUser = new User({
      username:req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone:req.body.phone
    });
  

    const user = await newUser.save();
    res.status(200).json(user);
  }
  else{
    alert("Password and confirm password are not same");
  }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log("Login");
  try {

    const user = await User.findOne({ email: req.body.email });
    console.log("user",user)
    if (!user) {
      res.send({ status: 0 })
      console.log("User is not found")
      return;
    }
    // const validated = await compare(req.body.password, user.password);
    if (req.body.password!=user.password) {
      res.send({ status: 2 })
      console.log("Password is wrong")
      return
    }

    console.log("reach at status 1")
    res.send({ status: 1, user: user });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


router.get("/login/success", (req, res) => {
  console.log("Login  Success");
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    // console.log(err);
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
