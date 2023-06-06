// import { useEffect,useState } from "react";
// import axios from "axios";

// import { useLocation,Link } from "react-router-dom";

// export default function Blog(){
//     const [blog,setBlog]=useState([]);
    
//     useEffect(()=>{
//         const fetchBlogs=async()=>{
//             const res=await axios.get("http://localhost:8080/blogs/blog");
//             console.log(res.data);
//             setBlog(res.data);
//             console.log("Blog pic",res.data.photo)
//         };
        
//         fetchBlogs();
        
//     },[]);

    
//     return(
//         <div>
//             {blog.map((p)=>(
//                 <div key={p._id}>
                
//                 <Link to={`/blog/${p._id}`}>
//                     <span >{p.title}</span>
//                 </Link>
//                 {/* <div>{p.photo}</div> */}
                
//                 <hr></hr>
//                 <p>{p.description}</p>
//                 {/* <img src={p.photo} /><br /> */}
//             </div>
//             ))}
//         </div>
//     )
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

export default function Blog() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/blogs/blog");
        setBlog(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      {blog.map((p) => (
        <div key={p._id}>
          <Link to={`/blog/${p._id}`}>
            <span>{p.title}</span>
          </Link>
          <hr />
          <p>{p.description}</p>
          {/* {p.photo && (
            <img
              src={p.photo}
              alt="Blog Image"
              style={{ maxWidth: "20%", height: "20%" }}
            /> */}
          {/* )} */}
        </div>
      ))}
    </div>
  );
}
