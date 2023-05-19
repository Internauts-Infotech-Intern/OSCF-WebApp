import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
          
        </Routes>
      
    </Router>
  );
}

export default App;
