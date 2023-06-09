import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const MAX_IMAGE_SIZE = 1024 * 150;
const Resources = () => {

    const location = useLocation();

    const [resources, setResources] = useState([]);
    const [key, setKey] = useState(null);

    const [rating, setRating] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [keywords, setKeywords] = useState("");
    const [photo, setPhoto] = useState("");


    function getParam() {
        const _id = location.pathname.split("/")[3];
        console.log("key is : ", _id);
        setKey(_id);
        if (_id != "new") {
            fetchResource();
        }
    }

    const fetchResource = () => {
        axios.get("http://localhost:8080/resources/resource/" + key, {}).then((res) => {
            console.log(res.data);
            setResources(res.data);
        }).catch((err) => {
            console.log("err : ", err);
        });
    }
    useEffect(() => {
        getParam();
    }, []);


    const handleSubmit = () => {

    }

    const [previewURL, setPreviewURL] = useState("");

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        if (selectedPhoto && selectedPhoto.size > MAX_IMAGE_SIZE) {
            alert("image size is greter that 150KB");
            return;
        }
        console.log("image size : ", selectedPhoto.size);
        setPhoto(selectedPhoto);
        setPreviewURL(URL.createObjectURL(selectedPhoto));
    };
    return (<>
        <div className="container">

            
            {/* <div className="card text-center mb-5 "> */}
                {/* <img src={obj.photo} className="bd-placeholder-img card_img_margin mt-3 " width="200" height="200" />
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        autoFocus={true}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div> */}
                {/* <div className="card-body">
                    <Link to={`/admin/resources/${obj._id}`} className="card-text text-dark text-sm">
                        {obj.title}</Link>
                </div>
                {rating !== null ? (
                    <>
                        <div className="text-danger">{obj.rating} Likes</div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div> */}

            <div>
                {previewURL && (
                    <img
                        src={previewURL}
                        alt="Preview"
                        className="img-fluid rounded shadow-sm mx-auto d-block"
                    />
                )}
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    autoFocus={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="file"
                    placeholder="Title"
                    autoFocus={true}
                    onChange={handlePhotoChange}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="keywords"
                    autoFocus={true}
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    placeholder="Tell your story..."
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>
            <button type="button" onClick={handleSubmit}>Publish</button>
        </div>

    </>);
}
export default Resources;