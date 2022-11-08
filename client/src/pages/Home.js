/** @format */

import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./Home.module.css";
import fetchAPI from "../utilities/fetchAPI";

const Home = () => {
	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");

	const handleUsernameInput = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordInput = (e) => {
		setPassword(e.target.value);
	};

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
				<TextField required label="Username" value={username} onChange={handleUsernameInput} />
				<TextField required label="Password" value={password} onChange={handlePasswordInput} />
				<Button variant="contained" onClick={handleLogInClick}>
					Login
				</Button>
			</div>
		</div>
	);
};

export default Home;
