import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/login/Profile";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import UserContext from "./context/createcontext";

import Contribution from "./contribution/Contribution";
import authService from "./services/auth.service";
import Resources from "./pages/home/Resources";
import Blog from "./pages/blogs/Blogs";
import Write from "./pages/blogs/Write";
import Single from "./pages/blogs/Single";
import Support from "./pages/support/Support";
import Overview from "./pages/home/Overview";

// import dotenv from "dotenv";
// dotenv.config();

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    console.log("is user useeffect ", user);
    if (user != null && user.admin != null) {
      if (user.admin) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else {
      setAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    const localUser = authService.getCurrentUser();
    setUser(localUser);
  }, []);

  useEffect(() => {
    const localUser = authService.getCurrentUser();
    setUser(localUser);
  }, []);

  return (
<<<<<<< HEAD
    <UserContext.Provider value={{ user, setUser, admin }}>
      <div className="app">
        <div className="navbarDiv">
          <Navbar />
        </div>
        <div className="content">
          <Sidebar />
          <div className="main-area">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={user ? <Profile /> : <Login />} />
              <Route path="/userforum" element={user ? <></> : <Login />} />
              <Route path="/contribution" element={<Contribution />} />
              <Route path="/resorces" element={<Resources />} />
              <Route path="/blogs" element={<Blog />} />
              <Route path="/support" element={<Support />} />
              <Route path="/events" element={<></>} />
              <Route path="/write" element={admin ? <Write /> : <></>} />
              <Route path="/blog/:blogId" element={<Single />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
