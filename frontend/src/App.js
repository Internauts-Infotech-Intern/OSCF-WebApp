import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Contribution from "./contribution/Contribution";
function App() {
  return (
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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
