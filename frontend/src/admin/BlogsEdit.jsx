import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "./admin.css";


const MAX_FILE_SIZE = 150 * 1024;
export default function BlogsEdit() {

    const uploadInputRef = useRef(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [imagedata, setimgdata] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [keywords, setKeywords] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [_id, setId] = useState(null);
    const [newKeyword, setNewKeyword] = useState("");

    const [newBlog, setNewBlog] = useState(true);

    const location = useLocation();
    useEffect(() => {
        const path = location.pathname.split("/")[3];
        console.log("path is :", path)
        setId(path);
    }, [])
    useEffect(() => {
        if (_id != null && _id != "new") {
            axios.post("http://localhost:8080/blogs/blog", { _id }).then((res) => {
                console.log("responce is : ", res);
                if (res.data.status == 1) {
                    const blog = res.data.modifiedBlogs;
                    setTitle(blog.title);
                    setDescription(blog.description);
                    setKeywords(blog.keywords);
                    setPhoto(blog.photo);
                    setimgdata(blog.photo);


                } else {
                    alert("internal server error");
                }
            }).catch((error) => {
                console.log("error : ", error);
            })
            setNewBlog(false);
        } else {
            setNewBlog(true);
        }
    }, [_id]);

    const handleAdd = () => {
        if (photo && photo.size > MAX_FILE_SIZE) {
            alert("The selected image exceeds the maximum file size limit.");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("photo", photo);
        formData.append("keywords", keywords);
        axios.post("http://localhost:8080/blogs/cblog", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
            if (response.data.status == 1) {
                alert("blogs added succesfully");
                setTitle("");
                setDescription("");
                setKeywords([]);
                setPhoto(null);
                setimgdata(null);
            } else {
                alert("blogs not added succesfully")
            }

        }).catch((err) => {
            console.log(err);
        });
    };
    function handleUploadChange(e) {
        const file = uploadInputRef.current.files[0];
        const fileSizeInBytes = file.size;
        const maxSizeInBytes = 200 * 1024; // 200KB
        if (fileSizeInBytes > maxSizeInBytes) {
            alert('File size exceeds the limit (200KB). Please choose a smaller file.');
            return;
        }
        setImageChanged(true);
        var reader = new FileReader();
        reader.onload = function (e) {
            setimgdata(e.target.result)
        };
        reader.readAsDataURL(uploadInputRef.current.files[0]);
    }
    const handleAddKeyword = () => {
        if (newKeyword) {
            setKeywords([...keywords, newKeyword]);
            setNewKeyword("");
        }
    };
    const handleRemoveKeyword = (keyword) => {
        const updatedKeywords = keywords.filter((kw) => kw !== keyword);
        setKeywords(updatedKeywords);
    };
    const handleSave = () => {
        console.log("handleSave is called");
        if (photo && photo.size > MAX_FILE_SIZE) {
            alert("The selected image exceeds the maximum file size limit.");
            return;
        }
        const formData = new FormData();
        formData.append("_id", _id);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("keywords", keywords);
        if (imageChanged) {
            formData.append("photoChanged", true);
            formData.append("photo", photo);
        } else {
            formData.append("photoChanged", false);
        }
        axios.post("http://localhost:8080/blogs/update", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
            if (response.data.status == 1) {
                alert("blogs updated");
            } else {
                alert("blogs not updated");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (

        <div className="container text-center">

            <div className="h3">
                <label > Blog name :</label>
                <input className="m-5 " value={title} onChange={(event) => {
                    setTitle(event.target.value);
                }} />
            </div>
            <div >
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative shadow-lg p-1">
                    <div className="col  d-flex flex-column p-2 ">
                        <strong className="d-inline-block mb-2 text-success p-2 h3">Description</strong>
                        <textarea className="mb-auto h6 text-left" value={description} rows="26" onChange={(e) => { setDescription(e.target.value) }
                        } />
                    </div>
                    <div className="col-auto  "> {/* d-none d-lg-block pr-0 */}
                        <div className="row">
                            <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm ">
                                <input
                                    id="upload"
                                    type="file"
                                    onChange={(e) => { setPhoto(e.target.files[0]); handleUploadChange(e); }}
                                    ref={uploadInputRef}
                                    className="form-control border-0"
                                />
                                <label id="upload-label" htmlFor="upload" className="font-weight-light text-muted">
                                    Choose file
                                </label>
                                <div className="input-group-append">
                                    <label htmlFor="upload" className="btn btn-light m-0 rounded-pill px-4">
                                        <i className="fa fa-cloud-upload mr-2 text-muted"></i>
                                        <small className="text-uppercase font-weight-bold text-muted">Choose file</small>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <img className="bd-placeholder-img" width="500" height="500" src={imagedata} alt={title} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card ">
                <div className="row p-3">
                    <div className="col ">
                        <label>Add Keyword:</label>
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                        />
                        <button onClick={handleAddKeyword}>Add</button>
                    </div>

                    <div className="col">
                        <h4>Keywords:</h4>
                        <ul>
                            {keywords.map((keyword) => (
                                <li className="my-1 align-content-center" key={keyword}>
                                    {keyword}{" "}
                                    <button className="btn btn-sm btn-danger ml-5 " onClick={() => handleRemoveKeyword(keyword)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            {newBlog ?
                <div className="btn btn-success m-3 " onClick={handleAdd}>Save</div>
                :
                <div className="btn btn-success m-3 " onClick={handleSave}>Save</div>
            }
        </div>

    );
}
