/** @format */

import React, { useState } from "react";
import CategoryRow from "../components/CategoryRow";
import styles from "./Settings.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import whyMeme from "../assets/confused-white-persian-guardian.gif";
import { Fab, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createCategoryAPI } from "../apis/categories";

/* ====================================================
// Type Declaration
==================================================== */
interface newCategoryData {
	userId: number;
	recordId: number;
	categoryName: string;
}

const Settings = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { currentUserId, categories, refreshData } = useCurrentUserContext();

	/* ====================================================
    // Filter categories to income & expense types
    ==================================================== */

	let incomeCategories = [];
	let expenseCategories = [];

	for (let i = 0; i < categories.length; i++) {
		if (categories[i].recordId === 1) {
			incomeCategories.push(categories[i]);
		} else if (categories[i].recordId === 2) {
			expenseCategories.push(categories[i]);
		}
	}

	const incomeCategoriesToDisplay = incomeCategories.map((category) => <CategoryRow category={category} />);

	const expenseCategoriesToDisplay = expenseCategories.map((category) => <CategoryRow category={category} />);

	const toDisplayIfNoCategories = (
		<div className={styles.thisIsEmpty}>
			<h3>This is empty</h3>
			<img src={whyMeme} alt="why-meme" />
		</div>
	);

	/* ====================================================
    // Create new category modal
    ==================================================== */

	const [error, setError] = useState<any>();

	const [openModal, setOpenModal] = useState<boolean>(false);

	// Opens dialog
	const handleClickOpen = () => {
		setOpenModal(true);
	};

	// Closes dialog
	const handleClose = () => {
		setOpenModal(false);
	};

	// Controls the value of select field
	const [recordType, setRecordType] = useState<string>("");

	// Controls the value for text field
	const [categoryName, setCategoryName] = useState<string>("");

	const handleRecordType = (e: any) => {
		setRecordType(e.target.value);
	};

	const handleCategoryName = (e: any) => {
		setCategoryName(e.target.value);
	};

	// Runs on click of create button
	const handleCreate = async () => {
		// Convert state for recordType to id stored in db for comparison below
		let newRecordType = 0;

		if (recordType === "Income") {
			newRecordType = 1;
		} else if (recordType === "Expenses") {
			newRecordType = 2;
		}

		let data: newCategoryData = {
			userId: currentUserId,
			recordId: newRecordType,
			categoryName: categoryName,
		};

		if (data.userId || data.recordId !== 0 || data.categoryName) {
			try {
				const response = await createCategoryAPI(data);

				// Refreshes the data on page
				refreshData();

				// Close modal upon successful update
				handleClose();

                // Clear submitted info from state after creation
				setRecordType("");
				setCategoryName("");
			} catch (err) {
				if (typeof err === "string") {
					setError(err);
				} else if (err instanceof Error) {
					setError(err.message);
				}
			}
		}
	};

	return (
		<div className={styles.container}>
			<h1>Settings</h1>
			<div className={styles.categoriesBox}>
				<h2>Categories</h2>
				<Fab sx={{ marginLeft: "85vw", bgcolor: "#66fcf1" }} onClick={handleClickOpen}>
					<AddIcon />
				</Fab>
				<div className={styles.categoriesList}>
					<div className={styles.typeContainer}>
						<h2>Income</h2>
						{incomeCategories.length > 0 ? incomeCategoriesToDisplay : toDisplayIfNoCategories}
					</div>
					<div className={styles.typeContainer}>
						<h2>Expense</h2>
						{expenseCategories.length > 0 ? expenseCategoriesToDisplay : toDisplayIfNoCategories}{" "}
					</div>
				</div>
			</div>
			{/* Form Dialog, only visible when open */}
			<Dialog open={openModal} fullWidth onClose={handleClose} sx={{ marginLeft: "auto", marginRight: "auto" }}>
				<DialogTitle>Create Category</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ marginTop: "1rem" }}>
						<FormControl sx={{ width: "100%", marginBottom: "1rem" }}>
							<InputLabel htmlFor="income-or-expense">Type</InputLabel>
							<Select value={recordType} onChange={handleRecordType} input={<OutlinedInput label="Type" id="income-or-expense" />}>
								<MenuItem value={"Income"}>Income</MenuItem>
								<MenuItem value={"Expenses"}>Expenses</MenuItem>
							</Select>
						</FormControl>
						<TextField id="categoryName" label="Category Name" variant="outlined" sx={{ width: "100%" }} value={categoryName} onChange={handleCategoryName} />
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" size="large" onClick={handleCreate}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Settings;
