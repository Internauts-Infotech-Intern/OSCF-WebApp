import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import UserContext from '../../context/createcontext';
import axios from 'axios';

export default function SpecificResource() {

  const location = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imagedata, setimgdata] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [documents, setdocuments] = useState([]);
  const [tutorials, settutorials] = useState([]);
  const [videos, setvideos] = useState([]);
  const [otherResources, setOtherResources] = useState([]);
  const [resource, setResource] = useState([]);
  const [rating, setRating] = useState(null);
  const [_id, setId] = useState(null);

  const path = location.pathname.split("/")[2];
  console.log("path : ", path);

  const getPost = async () => {
    console.log("_id : ", _id);
    if (_id) {
      const res = await axios.post("http://localhost:8080/resources/resource", { _id });
      console.log(res.data.modifiedBlogs);
      const blog = res.data.modifiedBlogs;
      setResource(blog);
      setTitle(blog.title);
      setDescription(blog.description);
      setOtherResources(blog.otherResources);
      setKeywords(blog.keywords);
      settutorials(blog.tutorials);
      setdocuments(blog.documentations);
      setvideos(blog.videos);
      setPhoto(blog.photo);
      setRating(blog.rating);
    }
  };


  useEffect(() => {
    console.log("getpost useeffect called");
    setId(path);
    getPost();
  }, [_id]);


  const handleLike = () => {
    axios.put(`http://localhost:8080/resources/like/${_id}`)
      .then(response => {
        setRating(response.data.rating);
      })
      .catch(error => {
        console.log(error);
      });
  }




  return (
    <div>
      <div className="">
        <div >
          <div >
            <img src={photo} width="160px" />
          </div>
          <div >
            <h1>{title}</h1>
          </div>
        </div>
        <div >
          <p>  Mozilla Firefox is a free and open-source internet browser that offers numerous plugins which can be accessed with a single mouse click. Available for Android, iOS, Linux, and Windows, Mozilla is free to use, modify and redistribute. Mozilla was born about 20 years ago out of the open-source software movement, and over the years, it reshaped the technology industry and the way social networks and operating systems operate. Today, open-source is mainstream, and it powers tech giants like Google, Facebook, and even Microsoft.</p>
        </div>
        <div >
          <p>Documentation for Mozilla Firefox &nbsp;
          </p>
          {documents.map((obj) => {
            return (
              <>
                <a key={obj} href={obj}>{obj}</a>
              </>
            )
          })}
        </div>

        <div >
          <p>Tutorial for Mozilla Firefox &nbsp;
          </p>
          {tutorials.map((obj) => {
            return (
              <>
                <a key={obj} href={obj}>{obj}</a>
              </>
            )
          })}
        </div>
        <div >
          <p>YouTube video for how to use Mozilla Firefox &nbsp;</p>
          {videos.map((obj) => {
            return (
              <>
                <a key={obj} href={obj}>{obj}</a>
              </>
            )
          })}
        </div>

        <div >
          <p>Other resources links</p>
          {otherResources.map((obj) => {
            return (
              <>
                <a key={obj} href={obj}>{obj}</a><br></br>
              </>
            )
          })}
        </div>
      </div>
      {
        rating !== null ? (
          <>
            <button className=' btn btn-primary' onClick={handleLike}>Like</button>
            <span>{rating} Likes</span>
          </>
        ) : (
          <div>Loading...</div>
        )
      }
    </div>
  )
}
