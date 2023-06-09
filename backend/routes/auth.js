const router = require("express").Router();
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const OtpModel = require("../models/Otp");
const cors = require("cors");
const sendMail = require("../functions/sendMail");
const generatePassword = require("../functions/passwordGenerator");
// const bcrypt = require("bcrypt");
router.use(
  cors({
    // origin: "http://localhost:3000",
    // methods: "GET,POST,PUT,DELETE",
  })
);
//REGISTER
router.post("/signup", async (req, res) => {
  var credential = req.body.credential;

  console.log("/signup credential is : ", credential);

  try {
    if (credential.flag == 0) {
      if (credential.password != credential.cpassword) {
        res.send({ status: 2 });
        return;
      }
    }
    const newUser = new UserModel({
      username: credential.username,
      email: credential.email,
      password: credential.password,
      phone: credential.phone,
      picture: credential.picture,
    });
    const p = generatePassword(8);
    if (credential.flag == 0) {
      newUser["phoneVarified"] = false;
      newUser["emailVarified"] = false;
    } else if (credential.flag == 1) {
      newUser.password = p;
      newUser["phoneVarified"] = false;
      newUser["emailVarified"] = true;
    }

    const user = await newUser.save();
    if (user) {
      console.log("/signup ");
      res.send({ status: 1 });
    }

    const subject = "welcome to OSCF community";
    const body = `<div class="contailner"> hello ${credential.email},
        you have successfully register into OSCF, your password is : ${p},
        <br><br>
        if you not aware of this email, kindly ignore it.
      </div>`;
    sendMail(credential.email, subject, body)
      .then((resolve) => {
        console.log("/signup sendMail || resolve");
      })
      .catch((reject) => {
        console.log("/signup  sendMail || reject : ", reject);
      });
  } catch (err) {
    console.log("/signup error is : ", err);
    res.send({ status: 5 });

  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const credential = req.body.credential;
  console.log("/Login credentia : ", credential);

  const user = await UserModel.findOne({ email: credential.email });

  if (credential.flag == 1) {
    console.log("user", user);
    if (!user) {
      res.send({ status: 0 });
      console.log("User is not found");
      return;
    }
    res.send({ status: 1, user: user });
  } else if (credential.flag == 0) {
    if (credential.password == null) {
      res.send({ status: 4 });
      return;
    }
    try {
      console.log("user", user);
      if (!user) {
        res.send({ status: 0 });
        console.log("User is not found");
        return;
      }
      // const validated = await compare(credential.password, user.password);
      if (credential.password != user.password) {
        res.send({ status: 2 });
        console.log("Password is wrong");
        return;
      }
      console.log("reach at status 1");
      res.send({ status: 1, user: user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
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

router.post("/emailvarification/generate", async (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();
  console.log("/emailvarification/generate || opt", otp);

  const subject = "email varification";
  const body = `<div class="contailner"> hello ${email},
        your request for email varification is arrive, your one time password is ${otp},
        <br><br>
        if you not aware of this email, kindly ignore it.
      </div>`;
  sendMail(email, subject, body)
    .then((resolve) => {
      console.log("sendMail || resolve");
      res.send({ status: 1 });
    })
    .catch((reject) => {
      console.log("sendMail || reject : ", reject);
      res.send({ status: 0 });
    });

  try {
    const result = await OtpModel.updateOne(
      { email }, // Filter to find the document by email
      { $set: { otp } }, // Update the OTP field
      { upsert: true }
    );

    if (result.modifiedCount > 0) {
      console.log("/emailvarification/generate || database updated");
    } else if (result.upsertedCount > 0) {
      console.log("/emailvarification/generate || database inserted");
    } else {
      console.log("/emailvarification/generate || database not modify");
    }
  } catch (e) {
    console.log("/emailvarification/generate || database store error: ", e);
  }
});

router.post("/emailvarification/varify", async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const newObj = await OtpModel.findOne({ email });
  console.log("/emailvarification/varify newObj : ", newObj);
  console.log(
    "/emailvarification/varify newObj : ",
    newObj.otp,
    " and otp :",
    otp
  );

  if (newObj.otp == otp) {
    const result = await UserModel.updateOne(
      { email }, // Filter to find the document by email
      { $set: { emailVarified: true } }, // Update the OTP field
      { upsert: true }
    );
    if (result.modifiedCount > 0) {
      console.log("/emailvarification/varify || database updated");
    }
    res.send({ status: 1 });
  } else {
    res.send({ status: 0 });
  }
});

router.post("/update/username", async (req, res) => {
  const user = req.body.user;
  const email = user.email;
  const username = req.body.username;
  console.log("update/username || username :", username);

  try {
    const result = await UserModel.updateOne(
      { email }, // Filter to find the document by email
      { $set: { username } }, // Update the OTP field
      { upsert: true }
    );

    if (result.modifiedCount > 0) {
      console.log("update/username || database updated");
    } else if (result.upsertedCount > 0) {
      console.log("update/username|| database inserted");
    } else {
      console.log("update/username || database not modify");
    }
    res.send({ status: 1 });
  } catch (e) {
    console.log("update/username || database store error: ", e);
    res.send({ status: 0 });
  }
});

function generateOTP() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  return otp;
}

module.exports = router;
