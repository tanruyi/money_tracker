/** @format */

import React, { useState } from "react";
import { useCurrentUserContext } from "../context/currentUserContext";
import { createCategoryAPI } from "../apis/categories";
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
	Stack,
} from "@mui/material";
import { newCategoryData } from "../pages/Welcome";
import StyledButton from "./styledMUI/Button";

/* ====================================================
// Type Declaration
==================================================== */
interface CategoryCreationModalProps {
	openModal: boolean;
	handleClose: () => void;
}

const CategoryCreationModal = ({ openModal, handleClose }: CategoryCreationModalProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { currentUser, refreshData } = useCurrentUserContext();

	/* ====================================================
    // Error State
    ==================================================== */

	const [error, setError] = useState<any>();

	/* ====================================================
    // Controlled inputs
    ==================================================== */
	const [recordType, setRecordType] = useState<string>("");

	const [categoryName, setCategoryName] = useState<string>("");

	const handleRecordType = (e: any) => {
		setRecordType(e.target.value);
	};

	const handleCategoryName = (e: any) => {
		setCategoryName(e.target.value);
	};

	/* ====================================================
    // Runs on click of create button
    ==================================================== */
	const handleCreateCategory = async () => {
		// Convert state for recordType to id stored in db for comparison below
		let newRecordType = 0;

		if (recordType === "Income") {
			newRecordType = 1;
		} else if (recordType === "Expenses") {
			newRecordType = 2;
		}

		let data: newCategoryData = {
			userId: currentUser.id,
			recordId: newRecordType,
			categoryName: categoryName,
		};

		if (data.userId || data.recordId !== 0 || data.categoryName) {
			try {
				const response = await createCategoryAPI(data, currentUser.accessToken);

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
		<Dialog open={openModal} fullWidth onClose={handleClose} sx={{ marginLeft: "auto", marginRight: "auto" }}>
			<DialogTitle sx={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif", paddingTop: "2rem", color: "var(--purple)", fontSize: "1.5rem" }}>
				Create Category
			</DialogTitle>
			<DialogContent>
				<Box component="form" sx={{ marginTop: "1rem" }}>
					<Stack spacing={3}>
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
					</Stack>
				</Box>
			</DialogContent>
			<DialogActions>
				<StyledButton variant="contained" sx={{ fontSize: "1rem", width: "8rem", height: "3rem" }} onClick={handleCreateCategory}>
					Create
				</StyledButton>
			</DialogActions>
		</Dialog>
	);
};

export default CategoryCreationModal;
