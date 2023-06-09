import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import UserContext from "../../context/createcontext";
import "./Blog.css";
export default function Blog() {
    const [blog, setBlog] = useState([]);
    const { user, setUser, admin } = useContext(UserContext);
    const [photo, setPhoto] = useState("");
    const [rating, setRating] = useState("");

    const fetchBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:8080/blogs/blog");
            console.log(res.data);
            setBlog(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);


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


    let list = blog.map((obj) => {
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

            <div className="row row-cols-1  row-cols-md-3 mt-0">
                {list}
            </div>

            {admin ? <Link to={"/write"}><button>write</button></Link>
                : <></>}
        </div>
    );
}