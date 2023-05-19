import axios from "axios";
import {  useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
  
    const [error, setError] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const res = await axios.post("/auth/login", {
          email: userRef.current.value,
          password: passwordRef.current.value,
        });
        window.location.replace("/");
      } catch (err) {
        setError(true);
      }
    };
  
    return (
      <div>
        <div>
          <div>
            <span><center>Login</center></span>
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email..."
                ref={userRef}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password..."
                ref={passwordRef}
              />
              <button type="submit" >
                Login
              </button>
              
            </form>
            <div>If you don't have an account?</div>
            <button>
              <Link to="/signup">
                Signup
              </Link>
            </button>
            {error && <span style={{color:"red", marginTop:"10px"}}>Email or Password is wrong</span>}
          </div>
        </div>
  
      </div>
    );
  }
  