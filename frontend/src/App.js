import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import './App.css';

function App() {
  return (
    <div>
      <div className="Sidebar">
      <Sidebar />
    </div>
    <div className="Upperbar">
    <Navbar /> 
    </div>
    
    <div className="mainarea">  
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
          
        </Routes>
      
    </Router> 
    </div>
    </div>
  );
}

export default App;
