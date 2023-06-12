const router = require("express").Router();
const multer = require("multer");
const ResourcesModel = require("../models/Resource");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/resources", async (req, res) => {
  try {
    const blogs = await ResourcesModel.find();
    // console.log(blogs);
    const modifiedBlogs = blogs.map((blog) => {
      const x = {
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        documentations: blog.documentations,
        tutorials: blog.tutorials,
        videos: blog.videos,
        otherResources: blog.otherResources,
        keywords: blog.keywords,
        rating: blog.rating,
      };

      if (blog.photo.data) {
        x["photo"] = `data:${
          blog.photo.contentType
        };base64,${blog.photo.data.toString("base64")}`;
      } else {
        x["photo"] = null;
      }
      return x;
    });
    // console.log("Stage 2", modifiedBlogs.rating);
    res.send(modifiedBlogs);
  } catch (err) {
    console.log("/resources || err", err);
    res.status(500).json(err);
  }
});
//get single Blog by _id
router.post("/resource", async (req, res) => {
  try {
    console.log("/resource || ", req.body._id);
    const blogs = await ResourcesModel.findById(req.body._id);
    const modifiedResources = {
      _id: blogs._id,
      title: blogs.title,
      keywords: blogs.keywords,
      description: blogs.description,
      documentations: blogs.documentations,
      tutorials: blogs.tutorials,
      videos: blogs.videos,
      otherResources: blogs.otherResources,
      rating: blogs.rating,
      photo: `data:${
        blogs.photo.contentType
      };base64,${blogs.photo.data.toString("base64")}`,
    };
    res.send({ status: 1, modifiedResources });
  } catch (err) {
    console.log(err);
    res.send({ status: 0 });
  }
});
//Create Post
router.post("/cresource", upload.single("photo"), async (req, res) => {
  try {
    console.log("/cresouirce || start ");
    const {
      title,
      description,
      keywords,
      documentations,
      tutotials,
      videos,
      otherResources,
    } = req.body;

    const file = req.file;

    const ka = keywords.split(",");
    const da = documentations.split(",");
    const ta = tutotials.split(",");
    const va = videos.split(",");
    const oa = otherResources.split(",");

    const newResourcesModel = new ResourcesModel({
      title: title,
      description: description,
      documentations: da,
      tutorials: ta,
      videos: va,
      otherResources: oa,
      rating: 0,
      keywords: ka,
    });
    if (file) {
      newResourcesModel["photo"] = {
        data: file.buffer,
        contentType: file.mimetype,
      };
    } else {
      newResourcesModel["photo"] = {
        data: null,
        contentType: null,
      };
    }
    const savedResourcesModel = await newResourcesModel.save();
    res.send({ status: 1, savedResourcesModel });
  } catch (err) {
    console.log(err);
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
    if (photoChanged == "true") {
      updateObj["photo"] = {
        data: file.buffer,
        contentType: file.mimetype,
      };
    }
    const updateBlog = await ResourcesModel.updateOne(
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
    const blog = await ResourcesModel.findById(req.params.id);
    blog.rating += 1;
    const updatedBlog = await blog.save();
    console.log("resource updated");
    res.json(updatedBlog);
  } catch (err) {
    console.log("errror : ", err);
    res.status(500).json(err);
  }
});

//Delete Post
router.post("/delete", async (req, res) => {
  try {
    const blog = await ResourcesModel.findById(req.body._id);
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
