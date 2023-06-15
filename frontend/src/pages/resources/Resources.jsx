import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../context/createcontext";


const Resources = () => {

    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [rating, setRating] = useState("");
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

    const fetchResource = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+"/resources/resources");
            console.log(res.data);
            setResources(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchResource();
    }, []);

    

    let list = filteredResources.map((obj) => {
        return <div className="col" key={obj._id} >
            <div className="card  text-center mb-5 ">
                <img src={obj.photo} className="bd-placeholder-img card_img_margin mt-3 " width="200" height="200" />
                <div className="card-body">
                    <Link to={`/resource/${obj._id}`} className="card-text text-dark text-sm">
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

    return (<>
        <div className="row row-cols-1  row-cols-md-3 m-2 mt-4">
            {list}
        </div>
     
    </>);
}
export default Resources;

