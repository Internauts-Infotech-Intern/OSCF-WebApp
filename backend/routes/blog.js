const router = require("express").Router();
const multer=require('multer');
const Blog = require("../models/Blog");
const storage=multer.memoryStorage();
const upload=multer({storage:storage});
//Get All Post
// router.get("/blog", async (req, res) => {
//     try {
//         console.log("Entered in blog retrive page")
//         let blog;
//         blog = await Blog.find();
        
//         console.log("BLog retrival finished",blog);
        
//         res.send(blog);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });
router.get("/blog",async(req,res)=>{
    try{
        const blogs=await Blog.find();
        console.log(blogs);
        const modifiedBlogs=blogs.map(blog=>({
            _id:blog._id,
            title:blog.title,
            description:blog.description,
            photo:`data:${blog.photo.contentType};base64,${blog.photo.data.toString('base64')}`

        }))
        // console.log("Stage 2",modifiedBlogs)
        res.send(modifiedBlogs)
    }
    catch(err){
        res.status(500).json(err);
    }
})
//Create Post
router.post("/cblog", upload.single('photo'),async (req, res) => {
    const {title,description}=req.body;
    const file=req.file;
    const newBlog=new Blog({
        title:title,
        description:description,
        photo:{
            data:file.buffer,
            contentType:file.mimetype,
        }
    })
    try {
        const savedBlog = await newBlog.save();
        res.status(200).json(savedBlog);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
//Update Post
router.put("/:id", async (req, res) => {
    try {
        console.log("This method is called")
        const blog = await Blog.findById(req.params.id);
        console.log("Phase 1")
        
            try {
                const updateBlog = await Blog.updateOne(
                    {_id:req.params.id},
                    {
                        $set: req.body,
                    },
                    { new: true }
                )
                console.log("Phase 2")
                res.status(200).json(updateBlog)
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
    //   const blog = await Blog.findById(req.params.id);

    //   console.log(blog);
    //   res.send(blog);
    // const blogs=await Blog.findById(req.params.id)
    // console.log(blogs);
    // const modifiedBlogs=blogs.map(blog=>({
    //     _id:blog._id,
    //     title:blog.title,
    //     description:blog.description,
    //     photo:`data:${blog.photo.contentType};base64,${blog.photo.data.toString('base64')}`

    // }))
    // console.log(modifiedBlogs);
    // res.send(modifiedBlogs)
    const blogs=await Blog.findById(req.params.id)
    const modifiedBlogs={
            _id:blogs._id,
            title:blogs.title,
            description:blogs.description,
            photo:`data:${blogs.photo.contentType};base64,${blogs.photo.data.toString('base64')}`

        }

        res.send(modifiedBlogs)

    } catch (err) {
      res.status(500).json(err);

    }
  });
  

//Delete Post
router.delete("/:id", async (req, res) => {
    try {
        console.log("Entered at stage 1")

      const blog = await Blog.findById(req.params.id);
      console.log("Entered at stage 2")
          try{
            console.log(blog);
            await blog.deleteOne();
          console.log("Entered at stage 3")
          res.status(200).json("Blog has been deleted...");}
        catch(err){
            res.status(500).json(err);
        }
      
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;