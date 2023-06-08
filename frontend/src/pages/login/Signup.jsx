import React, { Component, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import AuthService from '../../services/auth.service';


//google apis
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";


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
	const [massege, setMassege] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setMassege(null);
		}, 3000);
	}, [massege]);


	const responseMessage = (response) => {
		console.log("Login Success responce : ", response);
		const token1 = response.credential.accessToken;
		const refresh_token1 = response.credential.refreshToken;
		console.log("Login Success token1 : ", token1);
		console.log("Login Success r_token1 : ", refresh_token1);
		var token = response.credential;
		const decode = jwt_decode(token);
		console.log("Login Success : ", decode);
		console.log("Login Success : ", decode.name);
		console.log("Login Success : ", decode.email);
		console.log("Login Success : ", decode.email_verified);
		console.log("Login Success : ", decode.picture);

		handleGoogleSignInCallback(1, decode);
		/*aud: "754777254417-e177q2glmotv28lllmm7chn9p6krevpi.apps.googleusercontent.com";
		azp: "754777254417-e177q2glmotv28lllmm7chn9p6krevpi.apps.googleusercontent.com";
		email: "aarjupatel922003@gmail.com";
		email_verified: true;
		exp: 1681824150;
		family_name: "Patel";
		given_name: "Aarju";
		iat: 1681820550;
		iss: "https://accounts.google.com";
		jti: "5664e4469b85b6c6ecc695f5c6f86962e4e07d3b";
		name: "Aarju Patel";
		nbf: 1681820250;
		picture: "https://lh3.googleusercontent.com/a/AGNmyxZFTDO68K2LSEqoVbmjm8-AlE4FcRycI-YxXBNP=s96-c";
		sub: "107986972506806710128";*/
	};
	const errorMessage = (error) => {
		console.log("Login failed : ", error);
	};

	const handleGoogleSignInCallback = (flag, credential) => {
		var data;
		if (flag == 1) {
			if (!credential.email_verified) {
				setMassege(
					"Your Email adress is not varified by google plese varify first to open account"
				);
				setLoading(false);
				return;
			}

			credential["phone"] = null;
			credential["password"] = null;
			credential["cpassword"] = null;
			credential["username"] = credential.name;
			credential["flag"] = 1;
			data = credential;
		} else if (flag == 0) {
			if (password != cpassword) {
				setMassege("Password and confirm password are not same");
				return;
			}
			data = {
				username: username,
				email: email,
				password: password,
				cpassword: cpassword,
				phone: phone,
				picture: "#",
				flag: 0
			}
		}
		AuthService.signInService(data)
			.then((userDetails) => {
				window.alert("SignUp succesfull");
			})
			.catch((error) => {
				var resMessage;
				console.log("in erro login component after login localstorage is ");
				if (error.status == 0) {
					resMessage =
						"this email is not register with massege, kindly signup first";
				} else if (error.status == 2) {
					resMessage = "wrong password";
				} else if (error.status == 5) {
					resMessage = "Internal server error";
				} else {
					resMessage = "unhandled status arrive";
				}
				setLoading(false);
				setMassege(resMessage);
			});
	}

	const handleSignIn = () => {
		handleGoogleSignInCallback(0, {});
	};
	return (
		<div>
			<div className="container MyLoginStyle">
				<div className='FormTag shadow mt-5'>
					<div className="card card-container pt-5 pr-5 pl-5 ">
						<form >
							<div className="form-group">
								<label htmlFor="username">username</label>
								<input
									type="text"
									className="form-control"
									name="username"
									value={username}
									onChange={(e) => { setUsername(e.target.value); }}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									className="form-control"
									name="email"
									value={email}
									onChange={(e) => { setEmail(e.target.value); }}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="number">Number</label>
								<input
									type="tel"
									className="form-control"
									name="number"
									value={phone}
									onChange={(e) => { setPhone(e.target.value); }}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									className="form-control"
									name="password"
									value={password}
									onChange={(e) => { setPassword(e.target.value); }}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="cpassword">Password</label>
								<input
									type="password"
									className="form-control"
									name="cpassword"
									value={cpassword}
									onChange={(e) => { setCpassword(e.target.value); }}
								/>
							</div>

							<div className="form-group ">
								<button
									type='button'
									className="btn btn-primary  btn-block"
									disabled={loading}
									onClick={() => {
										handleSignIn();
									}}
								>
									Sign In
								</button>
							</div>

							{massege && (
								<div className="form-group">
									<div className="alert alert-danger" role="alert">
										{massege}
									</div>
								</div>
							)}
							<div className='form-group text-center' htmlFor="loginWithGoogle">Or</div>
							<div className='form-group text-center ml-auto' name="loginWithGoogle">

								<GoogleLogin
									className="ml-auto text-center"
									onSuccess={responseMessage}
									onError={errorMessage}
									responseType="code"
									scope="openid profile email"
									buttonText="Sign in with Google"
									cookiePolicy={"single_host_origin"}
									uxMode={"popup"} />
							</div>
							<div className="form-group text-center mt-4">
								Already Have Account ? <Link to="/login">Log In</Link>
							</div>

						</form>
					</div>
				</div>


			</div>
			<div>

				<div>
					{/* <h2 >Create Account</h2>
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
					<p>or</p> */}
					{/* <button onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sing up with Google</span>
					</button>
					<p>
						Already Have Account ? <Link to="/login">Log In</Link>
					</p> */}
				</div>
			</div>
		</div>
	);
}

export default Signup;
