import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../../context/createcontext";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2]
  // console.log(path); 
  const { user, setUser } = useContext(UserContext);
  // console.log(user.username);
  // console.log(rating);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [rating, setRating] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [blog, setPost] = useState({});


  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:8080/blogs/" + path);
      console.log(res.data);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.description);
      setPhoto(res.data.photo);
      setRating(res.data.rating);
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
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/blogs/${blog._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) { }
  };
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/blogs/${blog._id}`, {
        // username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) { }
  };
  if (rating === null) {
    return <div>Loading...</div>;
  }
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
      <div>Hi this is Blog page</div>
      {updateMode ? (<input
        type="text"
        value={title}

        autoFocus
        onChange={(e) => setTitle(e.target.value)}
      />) : (
        <div>{title}</div>)}
      {updateMode ? (<input
        type="text"
        value={desc}

        autoFocus
        onChange={(e) => setDesc(e.target.value)}
      />) : (
        <div>{desc}</div>)}
      {/* <button onClick={handleLike}>Like</button>
      <span>{rating} Likes</span> */}
      {rating !== null ? (
        <>
          <button onClick={handleLike}>Like</button>
          <span>{rating} Likes</span>
        </>
      ) : (
        <div>Loading...</div>
      )}
      {updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>
          Update
        </button>
      )}

      <div>{!updateMode && user.username === "Admin" ? <button onClick={() => setUpdateMode(true)}>Update</button> : <></>}</div>
      {/* <div>{updateMode&&(<button onClick={handleUpdate}>Update Done</button>)}</div> */}
      <div>{!updateMode && user.username === "Admin" ? <button onClick={handleDelete}>Delete</button> : <></>}</div>
    </div>
  )
}