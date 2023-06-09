const router = require("express").Router();
const multer = require("multer");
const ResourceModel = require("../models/Resource");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/resource", async (req, res) => {
  console.log("/resources start");
  try {
    const blogs = await ResourceModel.find();
    console.log(blogs);
    const modifiedBlogs = [];
    blogs.map((blog) => {
      const obj = {
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        rating: blog.rating,
      };
      if (blog.photo != null) {
        modifiedBlogs["photo"] = `data:${
          blog.photo.contentType
        };base64,${blog.photo.data.toString("base64")}`;
      }
      modifiedBlogs.push(obj);
    });

      console.log("/resource :",modifiedBlogs);
    res.send(modifiedBlogs);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Create Post
router.post("/cblog", upload.single("photo"), async (req, res) => {
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
  try {
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update Post
router.put("/:id", async (req, res) => {
  try {
    console.log("This method is called");
    const blog = await Blog.findById(req.params.id);
    console.log("Phase 1");

    try {
      const updateBlog = await Blog.updateOne(
        { _id: req.params.id },
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log("Phase 2");
      res.status(200).json(updateBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
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

//GET Blog
router.get("/:id", async (req, res) => {
  try {
    const blogs = await Blog.findById(req.params.id);
    const modifiedBlogs = {
      _id: blogs._id,
      title: blogs.title,
      description: blogs.description,
      photo: `data:${
        blogs.photo.contentType
      };base64,${blogs.photo.data.toString("base64")}`,
      rating: blogs.rating,
    };
    res.send(modifiedBlogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Post
router.delete("/:id", async (req, res) => {
  try {
    console.log("Entered at stage 1");

    const blog = await Blog.findById(req.params.id);
    console.log("Entered at stage 2");
    try {
      console.log(blog);
      await blog.deleteOne();
      console.log("Entered at stage 3");
      res.status(200).json("Blog has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
