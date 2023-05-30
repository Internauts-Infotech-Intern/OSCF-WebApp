// import axios from "axios";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// export default function Signup() {
    
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(false);
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setError(false);
//       try {
//         const res = await axios.post("/auth/signup", {
//           email,
//           password,
//         });
//         res.data && window.location.replace("/login");
//       } catch (err) {
//         setError(true);
//       }
//     };
//     return (
//       <div>
//         <div>
//         <span><center>Sign up</center></span>
//         <form onSubmit={handleSubmit}>
//           <label>Email</label>
//           <input
//             type="text"
            
//             placeholder="Enter your email..."
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password..."
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">
//             Signup
//           </button>
//         </form>
//         <div>If you have already account ? </div>
//         <button>
//           <Link to="/login">
//             Login
//           </Link>
//         </button>
//         {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
//         </div>
//       </div>
//     );
//   }
  
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';
import { useState } from "react";
function Signup() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);
	};
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cpassword, setCpassword] = useState("");
	const [phone, setPhone] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);
		try {
			if(password!=cpassword)
			{
				alert("Password and confirm password are not same");

			}
			else{
			const res = await axios.post("http://localhost:8080/api/auth/signup", {
				username,
				email,
				password,
				cpassword,
				phone,
			});
			res.data && window.location.replace("/login");
		}
		} catch (err) {
			setError(true);
		}
	};
	return (
		<div>
			<h1>Sign up Form</h1>
			<div>
				<div>
					{/* <img src="./images/signup.jpg" alt="signup" /> */}
				</div>
				<div>
					<h2 >Create Account</h2>
					{/* <input type="text" className={styles.input} placeholder="Username" />
					<input type="text" className={styles.input} placeholder="Email" />
					<input
						type="password"
						className={styles.input}
						placeholder="Password"
					/>
					<button className={styles.btn}>Sign Up</button> */}
					<form onSubmit={handleSubmit}>
						<label>Username</label>
						<input
							type="text"

							placeholder="Enter your email..."
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label>Email</label>
						<input
							type="email"

							placeholder="Enter your email..."
							onChange={(e) => setEmail(e.target.value)}
						/>
						<label>Password</label>
						<input
							type="password"
							placeholder="Enter your password..."
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label>Confirm Password</label>
						<input
							type="password"
							placeholder="Enter your password..."
							onChange={(e) => setCpassword(e.target.value)}
						/>
						<label>Phone</label>
						<input
							type="number"
							placeholder="Enter your password..."
							onChange={(e) => setPhone(e.target.value)}
						/>
						<button type="submit">
							Signup
						</button>
					</form>
					<p>or</p>
					<button onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing up with Google</span>
					</button>
					<p>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Signup;
