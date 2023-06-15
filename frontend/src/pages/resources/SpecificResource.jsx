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
      const res = await axios.post(process.env.REACT_APP_API_URL+"/resources/resource", { _id });
      console.log(res.data.modifiedResources);
      if (res.data.status == 1) {
        const resource = res.data.modifiedResources;
        if (resource != undefined) {
          setResource(resource);
          setTitle(resource.title);
          setDescription(resource.description);
          setOtherResources(resource.otherResources);
          setKeywords(resource.keywords);
          settutorials(resource.tutorials);
          setdocuments(resource.documentations);
          setvideos(resource.videos);
          setPhoto(resource.photo);
          setRating(resource.rating);
        }
      }
    }
  };


  useEffect(() => {
    console.log("getpost useeffect called");
    setId(path);
    getPost();
  }, [_id]);


  const handleLike = () => {
    axios.put(process.env.REACT_APP_API_URL +`/resources/like/${_id}`)
      .then(response => {
        setRating(response.data.rating);
      })
      .catch(error => {
        console.log(error);
      });
  }

  if (!resource) {
    return (
      <div className="container mt-5 ml-auto center p-5">
        loading...
      </div>
    )
  } else {
    return (
      <div className='main'>

        <div >
          <div className='head'>
            <div className='photo'>
              <img src={photo} width="160px" />
            </div>

            <div className='title'>
              <h1>{title}</h1>
            </div>
          </div>

          <div className='info'>
            <p>{description}</p>
          </div>

          <div className='space'>
            <p>Important info for open-source :</p>
            {documents.map((obj) => {
              return (
                <a href={obj}>
                  <button className='btn btn-info '>
                    Documentation
                  </button> &nbsp;
                </a>
              )
            })}
            {tutorials.map((obj) => {
              return (
                <a href={obj}>
                  <button className='btn btn-info '>
                    tutorials
                  </button> &nbsp;
                </a>
              )
            })}
            {videos.map((obj) => {
              return (
                <a href={obj}>
                  <button className='btn btn-danger '>
                    YouTube
                  </button>
                </a>
              )
            })}




          </div><br></br>

          <div className='space'>
            <p>Other resources :</p>
            {/* <div >
              <a href="https://www.javatpoint.com/mozilla-firefox">
                <button className='btn btn-info'>
                  javatpoint
                </button> &nbsp;
              </a>

              <a href="https://support.mozilla.org/en-US/products/firefox/get-started">
                <button className='btn btn-info'>
                  support mozilla
                </button> &nbsp;
              </a>

              <a href="https://edu.gcfglobal.org/en/firefox/">
                <button className='btn btn-info'>
                  gcfglobal
                </button>
              </a>
            </div> */}
            {otherResources.map((obj) => {
              return (
                <a href={obj}>
                  <button className='btn btn-info '>
                    otherResources
                  </button> &nbsp;
                </a>
              )
            })}
          </div><br></br>

          {
            rating !== null ? (
              <>
                <button className='space btn btn-success' onClick={handleLike}>Like</button>
                <span>{rating} Likes</span>
              </>
            ) : (
              <div>Loading...</div>
            )
          }
          {/* <div >
            <button className='space btn btn-success'>Like</button>
          </div> */}
        </div>


      </div>
    )
  }
}