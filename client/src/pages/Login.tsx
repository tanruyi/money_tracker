/** @format */

import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./Login.module.css";
import axiosInstance from "../utilities/axios";
import { useCurrentUserContext } from "../context/currentUserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	/* ====================================================
    // Context
    ==================================================== */

	const { updateCurrentUser } = useCurrentUserContext();

	/* ====================================================
    // Log In
    ==================================================== */

	const [error, setError] = useState<any>();

	// States for username & pw
	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");

	// Set username & pw as controlled inputs
	const handleUsernameInput = (e: any) => {
		setUsername(e.target.value);
	};

	const handlePasswordInput = (e: any) => {
		setPassword(e.target.value);
	};

	// Sends login credentials to API
	const handleLogInClick = async () => {
		const data = {
			username,
			password,
		};

		// login API url to append to base URL
		const loginURL = "/users/login";

		try {
			// Check if username & pw is provided before proceeding
			if (username && password) {
				// Sends login credentials to API
				const response = await axiosInstance.post(loginURL, data);

				if (response.status === 200) {
					// On login, updates user id as context
					updateCurrentUser(response.data.id);

					// Navigates to monthly view page on log in
					navigate("/monthly");
				}
			} else {
				window.alert("Username or password is empty. Please try again.");
			}
		} catch (err) {
			if (typeof err === "string") {
				setError(err);
			} else if (err instanceof Error) {
				setError(err.message);
			}
			// Create alerts based on error msg from server
			// if (err.response.status === 400) {
			// 	window.alert("Username or password not provided.");
			// } else if (err.response.message === "no such username exists") {
			// 	window.alert("No account found with this username");
			// } else if (err.response.message === "username or password incorrect") {
			// 	window.alert("Username or password incorrect");
			// } else {
			// 	window.alert("Login failed");
			// }
		}
	};

	/* ====================================================
    // Registration
    ==================================================== */

	// this state controls whether login or registration box will be displayed
	const [registrationNeeded, setRegistrationNeeded] = useState(false);

	// updates the state upon click
	const toggleLoginRegisterDisplay = () => {
		setRegistrationNeeded(!registrationNeeded);
	};

	interface Category {
		userId: Number;
		recordId: Number;
		categoryName: String;
	}

	const createDefaultCategories = () => {
		const defaultCategories = {};
	};

	// Sends registration details to API
	const handleRegistration = async () => {
		const data = {
			username,
			password,
		};

		// registration API url to append to base URL
		const loginURL = "/users/create";

		// categories creation URL to append to base URL

		try {
			// Check if username & pw is provided before proceeding
			if (username && password) {
				const response = await axiosInstance.put(loginURL, data);

				// Upon success confirmation from API, inform user, reset username & pw states, and change back to display login box
				if (response.status === 200) {
					window.alert(`Registration successful! Welcome ${username} to Money Tracker! Please login to enter.`);
					setUsername("");
					setPassword("");
					setRegistrationNeeded(false);
				}
			} else {
				window.alert("Username or password is empty.");
			}
		} catch (err) {
			if (typeof err === "string") {
				setError(err);
			} else if (err instanceof Error) {
				setError(err.message);
			}
			// Create alerts based on error msg from server
			// if (err.response.message === "username or password not provided") {
			// 	window.alert("Username or password not provided.");
			// } else if (err.response.message === "this username is already taken!") {
			// 	window.alert("This username is already taken!");
			// } else {
			// 	window.alert("Registration failed");
			// }
		}
	};

	/* ====================================================
    // HTML Components
    ==================================================== */

	const loginBox = (
		<div className={styles.box}>
			<h2>Login</h2>
			<div className={styles.textField}>
				<TextField required label="Username" sx={{ width: "25vw" }} value={username} onChange={handleUsernameInput} />
			</div>
			<div className={styles.textField}>
				<TextField required label="Password" type="password" sx={{ width: "25vw" }} value={password} onChange={handlePasswordInput} />
			</div>
			<div className={styles.button}>
				<Button variant="contained" size="large" sx={{ fontSize: "1.3rem", fontWeight: "bold" }} onClick={handleLogInClick}>
					Login
				</Button>
			</div>
			<div>
				<h3 className={styles.toggleLink} onClick={toggleLoginRegisterDisplay}>
					Not a registered user? Click here to register
				</h3>
			</div>
		</div>
	);

	const registrationBox = (
		<div className={styles.box}>
			<h2>Register</h2>
			<div className={styles.textField}>
				<TextField required label="Username" sx={{ width: "25vw" }} value={username} onChange={handleUsernameInput} />
			</div>
			<div className={styles.textField}>
				<TextField required label="Password" type="password" sx={{ width: "25vw" }} value={password} onChange={handlePasswordInput} />
			</div>
			<div className={styles.button}>
				<Button variant="contained" size="large" sx={{ fontSize: "1.3rem", fontWeight: "bold" }} onClick={handleRegistration}>
					Register
				</Button>
			</div>
			<div>
				<h3 className={styles.toggleLink} onClick={toggleLoginRegisterDisplay}>
					Click here to login
				</h3>
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Money Tracker</h1>
			{registrationNeeded ? registrationBox : loginBox}
		</div>
	);
};

export default Home;
