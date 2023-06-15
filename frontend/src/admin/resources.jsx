import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import photo123 from "../images/open.jpg";
import UserContext from "../context/createcontext";

import "./resource.css";

const Resources = () => {

    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [addContent, setAdContent] = useState([{
        _id: "new",
        photo: "",
    }]);
    const { searchBarInput } = useContext(UserContext);


    function filterBlogs() {
        console.log("/resources || enter in filterblogs");
        if (searchBarInput) {
            const filtered = resources.filter((blog) =>
                blog.keywords.some((keyword) =>
                    keyword.toLowerCase().includes(searchBarInput.toLowerCase())
                )
            );
            setFilteredResources(filtered);
        } else {
            setFilteredResources(resources);
        }
    }

    useEffect(() => {
        filterBlogs();
    }, [searchBarInput, resources]);


    const fetchResource = () => {
        axios.get(process.env.REACT_APP_API_URL+"/resources/resources", {}).then((res) => {
            console.log(res.data);
            setResources(res.data);
        }).catch((err) => {
            console.log("err : ", err);
        });
    }
    useEffect(() => {
        fetchResource();
    }, []);


    function handleDelete(_id, title) {

        const permition = window.confirm("confirm to delete resource name : " + title);
        console.log("per : ", permition);
        if (permition) {
            try {
                axios.post(process.env.REACT_APP_API_URL+`/resources/delete`, {
                    _id,
                }).then((res) => {
                    if (res.data.status == 1) {
                        alert("blogs deleted");
                        removeBlogsFomList(_id);
                    } else if (res.data.status == 2) {
                        alert("blogs not deleted");
                    } else if (res.data.status == 3) {
                        alert("internal server error");
                    } else {
                        alert("un handled status arrive");
                    }
                });
            } catch (err) { console.log(err); }
        }
    };
    function removeBlogsFomList(_id) {
        setResources(resources.filter((obj) => obj._id !== _id));
    }



    let addCard = addContent.map((obj) => {
        return <Link to={`/admin/resource/${"new"}`} className="col p-5" key="new" >
            <div className="card  text-center mb-5 ">
                <AddIcon className="bd-placeholder-img card_img_margin mt-3 " width="200" height="200" />
                <div className="card-body">
                    <div className="x   card-text text-dark text-sm">
                        add</div>
                </div>
            </div>
        </Link>
    });
    let list = filteredResources.map((obj) => {


        return <div className="col res-col my-2" key={obj._id} >
            <article className="card">
                <img
                    className="card__background"
                    src={obj.photo}
                    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                    width="200"
                    height="200"
                />
                <div className="card__content | flow">
                    <div className="card__content--container | flow">
                        <h2 className="card__title">{obj.title}</h2>
                        <p className="card__description">
                            {/* {obj.description} */}hi i am aarju
                        </p>
                        <button className="btn btn-success card__button ">Read more</button>

                    </div>
                </div>
            </article>
            <hr />
            <a className="mb-2"><Link to={`/admin/resource/${obj._id}`} className="btn btn-primary btn-sm mx-3">update</Link><div onClick={() => { handleDelete(obj._id, obj.title); }} className="btn btn-sm btn-danger mx-3">delete</div></a>

        </div>

        return <div className="col" key={obj._id} >
            <div className="card text-center mb-5 ">
                <img src={obj.photo} className="bd-placeholder-img card_img_margin mt-3 " width="200" height="200" />
                <div className="card-body">
                    <Link to={`/resource/${obj._id}`} className="card-text text-dark text-sm">
                        {obj.title}</Link>
                </div>
                <div className="text-danger">{obj.rating} Likes</div>
                <hr />
                <a className=" mb-2"><Link to={`/admin/resource/${obj._id}`} className="btn btn-primary btn-sm mx-3">update</Link><div onClick={() => { handleDelete(obj._id, obj.title); }} className="btn btn-sm btn-danger mx-3">delete</div></a>

            </div>
        </div>
    })

    return (<>
        <div className="row row-cols-1  row-cols-md-3 m-2 mt-4">
            {addCard}
            {list}
        </div>

    </>);
}
export default Resources;