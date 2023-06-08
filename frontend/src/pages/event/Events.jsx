import React, { useEffect, useState } from "react";
import url1 from "../../images/dps.jpg";
import url2 from "../../images/open.jpg";

function Event() {
    const [info, setInfo] = useState([
        {
            id: 1,
            url: url1,
        },
        {
            id: 2,
            url: url2,
        },
    ]);

    useEffect(() => {
        console.log("envet file open");
    }, []);

    const cards = info.map((items) => {
        return (
            <div className="container1" key={items.id}>
                <div className="imgs">
                    <img src={items.url} height="200px" />
                </div>
            </div>
        );
    });
    return (<div className="cards-list">{cards}</div>);
}


export default Event;