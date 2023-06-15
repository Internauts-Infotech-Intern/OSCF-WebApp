import React, { useContext, useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArticleIcon from "@mui/icons-material/Article";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SupportIcon from "@mui/icons-material/Support";
import ViewSidebarIcon from "@mui/icons-material/ViewSidebar";
import DehazeIcon from "@mui/icons-material/Dehaze";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SourceIcon from "@mui/icons-material/Source";
import EmailIcon from '@mui/icons-material/Email';

import UserContext from "../context/createcontext";

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen, admin } = useContext(UserContext);
  const [navItemClassName, setNavItemClassName] = useState("fs-4 ml-3 open");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setNavItemClassName("fs-4 ml-3");
    } else {
      console.log("enter in else cond.");
      setNavItemClassName("fs-4 ml-3 sidebarcollapsed");
    }
  };

  return (
    <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="m-0 d-flex flex-column flex-shrink-0 px-3 text-bg-dark ">
        <ul className="nav MyNav nav-pills flex-column mb-auto ">
          <Link
            className="navItem nav-item py-3 text-white vcenter-item"
            onClick={toggleSidebar}
          >
            <DehazeIcon />
            <span className={navItemClassName}>
              <h2>OSCF</h2>
            </span>
          </Link>
          <Link className="navItem  nav-item py-3 text-white" to="/">
            <HomeIcon />
            <span className={navItemClassName}>Home</span>
          </Link>

          <Link
            className="navItem  nav-item py-3 text-white"
            to={admin ? "/admin/resources" : "/resorces"}
          >
            <SourceIcon />
            <span className={navItemClassName}>Resources</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to="/contribution">
            <CallToActionIcon />
            <span className={navItemClassName}>Contribution</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to="/support">
            <SupportIcon />
            <span className={navItemClassName}>Support</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to={admin ? "/admin/blogs" : "/blogs"}>
            <LibraryBooksIcon />
            <span className={navItemClassName}>Blogs</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to="/projects">
            <AccountTreeIcon />
            <span className={navItemClassName}>Projects</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to="/events">
            <EventAvailableIcon />
            <span className={navItemClassName}>Events</span>
          </Link>



          {admin ? <Link
            className="navItem nav-item py-3 text-white"
            to="/admin/usermasseges"
          >
            <EmailIcon />
            <span className={navItemClassName}>user masseges</span>
          </Link>:<>
          <Link
            className="navItem nav-item py-3 text-white"
            to="https://buy.stripe.com/test_4gwcP43kh9Qdgnu8ww"
          >
            <CurrencyRupeeIcon />
            <span className={navItemClassName}>Donate Us</span>
            </Link></>
          }
        </ul>
        <hr />
      </div>
    </aside>
  );
};

export default Sidebar;
