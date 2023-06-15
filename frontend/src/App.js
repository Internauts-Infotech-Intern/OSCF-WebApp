import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/login/Profile";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./context/createcontext";
import Contribution from "./pages/contribution/Contribution";
import authService from "./services/auth.service";

import Blog from "./pages/blogs/Blogs";
import SpecificBlog from "./pages/blogs/SpecificBlog";
import Resources from "./pages/resources/Resources";
import SpecificResource from "./pages/resources/SpecificResource";
import Event from "./pages/event/Events";
import Support from "./pages/support/Support";
import Overview from "./pages/home/Overview";
import ContactUs from "./pages/home/ContactUs";

import AdminResources from "./admin/resources";
import AdminResourcesEdit from "./admin/ResourcesEdit";
import AdminBLogs from "./admin/blogs";
import AdminBLogsEdit from "./admin/BlogsEdit";
import ContacctUS from "./admin/contactUs";

// import dotenv from "dotenv";
// dotenv.config();

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchBarInput, setSearchBarInput] = useState("");

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
    // console.log(".env : ", process.env.REACT_APP_API_URL);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        admin,
        isSidebarOpen,
        setIsSidebarOpen,
        searchBarInput,
        setSearchBarInput,
      }}
    >
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="main-area">
          <Routes>
            <Route path="/admin/resources" element={<AdminResources />} />
            <Route
              path="/admin/resource/:id"
              element={<AdminResourcesEdit />}
            />

            <Route path="/admin/blogs" element={<AdminBLogs />} />
            <Route path="/admin/blogs/:blogId" element={<AdminBLogsEdit />} />

            <Route path="/" element={<Overview />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={user ? <Profile /> : <Login />} />

            <Route path="/contribution" element={<Contribution />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="/contactus"
              element={user ? <ContactUs /> : <Login/>}
            />

            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog/:blogId" element={<SpecificBlog />} />
            <Route path="/resorces" element={<Resources />} />
            <Route
              path="/resource/:resourceId"
              element={<SpecificResource />}
            />

            <Route path="/events" element={<Event />} />
            <Route
              path="/admin/usermasseges"
              element={admin ? <ContacctUS /> : <Login />}
            />

            <Route path="/userforum" element={<Event />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
