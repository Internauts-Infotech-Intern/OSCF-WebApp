const router = require("express").Router();
const multer = require("multer");
const Blog = require("../models/Blog");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    // console.log(blogs);
    const modifiedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      keywords: blog.keywords,
      rating: blog.rating,
      photo: `data:${blog.photo.contentType};base64,${blog.photo.data.toString(
        "base64"
      )}`,
    }));
    // console.log("Stage 2", modifiedBlogs.rating);
    res.send(modifiedBlogs);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Create Post
router.post("/cblog", upload.single("photo"), async (req, res) => {
  try {
    const { title, description, keywords } = req.body;
    const file = req.file;
    console.log(keywords);
    const words = keywords.split(",");
    console.log("keywords splited : ", words);
    const newBlog = new Blog({
      title: title,
      description: description,
      photo: {
        data: file.buffer,
        contentType: file.mimetype,
      },
      keywords: words,
    });

    const savedBlog = await newBlog.save();
    res.send({ status: 1, savedBlog });
  } catch (err) {
    res.send({ status: 0 });
  }
});
//Update Post
router.post("/update", upload.single("photo"), async (req, res) => {
  try {
    const { _id, title, description, keywords, photoChanged } = req.body;
    const file = req.file;
    console.log("/update id :", req.body);
    const words = keywords.split(",");
    console.log("keywords splited : ", words);
    var updateObj = {
      title: title,
      description: description,
      keywords: words,
    };
    if (photoChanged == 'true') {
      updateObj["photo"] = {
        data: file.buffer,
        contentType: file.mimetype,
      };
    }
    const updateBlog = await Blog.updateOne(
      { _id: _id },
      {
        $set: updateObj,
      },
      { upsert: true }
    );

    console.log("updateBlog : ", updateBlog);
    res.send({ status: 1, updateBlog });
  } catch (err) {
    console.log(err);
    res.send({ status: 0 });
  }
});

//Like Handelling

router.put("/like/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    console.log("Stage 1 completed");
    // Increase the rating by 1
    blog.rating += 1;
    console.log("Stage 2 completed", blog.rating);

    try {
      // Save the updated blog
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single Blog by _id
router.post("/blog", async (req, res) => {
  try {
    console.log("/blog || ", req.body._id);
    const blogs = await Blog.findById(req.body._id);
    const modifiedBlogs = {
      _id: blogs._id,
      title: blogs.title,
      keywords: blogs.keywords,
      description: blogs.description,
      rating: blogs.rating,
      photo: `data:${
        blogs.photo.contentType
      };base64,${blogs.photo.data.toString("base64")}`,
    };
    res.send({ status: 1, modifiedBlogs });
  } catch (err) {
    console.log(err);
    res.send({ status: 0 });
  }
});

//Delete Post
router.post("/delete", async (req, res) => {
  try {
    const blog = await Blog.findById(req.body._id);
    try {
      console.log(blog);
      await blog.deleteOne();
      console.log("delete / || _id ", req.body._id);
      res.send({ status: 1 });
    } catch (err) {
      res.send({ status: 0 });
    }
  } catch (err) {
    res.send({ status: 3 });
  }
});
module.exports = router;
