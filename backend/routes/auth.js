const router = require("express").Router();
const passport = require("passport");
const dotenv= require("dotenv");
dotenv.config();
const User = require("../models/User");
// const bcrypt = require("bcrypt");
//REGISTER
router.post("/signup", async (req, res) => {
    try {
     
      const newUser = new User({
       
        email: req.body.email,
        password: req.body.password
      });
  
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //LOGIN
  router.post("/login", async (req, res) => {
    try {
  
      const user = await User.findOne({ username: req.body.username });
      if(!user) res.status(400).json(err);
  
      const validated = await bcrypt.compare(req.body.password, user.password);
      if(!validated) res.status(400).json(err);
  
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
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
