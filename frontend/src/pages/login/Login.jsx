import React, { Component, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useRef } from "react";
import UserContext from '../../context/createcontext';
import AuthService from '../../services/auth.service';
//google apis
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Login() {


	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [massege, setMassege] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const { user, setUser } = useContext(UserContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (massege != null && massege != "") {
			setTimeout(() => {
				setMassege("");
			}, 4000);
		}
	}, [massege]);

	const responseMessage = (response) => {
		// console.log("Login Success responce : ", response);
		const token1 = response.credential.accessToken;
		const refresh_token1 = response.credential.refreshToken;
		// console.log("Login Success token1 : ", token1);
		// console.log("Login Success r_token1 : ", refresh_token1);

		setUser(response);

		var token = response.credential;
		const decode = jwt_decode(token);
		console.log("Login Success : ", decode);
		// console.log("Login Success : ", decode.name);
		// console.log("Login Success : ", decode.email);
		// console.log("Login Success : ", decode.email_verified);
		// console.log("Login Success : ", decode.picture);

		setUser(decode);
		handleGoogleLoginCallback(1, decode);
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

	const handleGoogleLoginCallback = (flag, credential) => {
		setLoading(true);

		var data;
		if (flag == 1) {
			if (!credential.email_verified) {
				setMassege(
					"Your Email adress is not varified by google plese varify first to open account"
				);
				setLoading(false);
				return;
			}
			data = credential;
			data["flag"] = 1;
		} else {
			data = {
				flag: 0,
				email: email,
				password: password
			}
		}
		console.log("login.js data sent is : ",data)
		AuthService.loginService(data)
			.then((userDetails) => {
				console.log(
					"in login component after login localstorage is ",
					AuthService.getCurrentUser()
				);
				setUser(userDetails);
				alert("you login succesfull");
				setLoading(true);
				navigate("/");
			})
			.catch((error) => {
				var resMessage;
				console.log("in erro login component after login localstorage is ",error);
				if (error.status == 0) {
					resMessage =
						"this email is not register with OSCF, kindly SignUp first";
				} else if (error.status == 2) {
					resMessage = "wrong password";
				} else if (error.status == 4) {
					resMessage = "You have to login with Google Sign-in";
				} else if (error.status == 5) {
					resMessage = "credential mis-match";
				} else {
					resMessage = "unhandled status arrive";
				}
				setLoading(false);
				setMassege(resMessage);
			});
	}

	const handleLogin = () => {
		handleGoogleLoginCallback(0, {});
	};
	return (
		<div className="container MyLoginStyle">
			<div className='FormTag shadow mt-5'>
				<div className="card card-container p-5">
					<form >
						<div className="form-group text-lg-center text-success">
							Login Into OSCF
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								className="form-control"
								name="email"
								value={email}
								onChange={(e) => { setEmail(e.target.value) }}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								className="form-control"
								name="password"
								value={password}
								onChange={(e) => { setPassword(e.target.value) }}
							/>
						</div>

						<div className="form-group">
							<button
								type='button'
								className="btn btn-primary btn-block"
								disabled={loading}
								onClick={() => {
									handleLogin();
								}}
							>
								Login
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
						<div className='form-group text-center' name="loginWithGoogle">
							<GoogleLogin
								onSuccess={responseMessage}
								onError={errorMessage}
								responseType="code"
								scope="openid profile email"
								buttonText="Sign in with Google"
								cookiePolicy={"single_host_origin"}
								uxMode={"popup"}
							/>
						</div>
						<div className="form-group text-center  mt-5">
							if you not register? <Link to="/signup">Sing Up</Link>
						</div>

					</form>
<<<<<<< HEAD

=======
					<p>or</p>
					<button onClick={googleAuth}>
						{/* <img src="./images/google.png" alt="google icon" /> */}
						<span>Sing in with Google</span>
					</button>
					<p>
						New Here ? <Link to="/signup">Sing Up</Link>
					</p>
>>>>>>> 3044c5979da7bd0bd53423b993622ab4d9915100
				</div>
			</div>

		</div>
	);
}

export default Login;
