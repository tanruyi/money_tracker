/** @format */

import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useCurrentUserContext, IncomeExpense, Category } from "../context/currentUserContext";
import { updateIncomeAPI, deleteIncomeAPI } from "../apis/income";
import { updateExpenseAPI, deleteExpenseAPI } from "../apis/expenses";
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
	date: Dayjs;
	categoryId: number;
	amount: number | undefined;
	detail: string;
	note: string;
}

interface IncomeExpenseEditModalProps {
	openModal: boolean;
	handleClose: () => void;
	record: IncomeExpense;
	categoryRecord: Category;
	displayRecord: string;
}

const IncomeExpenseEditModal = ({ openModal, handleClose, record, categoryRecord, displayRecord }: IncomeExpenseEditModalProps) => {
	console.log("IncomeExpenseEditModal record:", record);
	/* ====================================================
	// Context
	==================================================== */

	const { currentUser, categories, refreshData } = useCurrentUserContext();

	/* ====================================================
    // Edit record modal
    ==================================================== */

	const [error, setError] = useState<any>();

	// Controls inputs
	const [newRecordInput, setNewRecordInput] = useState<newRecordInputState>({
		recordType: displayRecord,
		recordId: categoryRecord.recordId,
		categoryName: categoryRecord.categoryName,
		categoryId: record.categoryId,
		date: record.date,
		amount: String(record.amount),
		detail: record.detail,
		detailCharacterCount: record.detail.length,
		note: record.note,
		noteCharacterCount: record.note.length,
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

	// Runs on click of update button
	const handleUpdateRecord = async () => {
		const id = record.id;

		let data: newRecordData = {
			date: newRecordInput.date,
			categoryId: newRecordInput.categoryId,
			amount: Number(newRecordInput.amount),
			detail: newRecordInput.detail,
			note: newRecordInput.note,
		};

		if (id || data.date || data.categoryId || data.amount) {
			if (newRecordInput.recordType === "Income") {
				try {
					const response = await updateIncomeAPI(id, data, currentUser.accessToken);

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
			} else if (newRecordInput.recordType === "Expenses") {
				try {
					const response = await updateExpenseAPI(id, data, currentUser.accessToken);

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
		}
	};

	const handleDeleteRecord = async () => {
		const requestBody = {
			data: {
				id: record.id,
			},
		};

		if (newRecordInput.recordType === "Income") {
			try {
				const response = await deleteIncomeAPI(requestBody, currentUser.accessToken);

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
		} else if (newRecordInput.recordType === "Expenses") {
			try {
				const response = await deleteExpenseAPI(requestBody, currentUser.accessToken);

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
			<DialogTitle>Edit Income or Expense Record</DialogTitle>
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
						<p>{newRecordInput.detailCharacterCount}/50</p>
						{/* Note text field */}
						<TextField label="Note" multiline minRows={5} value={newRecordInput.note} onChange={handleNote} />
						<p>{newRecordInput.noteCharacterCount}/200</p>
					</Stack>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" size="large" onClick={handleUpdateRecord}>
					Update
				</Button>
				<Button variant="contained" size="large" onClick={handleDeleteRecord}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default IncomeExpenseEditModal;
