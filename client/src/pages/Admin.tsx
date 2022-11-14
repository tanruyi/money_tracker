/** @format */

import { Button, TextField, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import React, { useState } from "react";
import styles from "./Admin.module.css";
import { findAccountAPI, deleteAccountAPI } from "../apis/admin";

const Admin = () => {
	/* ====================================================
	// Control Username Search Input
	==================================================== */

	const [usernameToSearch, setUsernameToSearch] = useState<string>("");

	const handleUsernameInput = (e: any) => {
		setUsernameToSearch(e.target.value);
	};

	/* ====================================================
	// Creates Table Displaying User Found
	==================================================== */

	const [accountFound, setAccountFound] = useState<any>();

	const [error, setError] = useState<any>();

	let resultToDisplay: any;

	if (accountFound) {
		let role = "";

		if (accountFound.roleId === 1) {
			role = "Normal User";
		} else if (accountFound.roleId === 2) {
			role = "Admin";
		}

		resultToDisplay = (
			<TableContainer component={Paper}>
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
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		);
	}

	/* ====================================================
	// Handle Search Button Click
	==================================================== */

	const handleSearchButton = async () => {
		if (usernameToSearch) {
			try {
				const response = await findAccountAPI(usernameToSearch);

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

	return (
		<div className={styles.container}>
			<h1>Admin</h1>
			<div className={styles.block}>
				<h2>Delete Account</h2>
				<Box>
					<TextField id="search-username" label="Search by Username" variant="outlined" value={usernameToSearch} onChange={handleUsernameInput} />
					<Button variant="contained" onClick={handleSearchButton}>
						Search
					</Button>
				</Box>
				{resultToDisplay}
			</div>
		</div>
	);
};

export default Admin;
