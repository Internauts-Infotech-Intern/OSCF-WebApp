import React, { useState } from "react";
import like from "../../images/like.png";
import Apache from "../../images/Apache.png";
import cncf from "../../images/cncf.png";

import "./support.css";
import { Link } from "react-router-dom";

function Support() {
  const [data, setData] = useState([
    {
      _id:0,
      image: Apache,
      title: "Apache Foundation",
      info: "The mission of the Apache Software Foundation (ASF) is to provide software for the public good. This includes providing services and support for over 200 software project communities who choose to join the ASF. Established in 1999, the ASF is a US 501(c)(3) charitable organization, funded by individual donations and corporate sponsors. Our all-volunteer board oversees more than 350 leading Open Source projects, including Apache HTTP Server -- the world's most popular Web server software. The ASF provides an established framework for intellectual property and financial contributions that limits potential legal exposure for our project committers. Through the ASF's meritocratic process known as The Apache Way, more than 740 individual Members and 8880 Committers successfully collaborate to develop freely available enterprise-grade software that benefits millions of users worldwide: projects distribute thousands of software solutions under the Apache License.",
      project1:
        "FLINK - platform for scalable batch and stream data processing",
      project2: "BVAL - JSR-303 Bean Validation Implementation and Extensions",
      project3:
        "SEATUNNEL - SeaTunnel is a very easy-to-use ultra-high-performance distributed data integration platform that supports real-time synchronization of massive data.",
      link: "https://www.apache.org/",
      community: "https://community.apache.org/",
      github: "https://github.com/search?q=apache&type=repositories",
    }
  ]);

  return (
    <div className="container MySupport mt-3">
      {
        data.map((element) => {
          return (
            <div className="mycard" key={element._id}>
              <div className="card-img mt-5">
                <img src={element.image} width="160px" />
              </div>
              <div className="card-info">
                <h5>{element.title}</h5>
                <p>{element.info}</p>
                <h6>Projects</h6>
                <p>{element.project1}</p>
                <p>{element.project2}</p>
                <p>{element.project3}</p>
                <br></br>
                <br></br>
                <h6>Important Links</h6>
                <p><Link to={element.community}>Community link </Link> </p>
                <p><Link to={element.github}>Github link </Link></p>
                <a href={element.link}>
                  <button className="sitebutton">Visit site</button>
                </a>

                <br />
                <br />
                <img src={like} width="40px" className="like" />
              </div>
            </div>)
        })
      }

    </div>
  );
};

export default Support;