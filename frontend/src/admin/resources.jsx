import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import photo123 from "../images/open.jpg";

const Resources = () => {

    const [resources, setResources] = useState([]);
    const [addContent, setAdContent] = useState([{
        _id: "new",
        photo: "",
    }]);

    const [rating, setRating] = useState("");

    const fetchResource = () => {
        axios.get("http://localhost:8080/resources/resources", {}).then((res) => {
            console.log(res.data);
            setResources(res.data);
        }).catch((err) => {
            console.log("err : ", err);
        });
    }
    useEffect(() => {
        fetchResource();
    }, []);


    function handleDelete(_id) {
        try {
            axios.post(`http://localhost:8080/resources/delete`, {
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
    let list = resources.map((obj) => {
        return <div className="col" key={obj._id} >
            <div className="card text-center mb-5 ">
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
                <hr />
                <a className=" mb-2"><Link to={`/admin/resource/${obj._id}`} class="btn btn-primary btn-sm mx-3">update</Link><div onClick={() => { handleDelete(obj._id); }} class="btn btn-sm btn-danger mx-3">delete</div></a>

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