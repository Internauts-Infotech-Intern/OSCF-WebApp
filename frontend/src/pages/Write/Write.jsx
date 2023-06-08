import { useContext,useState } from "react";
import axios from "axios";
import UserContext from "../../context/createcontext";
export default function Write(){
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [keyword,setKeyord]=useState("");
    const [photo,setPhoto]=useState("");
    const[blogs,setBlogs]=useState([]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('title',title);
        formData.append('description',description);
        formData.append('photo',photo);
        axios.post('http://localhost:8080/blogs/cblog',formData,{
          headers:{
            'Content-Type':'multipart/form-data',

          },

        })
        .then((response)=>{
          console.log(response.data);
          setBlogs([...blogs,response.data])
        })
        .catch((err)=>{
          console.log(err);
        })
        // let newBlog;
        // if(photo)
        // {
        //   newBlog={
        //     title,
        //     description,
        //     photo,
        //   };
        // }
        // else
        // {newBlog={
        //     title,
        //     description,
        // };}
      
        // if(photo)
        // {
        //     const data=new FormData();
        //     const filename=Date.now()+photo.name;
        //     data.append("name",filename);
        //     data.append("photo",photo);
        //     newBlog.photo=filename;
        //     try{
        //         await axios.post("/upload",data);

        //     }catch(err){}
        // }
        // try{
        //     const res=await axios.post("http://localhost:8080/blogs/cblog",newBlog);

        // }catch(err){}
    };
    return(
        <div>
          <form onSubmit={handleSubmit} >
          <div>
          <input
            type="text"
            placeholder="Title"
            
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            placeholder="Title"
            
            autoFocus={true}
            onChange={e=>setPhoto(e.target.files[0])}
          />
        </div>
        <div >
          <textarea
            placeholder="Tell your story..."
            type="text"
            
            onChange={e=>setDescription(e.target.value)}
          ></textarea>
        </div>
        <button  type="submit">
          Publish
        </button>
            </form> 
        </div>
    )
}