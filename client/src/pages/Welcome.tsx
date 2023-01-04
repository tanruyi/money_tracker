/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useCurrentUserContext } from "../context/currentUserContext";
import styles from "./Welcome.module.css";
import { loginAPI, registrationAPI } from "../apis/users";
import { createDefaultCategoriesAPI } from "../apis/categories";
import LoginRegistrationBox from "../components/LoginRegistrationBox";

/* ====================================================
// Type Declaration
==================================================== */
export interface newCategoryData {
	userId: Number;
	recordId: Number;
	categoryName: String;
}

const Home = () => {
	const navigate = useNavigate();

	/* ====================================================
    // Context
    ==================================================== */

	const { currentUser, updateCurrentUser } = useCurrentUserContext();

	/* ====================================================
    // Error State
    ==================================================== */

	const [error, setError] = useState<any>();

	/* ====================================================
    // Controlled Inputs
    ==================================================== */

	// Username must start with an alphabet and end with any combination of alphabets, numbers, hyphens & underscores between 3 to 19 characters.
	// Username can have min 4 characters & max 20 characters
	const userRegex = /^[A-Za-z][a-zA-Z0-9-_]{3,19}$/;

	// Password must have at least 1 lower-case & upper-case alphabet, 1 number & 1 special characters, and must be min 8 & max 24 characters
	const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,24}$/;

	// Saves input by user
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Checks input against regex to see if it's valid
	const [validUsername, setValidUsername] = useState(false);
	const [validPassword, setValidPassword] = useState(false);

	// Event handlers for changes in input fields
	const handleUsernameInput = (e: any) => {
		setUsername(e.target.value);
	};

	const handlePasswordInput = (e: any) => {
		setPassword(e.target.value);
	};

	// Test whether inputs are valid upon state change
	useEffect(() => {
		setValidUsername(userRegex.test(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(pwRegex.test(password));
	}, [password]);

	// Saves boolean whether password is currently visible
	const [showPassword, setShowPassword] = useState(false);

	// Changes state upon click of eye icon
	const handleShowPasswordClick = () => {
		setShowPassword(!showPassword);
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
				if ((await response).status === 200) {
					updateCurrentUser((await response).data);

					// Navigates to monthly view page on log in
					navigate("/calendar");
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
		const defaultCategories: newCategoryData[] = [
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
			if (validUsername && validPassword) {
				const response = registrationAPI(data);

				// Upon success confirmation from API, inform user, reset username & pw states, and change back to display login box
				if ((await response).status === 200) {
					window.alert(`Registration successful! Welcome ${username} to Money Tracker! Please login to enter.`);
					setUsername("");
					setPassword("");
					setRegistrationNeeded(false);
					createDefaultCategories((await response).data.userId);
				}
			} else {
				window.alert("Username or password requirements not met.");
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
		<div className={styles.welcomeBackground}>
			{/* Website Title */}
			<h1 className={styles.welcomeTitle}>Money Tracker</h1>
			{/* Login or Registration Box */}
			<div className={styles.box}>
				{/* Name for box */}
				{/* <h2>{registrationNeeded ? "Register" : "Login"}</h2> */}
				{/* Input fields */}
				{/* <div className={styles.textField}>
					<TextField
						required
						label="Username"
						sx={{ width: "25vw" }}
						value={username}
						onChange={handleUsernameInput}
						onKeyUp={registrationNeeded ? enterKeyRegistration : enterKeyLogin}
					/>
				</div>
				<div className={registrationNeeded && validUsername === false ? styles.textFieldErrorMsg : styles.textFieldErrorMsgInactive}>
					<ErrorOutlineIcon sx={{ margin: "1rem 0.5rem" }} fontSize="large" />
					<p>
						{registrationNeeded && validUsername === false
							? "Username must be between 4 to 20 characters. Alphabets, numbers, hyphens & underscores allowed."
							: ""}
					</p>
				</div>
				<div className={styles.textField}>
					<FormControl variant="outlined">
						<InputLabel htmlFor="password">Password</InputLabel>
						<OutlinedInput
							required
							id="password"
							label="password"
							type={showPassword ? "text" : "password"}
							sx={{ width: "25vw" }}
							value={password}
							onChange={handlePasswordInput}
							onKeyUp={registrationNeeded ? enterKeyRegistration : enterKeyLogin}
							endAdornment={
								<InputAdornment position="end">
									<IconButton aria-label="toggle password visibility" onClick={handleShowPasswordClick} edge="end">
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</div>
				<div className={registrationNeeded && validPassword === false ? styles.textFieldErrorMsg : styles.textFieldErrorMsgInactive}>
					<ErrorOutlineIcon sx={{ margin: "1rem 0.5rem" }} fontSize="large" />
					<p>
						{registrationNeeded && validPassword === false
							? "Password must have at least 1 lower-case alphabet, upper-case alphabet, number & special character. Must be min 8 & max 24 characters"
							: ""}
					</p>
				</div> */}

				{/* Register or login button */}
				{/* <div className={styles.button}>
					<Button
						variant="contained"
						size="large"
						sx={{ fontSize: "1.3rem", fontWeight: "bold", backgroundColor: "var(--purple)" }}
						onClick={registrationNeeded ? handleRegistration : handleLogInClick}
					>
						{registrationNeeded ? "Register" : "Login"}
					</Button>
				</div> */}
				{/* Hyperlink to toggle between login & registration */}
				{/* <div>
					<h3 className={styles.toggleLink} onClick={toggleLoginRegisterDisplay}>
						{registrationNeeded ? "Click here to login" : "Not a registered user? Click here to register"}
					</h3>
				</div> */}
                    <LoginRegistrationBox />
                </div>
		</div>
	);
};

export default Home;
