import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import UserContext from "../../context/createcontext";
import "./Blog.css";
export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
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
            const res = await axios.get(process.env.REACT_APP_API_URL+"/blogs/blogs");
            console.log(res.data);
            setBlogs(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);


    useEffect(() => {
        filterBlogs();
    }, [searchBarInput, blogs]);


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
            </div>
        </div>
    })

    return (
        <div>

            <div className="row row-cols-1  row-cols-md-3 m-2 mt-4">
                {list}
            </div>
            {list.length == 0 ? <div className="container text-center h2">there is no blogs data</div> : <></>}
        </div>
    );
}