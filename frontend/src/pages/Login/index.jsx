import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {  useRef } from "react";
function Login() {
	const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/auth/google/callback`,
			"_self"
		);

	};
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
			<h1>Log in Form</h1>
			<div>
				<div>
					<imga src="./images/login.jpg" alt="login" />
				</div>
				<div>
					<h2>Members Log in</h2>
					{/* <input type="text" className={styles.input} placeholder="Email" />
					<input type="text" className={styles.input} placeholder="Password" />
					<button className={styles.btn}>Log In</button> */}
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
