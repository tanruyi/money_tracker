/** @format */

import React, { useState } from "react";
import styles from "./CategoryRow.module.css";
import icon from "../assets/cocoa.png";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { Category } from "../context/currentUserContext";
import { updateCategoryAPI, deleteCategoryAPI } from "../apis/categories";
import { useCurrentUserContext } from "../context/currentUserContext";

/* ====================================================
// Type Declaration
==================================================== */

type CategoryRowProps = {
	category: Category;
};

interface newCategoryData {
	recordId: number;
	categoryName: string;
}

const CategoryRow = ({ category }: CategoryRowProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { refreshData } = useCurrentUserContext();

	/* ====================================================
    // Handles form dialog
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

	let incomeOrExpense = "";

	if (category.recordId === 1) {
		incomeOrExpense = "Income";
	} else if (category.recordId === 2) {
		incomeOrExpense = "Expenses";
	}

	// Controls the value of select field
	const [recordType, setRecordType] = useState(incomeOrExpense);

	// Controls the value for text field
	const [categoryName, setCategoryName] = useState<string>(category.categoryName);

	const handleRecordType = (e: any) => {
		setRecordType(e.target.value);
	};

	const handleCategoryName = (e: any) => {
		setCategoryName(e.target.value);
	};

	// Runs on click of update button
	const handleUpdate = async () => {
		// This is the req.body for API
		let data: Partial<newCategoryData> = {};

		// Convert state for recordType to id stored in db for comparison below
		let newRecordType;

		if (recordType === "Income") {
			newRecordType = 1;
		} else if (recordType === "Expenses") {
			newRecordType = 2;
		}

		// If there are updates made, add to the data object
		if (newRecordType !== category.recordId) {
			data.recordId = newRecordType;
		}
		if (categoryName !== category.categoryName) {
			data.categoryName = categoryName;
		}

		// Check if there is anything to update, if yes run API
		if (data) {
			try {
				const response = await updateCategoryAPI(category.id, data);

				// Refreshes the data on page
				refreshData();

				// Close modal upon successful update
				handleClose();
			} catch (err) {
				if (typeof err === "string") {
					setError(err);
				} else if (err instanceof Error) {
					setError(err.message);
				}
			}
		}
	};

	// Runs on click of delete button
	const handleDelete = async () => {
		const requestBody = {
			data: {
				id: category.id,
			},
		};

		try {
			const response = await deleteCategoryAPI(requestBody);

			// Refreshes the data on page
			refreshData();

			// Close modal upon successful update
			handleClose();
		} catch (err) {
			if (typeof err === "string") {
				setError(err);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		}
	};

	return (
		<div id={"categoryId" + category.id.toString()} className={styles.rowContainer}>
			<div className={styles.rowIcon}>
				<img src={icon} alt="icon" />
			</div>
			<div className={styles.rowInfo}>
				<h2>{category.categoryName}</h2>
			</div>
			<div className={styles.rowButton}>
				<IconButton onClick={handleClickOpen}>
					<EditIcon fontSize="large" />
				</IconButton>
				{/* Form Dialog, only visible when open */}
				<Dialog open={openModal} fullWidth onClose={handleClose} sx={{ marginLeft: "auto", marginRight: "auto" }}>
					<DialogTitle>Edit Category</DialogTitle>
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
						<Button variant="contained" size="large" onClick={handleUpdate}>
							Update
						</Button>
						<Button variant="contained" size="large" onClick={handleDelete}>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};

export default CategoryRow;
