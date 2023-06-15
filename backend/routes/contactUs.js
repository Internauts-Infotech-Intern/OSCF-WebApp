const router = require("express").Router();
const multer = require("multer");
const ContactUsModel = require("../models/ContactUs");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/allmasseges", async (req, res) => {
  try {
    const blogs = await ContactUsModel.find();
    // console.log(blogs);
    const modifiedData = blogs.map((blog) => {
      const x = {
        _id: blog._id,
        name: blog.name,
        email: blog.email,
        masseges: blog.masseges,
      };
      return x;
    });
    res.send(modifiedData);
  } catch (err) {
    console.log("/resources || err", err);
    res.status(500).json(err);
  }
});
//get single Blog by _id
router.post("/masseges", async (req, res) => {
  try {
    console.log("/resource || ", req.body._id);
    const data = await ContactUsModel.findById(req.body._id);
    const modifiedData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      masseges: data.masseges,
    };
    res.send({ status: 1, modifiedData });
    console.log("status 1");
  } catch (err) {
    console.log(err);
    res.send({ status: 0 });
  }
});
//save massege
router.post("/savemasseges", async (req, res) => {
  try {
    console.log("/cresouirce || start ");
    const { name, email, massege, subject } = req.body;

    const time = Date.now();
    const obj = {
      name: name,
      email: email,
    };
    console.log("/savemasseges || ", obj , " ",massege);

    const savedContactUsModel = await ContactUsModel.updateOne(
      { email },
      { $push: { masseges: { massege, subject, time } },
        $set: {name},
      },
      { upsert: true }
    );
    res.send({ status: 1, savedContactUsModel });
  } catch (err) {
    console.log(err);
    res.send({ status: 0 });
  }
});

//Delete Post
router.post("/delete", async (req, res) => {
  console.log("/delete || _id : ", req.body);
  try {
    const blog = await ContactUsModel.findById(req.body._id);
    try {
      console.log(blog);
      await blog.deleteOne();
      console.log("/delete || _id ", req.body._id);
      res.send({ status: 1 });
    } catch (err) {
    console.log("0 : ",err);
      
      res.send({ status: 0 });
    }
  } catch (err) {
    console.log(err);
    res.send({ status: 3 });
  }
});

module.exports = router;
