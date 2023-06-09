import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const Resources = () => {

    const [resources, setResources] = useState([]);
    const [addContent, setAdContent] = useState([{
        _id: "new",
        photo: "",
    }]);

    const [rating, setRating] = useState("");

    const fetchResource = () => {
        axios.get("http://localhost:8080/resources/resource", {}).then((res) => {
            console.log(res.data);
            setResources(res.data);
        }).catch((err) => {
            console.log("err : ", err);
        });
    }
    useEffect(() => {
        fetchResource();
    }, []);



    let addCard = addContent.map((obj) => {
        return <Link to={`/admin/resources/${"new"}`} className="col m-5 " key="new" >
            <div className="card  text-center mb-5 ">
                <AddIcon className="bd-placeholder-img card_img_margin mt-3 " width="200" height="200" />
                <div className="card-body">
                    <div className="x   card-text text-dark text-sm">
                        add</div>
                </div>
            </div>
        </Link>
    });
    let list = resources.map((obj) => {
        return <div className="col  " key={obj._id} >
            <div className="card text-center mb-5 ">
                <img src={obj.photo} className="bd-placeholder-img card_img_margin mt-3 " width="200" height="200" />
                <div className="card-body">
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
            </div>
        </div>
    })

    return (<>
        <div className="row row-cols-1  row-cols-md-3 mt-0">
            {addCard}
            {list}
        </div>

    </>);
}
export default Resources;