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
				const response = await deleteAccountAPI(requestBody);

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
		<div className={styles.container}>
			<div className={styles.block}>
				<h1>Delete Account</h1>
				<Box sx={{ marginBottom: "2rem", display: "flex", alignItems: "baseline" }}>
					<TextField id="search-username" label="Search by Username" variant="outlined" value={usernameToSearch} onChange={handleUsernameInput} />
					<Button variant="contained" onClick={handleSearchButton} size="large" sx={{ marginLeft: "2rem" }}>
						Search
					</Button>
				</Box>
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
								<TableCell sx={{ width: "20vh" }}>
									<Button variant="contained" onClick={handleDeleteButton}>
										Delete Account
									</Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default Admin;
