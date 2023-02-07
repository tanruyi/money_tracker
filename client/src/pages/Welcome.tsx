/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../context/currentUserContext";
import styles from "./Welcome.module.css";
import { loginAPI, registrationAPI } from "../apis/users";
import { createDefaultCategoriesAPI } from "../apis/categories";
import LoginRegistrationBox from "../components/LoginRegistrationBox";
import axios from "axios";
import StyledButton from "../components/styledMUI/Button";

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

	const { updateCurrentUser } = useCurrentUserContext();

	/* ====================================================
    // State - Display default page or login/registration fields
    ==================================================== */

	const [display, setDisplay] = useState<"Default" | "Login" | "Registration">("Default");

	const changeDisplay = (newDisplay: "Default" | "Login" | "Registration") => {
		setDisplay(newDisplay);
	};

	/* ====================================================
    // Error State
    ==================================================== */

	const [error, setError] = useState<any>();

	/* ====================================================
    // Log In
    ==================================================== */

	// Sends login credentials to API
	const handleLogInClick = async (username: string, password: string) => {
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
				window.alert("Username and/or password is empty. Please try again.");
			}
		} catch (err) {
			let message;

			// if error is axiosError type and response key exists on err, save message key to message variable
			if (axios.isAxiosError(err) && err.response) {
				message = err.response.data.message;
			} else {
				// otherwise, save err as string to message variable
				message = String(err);
			}

			window.alert(message);
			setError(message);
		}
	};

	/* ====================================================
    // Registration
    ==================================================== */

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

			if ((await response).status === 200) {
				window.alert("Default categories created. You can customise these in settings.");
			}
		} catch (err) {
			let message;

			// if error is axiosError type and response key exists on err, save message key to message variable
			if (axios.isAxiosError(err) && err.response) {
				message = err.response.data.message;
			} else {
				// otherwise, save err as string to message variable
				message = String(err);
			}

			window.alert(message);
			setError(message);
		}
	};

	// Sends registration details to API
	const handleRegistration = async (username: string, password: string) => {
		const data = {
			username,
			password,
			roleId: 1,
		};

		try {
			// Check if username & pw is provided before proceeding
			if (username && password) {
				const response = registrationAPI(data);

				// Upon success confirmation from API, inform user, create default categories and change back to default page
				if ((await response).status === 200) {
					window.alert(`Registration successful! Welcome ${username} to Money Tracker! Please login to enter.`);
					createDefaultCategories((await response).data.userId);
					changeDisplay("Default");
				}
			} else {
				window.alert("Username and/or password is empty. Please try again.");
			}
		} catch (err) {
			let message;

			// if error is axiosError type and response key exists on err, save message key to message variable
			if (axios.isAxiosError(err) && err.response) {
				message = err.response.data.message;
			} else {
				// otherwise, save err as string to message variable
				message = String(err);
			}

			window.alert(message);
			setError(message);
		}
	};

	/* ====================================================
    // JSX: Default Display on web page load
    ==================================================== */

	const defaultDisplay = (
		<div className={styles.welcomeContainer}>
			<p className={styles.welcomeHeadline}>Welcome back</p>
			<StyledButton variant="contained" sx={{ width: "60%", margin: "1.5rem auto" }} onClick={() => changeDisplay("Login")}>
				Login
			</StyledButton>
			<StyledButton variant="contained" sx={{ width: "60%", margin: "1.5rem auto" }} onClick={() => changeDisplay("Registration")}>
				Create account
			</StyledButton>
		</div>
	);

	return (
		<div className={styles.welcomeBackground}>
			{/* Website Title */}
			<h1 className={styles.welcomeTitle}>Money Tracker</h1>
			{/* Login or Registration Box */}
			<div className={styles.box}>
				{display === "Default" && defaultDisplay}
				{display === "Login" && (
					<LoginRegistrationBox
						handleLogInClick={handleLogInClick}
						handleRegistration={handleRegistration}
						changeDisplay={changeDisplay}
						boxHeader={"Login"}
					/>
				)}
				{display === "Registration" && (
					<LoginRegistrationBox
						handleLogInClick={handleLogInClick}
						handleRegistration={handleRegistration}
						changeDisplay={changeDisplay}
						boxHeader={"Create account"}
					/>
				)}
			</div>
		</div>
	);
};

export default Home;
