/** @format */

import React, { useState } from "react";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from "@mui/material";
import { useCurrentUserContext, Category } from "../context/currentUserContext";
import { updateCategoryAPI, deleteCategoryAPI } from "../apis/categories";

/* ====================================================
// Type Declaration
==================================================== */

interface newCategoryData {
	recordId: number;
	categoryName: string;
}

interface CategoryEditModalProps {
	category: Category;
	openModal: boolean;
	handleClose: () => void;
}

const CategoryEditModal = ({ category, openModal, handleClose }: CategoryEditModalProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { currentUser, refreshData } = useCurrentUserContext();

	/* ====================================================
    // Error State
    ==================================================== */

	const [error, setError] = useState<any>();

	/* ====================================================
    // Get default text to display for record type field
    ==================================================== */

	let incomeOrExpense = "";

	if (category.recordId === 1) {
		incomeOrExpense = "Income";
	} else if (category.recordId === 2) {
		incomeOrExpense = "Expenses";
	}

	/* ====================================================
    // Controlled inputs
    ==================================================== */

	const [recordType, setRecordType] = useState(incomeOrExpense);

	const [categoryName, setCategoryName] = useState<string>(category.categoryName);

	const handleRecordType = (e: any) => {
		setRecordType(e.target.value);
	};

	const handleCategoryName = (e: any) => {
		setCategoryName(e.target.value);
	};

	/* ====================================================
    // Runs on click of update button
    ==================================================== */

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
				const response = await updateCategoryAPI(category.id, data, currentUser.accessToken);

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

	/* ====================================================
    // Runs on click of delete button
    ==================================================== */
	const handleDelete = async () => {
		const requestBody = {
			data: {
				id: category.id,
			},
		};

		try {
			const response = await deleteCategoryAPI(requestBody, currentUser.accessToken);

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
					<TextField
						id="categoryName"
						label="Category Name"
						variant="outlined"
						sx={{ width: "100%" }}
						value={categoryName}
						onChange={handleCategoryName}
					/>
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
	);
};

export default CategoryEditModal;
