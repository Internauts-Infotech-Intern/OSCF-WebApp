import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import UserContext from "../context/createcontext";
import "../pages/blogs/Blog.css";

import AddIcon from "@mui/icons-material/Add"

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);


    const [addContent, setAdContent] = useState([{
        _id: "new",
        photo: "",
    }]);
    const { user, setUser, admin } = useContext(UserContext);
    const [photo, setPhoto] = useState("");
    const [rating, setRating] = useState("");
    const { searchBarInput, setSearchBarInput } = useContext(UserContext);

    function filterBlogs() {
        if (searchBarInput) {
            const filtered = blogs.filter((blog) =>
                blog.keywords.some((keyword) =>
                    keyword.toLowerCase().includes(searchBarInput.toLowerCase())
                )
            );
            setFilteredBlogs(filtered);
        } else {
            setFilteredBlogs(blogs);
        }
    }
    const fetchBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:8080/blogs/blogs");
            console.log(res.data);
            setBlogs(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function handleDelete(_id) {
        try {
            axios.post(`http://localhost:8080/blogs/delete`, {
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
    };
    function removeBlogsFomList(_id) {
        setBlogs(blogs.filter((obj) => obj._id !== _id));
    }

    useEffect(() => {
        fetchBlogs();
    }, []);


    useEffect(() => {
        filterBlogs();
    }, [searchBarInput, blogs]);


    let addCard = addContent.map((obj) => {
        return <Link to={`/admin/blogs/${"new"}`} className="col mt-5" key="new" >
            <div className="card  text-center mb-5 ">
                <AddIcon className="bd-placeholder-img card_img_margin mt-3 " width="200" height="200" />
                <div className="card-body">
                    <div className="x   card-text text-dark text-sm">
                        add</div>
                </div>
            </div>
        </Link>
    });

    let list = filteredBlogs.map((obj) => {
        return <div className="col" key={obj._id} >
            <div className="card  text-center mb-5 ">
                <img src={obj.photo} className="bd-placeholder-img card_img_margin mt-3 " width="200" height="200" />
                <div className="card-body">
                    <Link to={`/blog/${obj._id}`} className="card-text text-dark text-sm">
                        {obj.title}</Link>
                </div>
                {rating !== null ? (
                    <>
                        <div className="text-danger">{obj.rating} Likes</div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
                <hr />
                <a className=" mb-2"><Link to={`/admin/blogs/${obj._id}`} class="btn btn-primary btn-sm mx-3">update</Link><div onClick={() => { handleDelete(obj._id); }} class="btn btn-sm btn-danger mx-3">delete</div></a>
            </div>
        </div>
    })
    return (
        <div>
            <div className="row row-cols-1  row-cols-md-3 m-2 mt-3">
                {addCard}
                {list}
            </div>
        </div>
    );
}