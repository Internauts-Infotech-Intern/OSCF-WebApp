import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const MAX_FILE_SIZE = 150 * 1024;

const Resources = () => {

    const uploadInputRef = useRef(null);

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
    const [resources, setResources] = useState([]);
    const [_id, setId] = useState(null);

    const [newKeyword, setNewKeyword] = useState("");
    const [newDocument, setNewDocument] = useState("");
    const [newTutorial, setNewTutorial] = useState("");
    const [newOtherResources, setNewOtherResources] = useState("");
    const [newVideos, setNewVideos] = useState("");

    const [newResources, setNewResources] = useState(true);

    const location = useLocation();
    useEffect(() => {
        const path = location.pathname.split("/")[3];
        console.log("path is :", path)
        setId(path);
    }, [])
    useEffect(() => {
        if (_id  && _id != "new") {
            axios.post("http://localhost:8080/resources/resource", { _id }).then((res) => {
                console.log("responce is : ", res);
                if (res.data.status == 1) {
                    const blog = res.data.modifiedResources;

                    setTitle(blog.title);
                    setDescription(blog.description);
                    setKeywords(blog.keywords);
                    setdocuments(blog.documentations);
                    settutorials(blog.tutorials);
                    setvideos(blog.videos);
                    setOtherResources(blog.otherResources);
                    setPhoto(blog.photo);
                    setimgdata(blog.photo);


                } else {
                    alert("internal server error");
                }
            }).catch((error) => {
                console.log("error : ", error);
            })
            setNewResources(false);
        } else {
            setNewResources(true);
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
        formData.append("documentations", documents);
        formData.append("tutotials", tutorials);
        formData.append("videos", videos);
        formData.append("otherResources", otherResources);
        axios.post("http://localhost:8080/resources/cresource", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
            if (response.data.status == 1) {
                alert("resources added succesfully");
                setTitle("");
                setDescription("");
                setPhoto(null);
                setimgdata(null);

                setKeywords([]);
                setdocuments([]);
                settutorials([]);
                setvideos([]);
                setOtherResources([]);

            } else {
                alert("resources not added succesfully")
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
        axios.post("http://localhost:8080/resources/update", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log(response.data);
            if (response.data.status == 1) {
                alert("resources updated");
            } else {
                alert("resources not updated");
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleAddKeyword = (value) => {
        // console.log("handleAddKeyword, value : ", value);
        if (value == 1) {
            if (newKeyword) {
                setKeywords([...keywords, newKeyword]);
                setNewKeyword("");
            }
        } else if (value == 2) {
            if (newDocument) {
                setdocuments([...documents, newDocument]);
                setNewDocument("");
            }

        } else if (value == 3) {
            if (newTutorial) {
                settutorials([...tutorials, newTutorial]);
                setNewTutorial("");
            }

        } else if (value == 4) {
            if (newVideos) {
                setvideos([...videos, newVideos]);
                setNewVideos("");
            }

        } else if (value == 5) {
            if (newOtherResources) {
                setOtherResources([...otherResources, newOtherResources]);
                setNewOtherResources("");
            }
        }
    };
    const handleRemoveKeyword = (value, keyword) => {
        if (value == 1) {
            const updatedKeywords = keywords.filter((kw) => kw !== keyword);
            setKeywords(updatedKeywords);
        } else if (value == 2) {
            const updatedKeywords = documents.filter((kw) => kw !== keyword);
            setdocuments(updatedKeywords);
        } else if (value == 3) {
            const updatedKeywords = tutorials.filter((kw) => kw !== keyword);
            settutorials(updatedKeywords);

        } else if (value == 4) {
            const updatedKeywords = videos.filter((kw) => kw !== keyword);
            setvideos(updatedKeywords);
        }
        else if (value == 5) {
            const updatedKeywords = otherResources.filter((kw) => kw !== keyword);
            setOtherResources(updatedKeywords);
        }
    };

    return (<>
        <div className="container text-center">
            <div className="h3">
                <label > Resource name :</label>
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

            {/* keywords */}
            <div className="card m-2 ">
                <div className="row p-3">
                    <div className="col ">
                        <label>Add Keyword:</label>
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                        />
                        <button onClick={() => { handleAddKeyword(1); }}>Add</button>
                    </div>

                    <div className="col">
                        <h4>Keywords:</h4>
                        <ul>
                            {keywords.map((keyword) => (
                                <li className="my-1 align-content-center" key={keyword}>
                                    {keyword}{" "}
                                    <button className="btn btn-sm btn-danger ml-5 " onClick={() => handleRemoveKeyword(1, keyword)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            {/* documentation */}
            <div className="card m-2 ">
                <div className="row p-3">
                    <div className="col ">
                        <label>Add documentation links:</label>
                        <input
                            type="text"
                            value={newDocument}
                            onChange={(e) => setNewDocument(e.target.value)}
                        />
                        <button onClick={() => { handleAddKeyword(2); }}>Add</button>
                    </div>

                    <div className="col">
                        <h4>documentation links:</h4>
                        <ul>
                            {documents.map((keyword) => (
                                <li className="my-1 align-content-center" key={keyword}>
                                    {keyword}{" "}
                                    <button className="btn btn-sm btn-danger ml-5 " onClick={() => handleRemoveKeyword(2, keyword)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            {/* tutorials */}
            <div className="card m-2 ">
                <div className="row p-3">
                    <div className="col ">
                        <label>Add tutorials links:</label>
                        <input
                            type="text"
                            value={newTutorial}
                            onChange={(e) => setNewTutorial(e.target.value)}
                        />
                        <button onClick={() => { handleAddKeyword(3); }}>Add</button>
                    </div>

                    <div className="col">
                        <h4>tutorials links:</h4>
                        <ul>
                            {tutorials.map((keyword) => (
                                <li className="my-1 align-content-center" key={keyword}>
                                    {keyword}{" "}
                                    <button className="btn btn-sm btn-danger ml-5 " onClick={() => handleRemoveKeyword(3, keyword)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            {/* videos */}
            <div className="card m-2 ">
                <div className="row p-3">
                    <div className="col ">
                        <label>Add video links:</label>
                        <input
                            type="text"
                            value={newVideos}
                            onChange={(e) => setNewVideos(e.target.value)}
                        />
                        <button onClick={() => { handleAddKeyword(4); }}>Add</button>
                    </div>

                    <div className="col">
                        <h4>video links:</h4>
                        <ul>
                            {videos.map((keyword) => (
                                <li className="my-1 align-content-center" key={keyword}>
                                    {keyword}{" "}
                                    <button className="btn btn-sm btn-danger ml-5 " onClick={() => handleRemoveKeyword(4, keyword)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
            {/* other resources */}
            <div className="card m-2 ">
                <div className="row p-3">
                    <div className="col ">
                        <label>Add other resources links:</label>
                        <input
                            type="text"
                            value={newOtherResources}
                            onChange={(e) => setNewOtherResources(e.target.value)}
                        />
                        <button onClick={() => { handleAddKeyword(5); }}>Add</button>
                    </div>

                    <div className="col">
                        <h4>other resources links:</h4>
                        <ul>
                            {otherResources.map((keyword) => (
                                <li className="my-1 align-content-center" key={keyword}>
                                    {keyword}{" "}
                                    <button className="btn btn-sm btn-danger ml-5 " onClick={() => handleRemoveKeyword(5, keyword)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>

            {newResources ?
                <div className="btn btn-success m-3 " onClick={handleAdd}>Save</div>
                :
                <div className="btn btn-success m-3 " onClick={handleSave}>Save</div>
            }
        </div>
    </>);
}
export default Resources;