// import { useContext } from "react";
// import SinglePost from "./SinglePost";
// import UserContext from "../../context/createcontext";
// import Login from "../login/Login"
// export default function Single() {
//     const { user, setUser } = useContext(UserContext);
//     console.log(user);
//     return (
//         <div className="single">
//             {user === null ? <Login /> :
//                 <SinglePost />
//             }
//             <div></div>
//         </div>
//     );
// }

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../../context/createcontext";



export default function SpecificBlog() {
    const location = useLocation();
    const path = location.pathname.split("/")[2]
    const { user, setUser } = useContext(UserContext);   
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [photo, setPhoto] = useState("");
    const [rating, setRating] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [blog, setBLog] = useState({});


    useEffect(() => {
        const getPost = async () => {
            const _id = path;
            const res = await axios.post("http://localhost:8080/blogs/blog", { _id });
            console.log(res.data.modifiedBlogs);
            const blog = res.data.modifiedBlogs;
            setBLog(blog);
            setTitle(blog.title);
            setDesc(blog.description);
            setPhoto(blog.photo);
            setRating(blog.rating);
        };
        getPost();
    }, [path]);
    const handleLike = () => {
        axios.put(`http://localhost:8080/blogs/like/${blog._id}`)
            .then(response => {

                // Update the rating on the frontend
                setRating(response.data.rating);
            })
            .catch(error => {
                console.log(error);
            });
    }
    if (rating === null) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <div>
                    {photo && (
                        <img
                            src={photo}
                            alt="Blog Image"
                            style={{ maxWidth: "20%", height: "20%" }}
                        />
                    )}
                </div>
                <div
                >{title}</div>
                <div
                >{desc}</div>

                {rating !== null ? (
                    <>
                        <button onClick={handleLike}>Like</button>
                        <span>{rating} Likes</span>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        )
    }
}