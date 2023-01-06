/** @format */

import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import styles from "./LoginRegistrationBox.module.css";

interface LoginRegistrationBoxProps {
	handleLogInClick: (username: string, password: string) => void;
}

const LoginRegistrationBox = ({ handleLogInClick}: LoginRegistrationBoxProps) => {
    const [display, setDisplay] = useState<"Default" | "Login" | "Registration">("Default");
    
    const changeDisplay = (newDisplay: "Default" | "Login" | "Registration") => {
        setDisplay(newDisplay)
    }

	/* ====================================================
    // Controlled Inputs
    ==================================================== */

	// Saves input by user
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// Event handlers for changes in input fields
	const handleUsernameInput = (e: any) => {
		setUsername(e.target.value);
	};

	const handlePasswordInput = (e: any) => {
		setPassword(e.target.value);
	};

	// Saves boolean whether password is currently visible
	const [showPassword, setShowPassword] = useState(false);

	// Changes state upon click of eye icon
	const handleShowPasswordClick = () => {
		setShowPassword(!showPassword);
	};

	/* ====================================================
    // JSX: Default Display on web page load
    ==================================================== */

	const defaultDisplay = (
		<div className={styles.loginRegistrationBoxContainer}>
			<p className={styles.loginRegistrationBoxHeadline}>Welcome back</p>
			<button className={styles.loginRegistrationBoxButton} onClick={() => changeDisplay("Login")}>Login</button>
			<button className={styles.loginRegistrationBoxButton} onClick={() => changeDisplay("Registration")}>Create account</button>
		</div>
	);

	/* ====================================================
    // JSX: Login
    ==================================================== */

	const loginRegistrationDisplay = (
		<div className={styles.loginRegistrationBoxContainer}>
			<div className={styles.loginRegistrationBoxHeader}>
				<p className={styles.loginRegistrationBoxHeaderText}>Login</p>
				<p className={styles.loginRegistrationBoxBackButton} onClick={() => changeDisplay("Default")}>Back</p>
			</div>
			<TextField
				required
				label="Username"
				sx={{ width: "80%", margin: "0 auto 1rem auto", backgroundColor: "var(--lightGrey)" }}
				value={username}
				onChange={handleUsernameInput}
			/>
			<FormControl variant="outlined" sx={{ width: "80%", margin: "1rem auto 1rem auto" }}>
				<InputLabel htmlFor="password">Password</InputLabel>
				<OutlinedInput
					required
					id="password"
					label="password"
					type={showPassword ? "text" : "password"}
					sx={{ backgroundColor: "var(--lightGrey)" }}
					value={password}
					onChange={handlePasswordInput}
					endAdornment={
						<InputAdornment position="end">
							<IconButton aria-label="toggle password visibility" onClick={handleShowPasswordClick} edge="end">
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<button className={styles.loginRegistrationBoxButton} onClick={() => handleLogInClick(username, password)}>
				Login
			</button>
		</div>
	);
	return <>{display === "Default" ? defaultDisplay : loginRegistrationDisplay}</>;
};

export default LoginRegistrationBox;
