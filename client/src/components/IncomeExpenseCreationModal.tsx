/** @format */

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useCurrentUserContext } from "../context/currentUserContext";
import { createIncomeAPI } from "../apis/income";
import { createExpenseAPI } from "../apis/expenses";
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
	InputAdornment,
	Stack,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import StyledButton from "./styledMUI/Button";

/* ====================================================
// Type Declaration
==================================================== */

interface newRecordInputState {
	recordType: string;
	recordId: number;
	categoryName: string;
	categoryId: number;
	date: any;
	amount: string;
	detail: string;
	detailCharacterCount: number;
	note: string;
	noteCharacterCount: number;
}

interface newRecordData {
	userId: number;
	date: Dayjs;
	categoryId: number;
	amount: number | undefined;
	detail: string;
	note: string;
}

interface IncomeExpenseCreationModalProps {
	openModal: boolean;
	handleClose: () => void;
}

const IncomeExpenseCreationModal = ({ openModal, handleClose }: IncomeExpenseCreationModalProps) => {
	/* ====================================================
	// Context
	==================================================== */

	const { currentUser, categories, refreshData } = useCurrentUserContext();

	/* ====================================================
    // Create new category modal
    ==================================================== */

	const [error, setError] = useState<any>();

	// Controls inputs
	const [newRecordInput, setNewRecordInput] = useState<newRecordInputState>({
		recordType: "",
		recordId: 0,
		categoryName: "",
		categoryId: 0,
		date: dayjs(),
		amount: "",
		detail: "",
		detailCharacterCount: 0,
		note: "",
		noteCharacterCount: 0,
	});

	const handleRecordType = (e: any) => {
		setNewRecordInput((prevState) => {
			return {
				...prevState,
				recordType: e.target.value,
			};
		});

		if (e.target.value === "Income") {
			setNewRecordInput((prevState) => {
				return {
					...prevState,
					recordId: 1,
				};
			});
		} else if (e.target.value === "Expenses") {
			setNewRecordInput((prevState) => {
				return {
					...prevState,
					recordId: 2,
				};
			});
		}
	};

	const handleCategoryName = (e: any) => {
		let categoryId: number;

		for (let i = 0; i < categories.length; i++) {
			if (categories[i].categoryName === e.target.value) {
				categoryId = categories[i].id;
				break;
			}
			continue;
		}

		setNewRecordInput((prevState) => {
			return {
				...prevState,
				categoryName: e.target.value,
				categoryId: categoryId,
			};
		});
	};

	const handleDate = (newDate: Dayjs | null) => {
		setNewRecordInput((prevState) => {
			return {
				...prevState,
				date: newDate,
			};
		});
	};

	const handleAmount = (e: any) => {
		setNewRecordInput((prevState) => {
			return {
				...prevState,
				amount: e.target.value,
			};
		});
	};

	const handleDetail = (e: any) => {
		if (e.target.value.length <= 50) {
			setNewRecordInput((prevState) => {
				return {
					...prevState,
					detail: e.target.value,
					detailCharacterCount: e.target.value.length,
				};
			});
		} else {
			window.alert("You have exceeded the character limit.");
		}
	};

	const handleNote = (e: any) => {
		if (e.target.value.length <= 200) {
			setNewRecordInput((prevState) => {
				return {
					...prevState,
					note: e.target.value,
					noteCharacterCount: e.target.value.length,
				};
			});
		} else {
			window.alert("You have exceeded the character limit.");
		}
	};

	// Runs on click of create button
	const handleCreateRecord = async () => {
		let data: newRecordData = {
			userId: currentUser.id,
			date: newRecordInput.date,
			categoryId: newRecordInput.categoryId,
			amount: Number(newRecordInput.amount),
			detail: newRecordInput.detail,
			note: newRecordInput.note,
		};

		if (data.userId || data.date || data.categoryId || data.amount) {
			if (newRecordInput.recordType === "Income") {
				try {
					const response = await createIncomeAPI(data, currentUser.accessToken);

					// Refreshes the data on page
					refreshData();

					// Close modal upon successful update
					handleClose();

					// Clear submitted info from state after creation
					setNewRecordInput({
						recordType: "",
						recordId: 0,
						categoryName: "",
						categoryId: 0,
						date: dayjs(),
						amount: "",
						detail: "",
						detailCharacterCount: 0,
						note: "",
						noteCharacterCount: 0,
					});
				} catch (err) {
					if (typeof err === "string") {
						setError(err);
					} else if (err instanceof Error) {
						setError(err.message);
					}
				}
			} else if (newRecordInput.recordType === "Expenses") {
				try {
					const response = await createExpenseAPI(data, currentUser.accessToken);

					// Refreshes the data on page
					refreshData();

					// Close modal upon successful update
					handleClose();

					// Clear submitted info from state after creation
					setNewRecordInput({
						recordType: "",
						recordId: 0,
						categoryName: "",
						categoryId: 0,
						date: dayjs(),
						amount: "",
						detail: "",
						detailCharacterCount: 0,
						note: "",
						noteCharacterCount: 0,
					});
				} catch (err) {
					if (typeof err === "string") {
						setError(err);
					} else if (err instanceof Error) {
						setError(err.message);
					}
				}
			}
		}
	};

	/* ====================================================
    // Filters the category names to display for selection in modal based on record type selected
    ==================================================== */

	const categoryNamesForSelection = categories.filter((category) => category.recordId === newRecordInput.recordId);

	let categoryNamesToDisplay;

	if (categoryNamesForSelection.length > 0) {
		categoryNamesToDisplay = categoryNamesForSelection.map((category) => (
			<MenuItem value={category.categoryName} key={`categoryId${category.id}`}>
				{category.categoryName}
			</MenuItem>
		));
	} else {
		categoryNamesToDisplay = (
			<MenuItem value="" disabled>
				Please select a record type first
			</MenuItem>
		);
	}

	return (
		<Dialog open={openModal} fullWidth onClose={handleClose} sx={{ marginLeft: "auto", marginRight: "auto" }}>
			<DialogTitle sx={{fontWeight: "bold", fontFamily: "Poppins, sans-serif", paddingTop: "2rem", color: "var(--purple)", fontSize: "1.5rem"}}>Create Income or Expense Record</DialogTitle>
			<DialogContent>
				<Box component="form" sx={{ marginTop: "1rem" }}>
					<Stack spacing={3}>
						{/* Dropdown for record type */}
						<FormControl>
							<InputLabel htmlFor="income-or-expense">Record Type</InputLabel>
							<Select
								value={newRecordInput.recordType}
								onChange={handleRecordType}
								input={<OutlinedInput label="Record Type" id="income-or-expense" />}
							>
								<MenuItem value={"Income"}>Income</MenuItem>
								<MenuItem value={"Expenses"}>Expenses</MenuItem>
							</Select>
						</FormControl>
						{/* Dropdown for category name */}
						<FormControl>
							<InputLabel htmlFor="categoryName">Category Name</InputLabel>
							<Select
								value={newRecordInput.categoryName}
								onChange={handleCategoryName}
								input={<OutlinedInput label="Category Name" id="categoryName" />}
							>
								{categoryNamesToDisplay}
							</Select>
						</FormControl>
						{/* Date picker */}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DesktopDatePicker
								label="date"
								inputFormat="DD/MM/YYYY"
								value={newRecordInput.date}
								onChange={handleDate}
								renderInput={(params) => <TextField {...params} />}
							/>
						</LocalizationProvider>
						{/* Amount text field */}
						<FormControl>
							<InputLabel htmlFor="amount">Amount</InputLabel>
							<OutlinedInput
								id="amount"
								label="Amount"
								value={newRecordInput.amount}
								onChange={handleAmount}
								startAdornment={<InputAdornment position="start">$</InputAdornment>}
							/>
						</FormControl>
						{/* Detail text field */}
						<TextField id="detail" label="Detail" variant="outlined" sx={{ width: "100%" }} value={newRecordInput.detail} onChange={handleDetail} />
						<p style={{ textAlign: "right" }}>{newRecordInput.detailCharacterCount}/50 characters left</p>
						{/* Note text field */}
						<TextField label="Note" multiline minRows={5} value={newRecordInput.note} onChange={handleNote} />
						<p style={{ textAlign: "right" }}>{newRecordInput.noteCharacterCount}/200 characters left</p>
					</Stack>
				</Box>
			</DialogContent>
			<DialogActions>
                <StyledButton variant="contained" sx={{ fontSize: "1rem", width: "8rem", height: "3rem" }} onClick={handleCreateRecord}>Create</StyledButton>
			</DialogActions>
		</Dialog>
	);
};

export default IncomeExpenseCreationModal;
