import React, { useState } from "react";
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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [navItemClassName, setNavItemClassName] = useState("fs-4 ml-3 open");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setNavItemClassName("fs-4 ml-3 sidebarcollapsed");
    } else {
      console.log("enter in else cond.");
      setNavItemClassName("fs-4 ml-3 ");
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
        <ul className="nav MyNav nav-pills flex-column mb-auto">
          <Link
            className="navItem nav-item py-3 text-white"
            onClick={toggleSidebar}
          >
            <DehazeIcon />
            <span className={navItemClassName}>OSCF</span>
          </Link>
          <Link className="navItem  nav-item py-3 text-white" to="/resorces">
            <HomeIcon />
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
          <Link className="navItem nav-item py-3 text-white" to="/blogs">
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
          <Link
            className="navItem nav-item py-3 text-white"
            to="https://buy.stripe.com/test_4gwcP43kh9Qdgnu8ww"
          >
            <CurrencyRupeeIcon />
            <span className={navItemClassName}>Donate Us</span>
          </Link>
        </ul>
        <hr />
      </div>
    </aside>
  );
};

export default Sidebar;
