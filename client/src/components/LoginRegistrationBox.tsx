/** @format */

import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import styles from "./LoginRegistrationBox.module.css";
import StyledButton from "./styledMUI/Button";

interface LoginRegistrationBoxProps {
	handleLogInClick: (username: string, password: string) => void;
	handleRegistration: (username: string, password: string) => void;
	changeDisplay: (newDisplay: "Default" | "Login" | "Registration") => void;
	boxHeader: string;
}

const LoginRegistrationBox = ({ handleLogInClick, handleRegistration, changeDisplay, boxHeader }: LoginRegistrationBoxProps) => {
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

	/* ====================================================
    // Toggle password visibility
    ==================================================== */

	// Saves boolean whether password is currently visible
	const [showPassword, setShowPassword] = useState(false);

	// Changes state upon click of eye icon
	const handleShowPasswordClick = () => {
		setShowPassword(!showPassword);
	};

	/* ====================================================
    // Direct button click event to correct function
    ==================================================== */

	const handleButtonClick = (username: string, password: string) => {
		if (boxHeader === "Login") {
			handleLogInClick(username, password);
		} else {
			handleRegistration(username, password);
		}
	};

	return (
		<div className={styles.loginRegistrationBoxContainer}>
			<div className={styles.loginRegistrationBoxHeader}>
				<p className={styles.loginRegistrationBoxHeaderText}>{boxHeader}</p>
				<p className={styles.loginRegistrationBoxBackButton} onClick={() => changeDisplay("Default")}>
					Back
				</p>
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
			{/* <button className={styles.loginRegistrationBoxButton} onClick={() => handleButtonClick(username, password)}>
				{boxHeader}
			</button> */}
			<StyledButton variant="contained" sx={{ width: "60%", margin: "1.5rem auto" }} onClick={() => handleButtonClick(username, password)}>
				{boxHeader}
			</StyledButton>
		</div>
	);
};

export default LoginRegistrationBox;
