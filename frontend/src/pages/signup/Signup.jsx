import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Signup() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      try {
        const res = await axios.post("/auth/signup", {
          email,
          password,
        });
        res.data && window.location.replace("/login");
      } catch (err) {
        setError(true);
      }
    };
    return (
      <div>
        <div>
        <span><center>Sign up</center></span>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            
            placeholder="Enter your email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            Signup
          </button>
        </form>
        <div>If you have already account ? </div>
        <button>
          <Link to="/login">
            Login
          </Link>
        </button>
        {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
        </div>
      </div>
    );
  }
  