/** @format */

import {
	TextField,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Paper,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import styles from "./Admin.module.css";
import { findAccountAPI, deleteAccountAPI } from "../apis/admin";
import { registrationAPI } from "../apis/users";
import { createDefaultCategoriesAPI } from "../apis/categories";
import { useCurrentUserContext } from "../context/currentUserContext";
import StyledButton from "../components/styledMUI/Button";
import axios from "axios";

/* ====================================================
// Type Declaration
==================================================== */
export interface newCategoryData {
	userId: Number;
	recordId: Number;
	categoryName: String;
}

const Admin = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { currentUser } = useCurrentUserContext();

	/* ====================================================
    // Control Admin Account Creation Inputs
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
			roleId: 2,
		};

		try {
			// Check if username & pw is provided before proceeding
			if (username && password) {
				const response = registrationAPI(data);

				// Upon success confirmation from API, inform user, create default categories and change back to default page
				if ((await response).status === 200) {
					window.alert(`Admin account ${username} created successfully!`);
					createDefaultCategories((await response).data.userId);
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
	// Control Username Search Input
	==================================================== */

	const [usernameToSearch, setUsernameToSearch] = useState<string>("");

	const handleSearchUsernameInput = (e: any) => {
		setUsernameToSearch(e.target.value);
	};

	/* ====================================================
	// Data on Account Returned by API
	==================================================== */

	const [accountFound, setAccountFound] = useState<any>({});

	/* ====================================================
	// Error State for APIs
	==================================================== */

	const [error, setError] = useState<any>();

	/* ====================================================
	// Handle Search Button Click
	==================================================== */

	const handleSearchButton = async () => {
		if (usernameToSearch) {
			try {
				const response = await findAccountAPI(usernameToSearch, currentUser.accessToken);

				setAccountFound(response.data);
			} catch (err) {
				if (typeof err === "string") {
					setError(err);
				} else if (err instanceof Error) {
					setError(err.message);
				}
			}
		} else {
			window.alert("No username provided");
		}
	};

	/* ====================================================
	// Handle Delete Button Click
	==================================================== */

	const handleDeleteButton = async () => {
		const confirmed = window.confirm(`Are you sure you want to delete account for username ${accountFound.username}?`);

		if (confirmed) {
			const requestBody = {
				data: {
					userId: accountFound.id,
				},
			};

			try {
				const response = await deleteAccountAPI(requestBody, currentUser.accessToken);

				setUsernameToSearch("");
				setAccountFound({});
				window.alert(`Account for ${accountFound.username} deleted.`);
			} catch (err) {
				if (typeof err === "string") {
					setError(err);
				} else if (err instanceof Error) {
					setError(err.message);
				}
			}
		}
	};

	/* ====================================================
	// Text to display for user's role in table
	==================================================== */

	let role = "";

	if (accountFound.roleId === 1) {
		role = "Normal User";
	} else if (accountFound.roleId === 2) {
		role = "Admin";
	}

	return (
		<div className={styles.adminContainer}>
			<h2>Create Admin Account</h2>
			<div className={styles.adminCreateBlock}>
				<TextField
					required
					label="Username"
					sx={{ width: "30rem", backgroundColor: "var(--lightGrey)" }}
					value={username}
					onChange={handleUsernameInput}
				/>
				<FormControl variant="outlined" sx={{ width: "30rem", margin: "2rem 0" }}>
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
				<StyledButton variant="contained" sx={{ width: "15rem", fontSize: "1rem" }} onClick={() => handleRegistration(username, password)}>
					Create admin account
				</StyledButton>
			</div>
			<h2>Delete Account</h2>
			<div className={styles.adminSearchBlock}>
				<TextField
					id="search-username"
					label="Search by Username"
					variant="outlined"
					value={usernameToSearch}
					onChange={handleSearchUsernameInput}
					sx={{ width: "30rem", marginRight: "1rem" }}
				/>
				<StyledButton variant="contained" sx={{ fontSize: "1rem" }} onClick={handleSearchButton}>
					Search
				</StyledButton>
				<TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>User ID</TableCell>
								<TableCell>Username</TableCell>
								<TableCell>Role</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>{accountFound.id}</TableCell>
								<TableCell>{accountFound.username}</TableCell>
								<TableCell>{role}</TableCell>
								{accountFound.id > 0 ? (
									<TableCell sx={{ width: "20vh" }}>
										<StyledButton variant="contained" sx={{ fontSize: "1rem" }} onClick={handleDeleteButton}>
											Delete Account
										</StyledButton>
									</TableCell>
								) : (
									""
								)}
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default Admin;
