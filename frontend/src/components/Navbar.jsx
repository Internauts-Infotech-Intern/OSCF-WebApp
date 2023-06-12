import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import UserContext from "../context/createcontext";
import authService from "../services/auth.service";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { isSidebarOpen, setIsSidebarOpen, searchBarInput, setSearchBarInput } = useContext(UserContext);

  const logoutHandle = () => {
    authService.logout();
    setUser(null);
  };
  return (
    <nav className=" MyNavbar navbar navbar-expand-lg">
      {!isSidebarOpen ? (
        <Link to={"/"} className="navbar-brand text-white ">
          <h3 className="p-0">OSCF</h3>
        </Link>
      ) : (
        <></>
      )}
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <div className="form-inline ml-auto  ">
          <div className="bg-white rounded shadow">
            <div className=" bg-light rounded rounded-pill shadow-sm ">
              <div className="input-group">
                <input
                  type="search"
                  placeholder="search"
                  aria-describedby="button-addon1"
                  className="form-control border-0 "
                  size={30}
                  value={searchBarInput}
                  onChange={(e) => { setSearchBarInput(e.target.value); }}
                />
                <div className="input-group-append">
                  <button
                    id="button-addon1"
                    type="submit"
                    className="btn btn-link text-primary"
                  >
                    <SearchIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
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
