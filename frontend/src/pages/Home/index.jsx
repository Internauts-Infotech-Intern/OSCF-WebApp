import React, { Component }  from 'react';


function Home(userDetails) {
	const user = userDetails.user;
	const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	};
	return (
		<div>
			<h1>Home</h1>
			<div>
				<div>
					<img src="./images/profile.jpg" alt="login" />
				</div>
				<div>
					<h2>Profile</h2>
					<img
						src={user.picture}
						alt="profile"
					
					/>
					<input
						type="text"
						defaultValue={user.name}
					
						placeholder="UserName"
					/>
					<input
						type="text"
						defaultValue={user.email}
					
						placeholder="Email"
					/>
					<button onClick={logout}>
						Log Out
					</button>
				</div>
			</div>
		</div>
		// <div>
		// 	hello
		// </div>
	);
}

export default Home;
