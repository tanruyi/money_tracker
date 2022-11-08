/** @format */

import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./Home.module.css";
import fetchAPI from "../utilities/fetchAPI";

const Home = () => {
	// States for username & pw
	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");

	// Set username & pw as controlled inputs
	const handleUsernameInput = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordInput = (e) => {
		setPassword(e.target.value);
	};

	// Sends login credentials to API
	const handleLogInClick = () => {
		if (username && password) {
			const credentials = JSON.stringify({ username: username, password: password });
			fetchAPI("http://127.0.0.1:5001/users/login", "POST", credentials);
		} else {
			window.alert("Username or password is empty. Please try again.");
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Money Tracker</h1>
			<div className={styles.logInBox}>
				<h2>Login</h2>
				<div className={styles.textField}>
					<TextField required label="Username" sx={{ width: "25vw" }} value={username} onChange={handleUsernameInput} />
				</div>
				<div className={styles.textField}>
					<TextField required label="Password" type="password" sx={{ width: "25vw" }} value={password} onChange={handlePasswordInput} />
				</div>
				<div className={styles.logInButton}>
					<Button variant="contained" size="large" sx={{fontSize: "1.3rem", fontWeight: "bold"}} onClick={handleLogInClick}>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Home;
