import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../context/createcontext";
import "../pages/blogs/Blog.css";


export default function ContacctUS() {
    const [Contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);


    const [addContent, setAdContent] = useState([{
        _id: "new",
        photo: "",
    }]);
    const { user, setUser, admin } = useContext(UserContext);
    const [photo, setPhoto] = useState("");
    const [rating, setRating] = useState("");
    const { searchBarInput, setSearchBarInput } = useContext(UserContext);

    function filterContacts() {
        if (searchBarInput) {
            const filtered = Contacts.filter((blog) =>
                blog.keywords.some((keyword) =>
                    keyword.toLowerCase().includes(searchBarInput.toLowerCase())
                )
            );
            setFilteredContacts(filtered);
        } else {
            setFilteredContacts(Contacts);
        }
    }
    const fetchContacts = async () => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL+"/contactus/allmasseges");
            console.log(res.data);
            setContacts(res.data);
            console.log("masseges : ", res.data);
        } catch (error) {
            console.log(error);
        }
    };

    function handleDelete(_id) {
        try {
            axios.post(process.env.REACT_APP_API_URL+`/contactus/delete`, { _id }).then((res) => {
                    if (res.data.status == 1) {
                        alert("Contacts deleted");
                        removeContactsFomList(_id);
                    } else if (res.data.status == 2) {
                        alert("Contacts not deleted");
                    } else if (res.data.status == 3) {
                        alert("internal server error");
                    } else {
                        alert("un handled status arrive");
                    }
                });
        } catch (err) { console.log(err); }
    };
    function removeContactsFomList(_id) {
        setContacts(Contacts.filter((obj) => obj._id !== _id));
    }

    useEffect(() => {
        fetchContacts();
    }, []);


    useEffect(() => {
        filterContacts();
    }, [searchBarInput, Contacts]);


    let list = filteredContacts.map((obj) => {
        const masseges = obj.masseges;
        return <tr key={obj.email} className="">
            <td className="" scope="row">1</td>
            <td className=""> {obj.email}</td>
            <td className="" >{obj.name}</td>
            <td className="mw-25">
                {obj.masseges.map((data) => {
                    return <div className="card p-2" key={data.massege}>
                        <textarea rows="1" value={`subject : ${data.subject}`}>
                        </textarea>
                        <textarea className="massege " rows="2" type="text" value={`massege :  ${data.massege}`} readOnly ></textarea>
                        <div>time : {data.time}
                        </div>
                    </div>
                })}
            </td>
            <td className="">
                <div className="mb-2">
                    {/* <Link to={`#`} className="btn btn-primary btn-sm mx-3">send mail</Link> */}
                    <div onClick={() => { handleDelete(obj._id); }} className="btn btn-sm btn-danger mx-3">delete</div></div>
            </td>
        </tr>
    })
    return (
        <div className="contactus">
            <div className="table-responsive text-nowrap">

                <table className="table ml-auto mr-auto table-hover table-fixed">
                    <thead>
                        <tr>
                            <th scope="col" className="">index</th>
                            <th className="">email</th>
                            <th className="">name</th>
                            <th className="th-lg">masseges</th>
                            <th className="">oparation</th>
                        </tr>
                    </thead>
                    <tbody>

                        {list}
                    </tbody>
                </table></div>
        </div>
    );
}