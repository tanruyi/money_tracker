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
	// Creates Table Displaying User Found
	==================================================== */

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
							<TableCell>
								<Button variant="contained" onClick={handleDeleteButton}>
									Delete Account
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		);
	}

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
