import React, { useState } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ArticleIcon from "@mui/icons-material/Article";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SupportIcon from "@mui/icons-material/Support";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
        <ul className="nav nav-pills flex-column mb-auto">
          <Link className="navItem nav-item py-3 text-white" to="#">
            <HomeIcon />
            <span className="fs-4 ml-3">Resources</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to="/contribution">
            <CallToActionIcon />
            <span className="fs-4 ml-3">Contribution</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to="#">
            <SupportIcon />
            <span className="fs-4 ml-3">Support</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to="#">
            <LibraryBooksIcon />
            <span className="fs-4 ml-3">Blogs</span>
          </Link>
          <Link className="navItem nav-item py-3 text-white" to="#">
            <SupervisorAccountIcon />
            <span className="fs-4 ml-3">Projects</span>
          </Link>
        </ul>
        <hr />
      </div>
    </aside>
  );
};

export default Sidebar;
