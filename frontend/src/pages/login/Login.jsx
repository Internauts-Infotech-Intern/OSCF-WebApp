// import axios from "axios";
// import {  useRef } from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Login() {
//     const userRef = useRef();
//     const passwordRef = useRef();
  
//     const [error, setError] = useState(false);
//     const handleSubmit = async (e) => {
//       e.preventDefault();
      
//       try {
//         const res = await axios.post("/auth/login", {
//           email: userRef.current.value,
//           password: passwordRef.current.value,
//         });
//         window.location.replace("/");
//       } catch (err) {
//         setError(true);
//       }
//     };
  
//     return (
//       <div>
//         <div>
//           <div>
//             <span><center>Login</center></span>
//             <form onSubmit={handleSubmit}>
//               <label>Email</label>
//               <input
//                 type="text"
//                 placeholder="Enter your email..."
//                 ref={userRef}
//               />
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter your password..."
//                 ref={passwordRef}
//               />
//               <button type="submit" >
//                 Login
//               </button>
              
//             </form>
//             <div>If you don't have an account?</div>
//             <button>
//               <Link to="/signup">
//                 Signup
//               </Link>
//             </button>
//             {error && <span style={{color:"red", marginTop:"10px"}}>Email or Password is wrong</span>}
//           </div>
//         </div>
  
//       </div>
//     );
//   }
  
import React, { Component, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import UserContext from '../../context/createcontext';
function Login() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);

	};

	const { user, setUser } = useContext(UserContext);

	const userRef = useRef();
	const passwordRef = useRef();
	const navigate=useNavigate();
	const [error, setError] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log("Login");
			console.log(userRef.current.value);
			console.log(passwordRef.current.value);
			axios.post("http://localhost:8080/api/auth/login", {
				email: userRef.current.value,
				password: passwordRef.current.value,
			}).then((res)=>{
				console.log(res);
				
				if(res.data.status=="1"){
					setUser(res.data.user);
					alert("Login Successful");

					navigate("/");
					
				}
			});
			
		} catch (err) {
			setError(true);
		}
	};
	return (
		<div>
			<h1>Log in Form</h1>
			<div>
				<div>
					<img src="./images/login.jpg" alt="login" />
				</div>
				<div>
					<h2>Members Log in</h2>
					{/* <input type="text" className={styles.input} placeholder="Email" />
					<input type="text" className={styles.input} placeholder="Password" />
					<button className={styles.btn}>Log In</button> */}
					<form onSubmit={handleSubmit}>
						<label>Email</label>
						<input
							type="email"
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
					<p>or</p>
					<button onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing in with Google</span>
					</button>
					<p>
						New Here ? <Link to="/signup">Sing Up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
