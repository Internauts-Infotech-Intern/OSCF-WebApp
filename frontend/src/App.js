import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext,useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import UserContext from "./context/createcontext"

import Contribution from "./contribution/Contribution";
import Write from "./pages/Write/Write";
import Single from "./pages/Single/Single";
import Blog from "./pages/Blog/blog";
function App() {
  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

  return (
    <UserContext.Provider value={{user,setUser}}>
    <div className="app">
      <div className="navbarDiv">
        <Navbar />
      </div>
      <div className="content">
        <Sidebar />
        <div className="main-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contribution" element={<Contribution />} />
            <Route path="/write" element={<Write />} />
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
