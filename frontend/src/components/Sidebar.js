import React, { useState } from "react";
import "./sidebar.css"; 


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Your sidebar content goes here */}
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? "<" : ">"}
      </button>
      <div id="l_nav">
        <ul>
          <li>
            <a href="/#">Resourse</a>
          </li>
          <li>
            <a href="/#">Support</a>
          </li>
          <li>
            <a href="/#">Blog</a>
          </li>
          <li>
            <a href="/#">Project</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
