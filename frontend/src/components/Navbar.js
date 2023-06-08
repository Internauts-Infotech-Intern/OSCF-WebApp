import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import UserContext from "../context/createcontext";
import authService from "../services/auth.service";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const logoutHandle = () => {
    authService.logout();
    setUser(null);
    
  };
  return (
    <nav className=" MyNavbar navbar navbar-expand-lg">
      <div className="navbar-brand ml-lg-5">
        <Link to={"/"} className="navbar-brand p-0">
          <h4 className="p-0">OSCF</h4>
        </Link>
      </div>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <div className="form-inline ml-auto ">
          <input
            className="form-control mr-sm-2 "
            type="search"
            placeholder="Search"
            aria-label="Search"
            size={30}
          />
          <button className="btn btn-primary my-2 my-sm-0 btn-sm" type="button">
            Search
          </button>
        </div>
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item mx-2">
            <Link to={"#"} className="nav-link">
              Contact Us
            </Link>
          </li>

          <li className="nav-item mx-2">
            {user ? (
              <div className="navbar-nav ml-auto">
                <div className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {user.username}
                  </Link>
                </div>
                <div className="nav-item ">
                  <Link to={"#"} className="nav-link" onClick={logoutHandle}>
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
