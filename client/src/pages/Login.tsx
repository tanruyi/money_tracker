/** @format */

import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "./Login.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import { useNavigate } from "react-router-dom";
import { loginAPI, registrationAPI } from "../apis/users";
import { createDefaultCategoriesAPI } from "../apis/categories";

/* ====================================================
// Type Declaration
==================================================== */
interface newCategory {
	userId: Number;
	recordId: Number;
	categoryName: String;
}

const Home = () => {
	const navigate = useNavigate();

	/* ====================================================
    // Context
    ==================================================== */

	const { updateCurrentUser, updateCurrentUserRole } = useCurrentUserContext();

	/* ====================================================
    // Error State
    ==================================================== */

	const [error, setError] = useState<any>();

	/* ====================================================
    // Controlled Inputs
    ==================================================== */

	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");

	const handleUsernameInput = (e: any) => {
		setUsername(e.target.value);
	};

	const handlePasswordInput = (e: any) => {
		setPassword(e.target.value);
	};

	/* ====================================================
    // Log In
    ==================================================== */

	// Sends login credentials to API
	const handleLogInClick = async () => {
		const data = {
			username,
			password,
		};

		try {
			// Check if username & pw is provided before proceeding
			if (username && password) {
				// Sends login credentials to API
				const response = loginAPI(data);

				// On login, updates user id as context
				updateCurrentUser((await response).data.id);
				updateCurrentUserRole((await response).data.roleId);

				// Navigates to monthly view page on log in
				navigate("/monthly");
			} else {
				window.alert("Username or password is empty. Please try again.");
			}
		} catch (err) {
			if (typeof err === "string") {
				setError(err);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		}
	};

	const enterKeyLogin = (e: any) => {
		if (e.key === "Enter") {
			handleLogInClick();
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

	// define function that creates default categories
	const createDefaultCategories = async (userId: number) => {
		const defaultCategories: newCategory[] = [
			{ userId: userId, recordId: 1, categoryName: "Salary" },
			{ userId: userId, recordId: 1, categoryName: "Government Payouts" },
			{ userId: userId, recordId: 1, categoryName: "Interest" },
			{ userId: userId, recordId: 1, categoryName: "Dividends" },
			{ userId: userId, recordId: 2, categoryName: "Food" },
			{ userId: userId, recordId: 2, categoryName: "Groceries" },
			{ userId: userId, recordId: 2, categoryName: "Electronics" },
			{ userId: userId, recordId: 2, categoryName: "Entertainment" },
			{ userId: userId, recordId: 2, categoryName: "Transport" },
		];

		const data = {
			newCategories: defaultCategories,
		};

		try {
			const response = createDefaultCategoriesAPI(data);
		} catch (err) {
			if (typeof err === "string") {
				setError(err);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		}
	};

	// Sends registration details to API
	const handleRegistration = async () => {
		const data = {
			username,
			password,
			roleId: 1,
		};

		try {
			// Check if username & pw is provided before proceeding
			if (username && password) {
				const response = registrationAPI(data);

				// Upon success confirmation from API, inform user, reset username & pw states, and change back to display login box
				window.alert(`Registration successful! Welcome ${username} to Money Tracker! Please login to enter.`);
				setUsername("");
				setPassword("");
				setRegistrationNeeded(false);
				createDefaultCategories((await response).data.userId);
			} else {
				window.alert("Username or password is empty.");
			}
		} catch (err) {
			if (typeof err === "string") {
				setError(err);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		}
	};

	const enterKeyRegistration = (e: any) => {
		if (e.key === "Enter") {
			handleRegistration();
		}
	};

	return (
		<div className={styles.container}>
			{/* Title */}
			<h1 className={styles.title}>Money Tracker</h1>
			{/* Login or Registration Box */}
			<div className={styles.box}>
				{/* Name for box */}
				<h2>{registrationNeeded ? "Register" : "Login"}</h2>
				{/* Input fields */}
				<div className={styles.textField}>
					<TextField
						required
						label="Username"
						sx={{ width: "25vw" }}
						value={username}
						onChange={handleUsernameInput}
						onKeyUp={registrationNeeded ? enterKeyRegistration : enterKeyLogin}
					/>
				</div>
				<div className={styles.textField}>
					<TextField
						required
						label="Password"
						type="password"
						sx={{ width: "25vw" }}
						value={password}
						onChange={handlePasswordInput}
						onKeyUp={registrationNeeded ? enterKeyRegistration : enterKeyLogin}
					/>
				</div>
				{/* Register or login button */}
				<div className={styles.button}>
					<Button
						variant="contained"
						size="large"
						sx={{ fontSize: "1.3rem", fontWeight: "bold" }}
						onClick={registrationNeeded ? handleRegistration : handleLogInClick}
					>
						{registrationNeeded ? "Register" : "Login"}
					</Button>
				</div>
				{/* Hyperlink to toggle between login & registration */}
				<div>
					<h3 className={styles.toggleLink} onClick={toggleLoginRegisterDisplay}>
						{registrationNeeded ? "Click here to login" : "Not a registered user? Click here to register"}
					</h3>
				</div>
			</div>
		</div>
	);
};

export default Home;
