/** @format */

import React, { useState } from "react";
import styles from "./IncomeExpenseDashboard.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import { Fab, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, InputAdornment, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs, { Dayjs } from "dayjs";
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
	date: Dayjs;
	amount: number | undefined;
	detail: string;
	detailCharacterCount: number;
	note: string;
	noteCharacterCount: number;
}

const IncomeExpenseDashboard = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { currentUserId, categories, incomeRecords, expenseRecords } = useCurrentUserContext();

	/* ====================================================
    // Month & year for display
    ==================================================== */

	// Set year to display to current year by default
	const [yearToDisplay, setYearToDisplay] = useState(dayjs().year());

	// Set month to display to current month by default
	const [monthToDisplay, setMonthToDisplay] = useState(dayjs().month() + 1);

	/* ====================================================
    // Total Income for Displayed Month
    ==================================================== */

	// Filter income records to those with mth & yr we want to display
	let incomeRecordsToDisplay = incomeRecords.filter((record) => {
		const recordYear = dayjs(record.date).get("year");
		const recordMonth = dayjs(record.date).get("month") + 1;
		return recordYear === yearToDisplay && recordMonth === monthToDisplay;
	});

	let totalIncome = 0;

	for (let i = 0; i < incomeRecordsToDisplay.length; i++) {
		totalIncome += Number(incomeRecordsToDisplay[i].amount);
	}

	// this will be displayed in HTML
	const totalIncomeString = intToCurrencyString(totalIncome);

	/* ====================================================
    // Total Expenses for Displayed Month
    ==================================================== */

	// Filter expense records to those with mth & yr we want to display
	let expenseRecordsToDisplay = expenseRecords.filter((record) => {
		const recordYear = dayjs(record.date).get("year");
		const recordMonth = dayjs(record.date).get("month") + 1;
		return recordYear === yearToDisplay && recordMonth === monthToDisplay;
	});

	let totalExpenses = 0;

	if (expenseRecordsToDisplay.length > 0) {
		for (let i = 0; i < expenseRecordsToDisplay.length; i++) {
			totalExpenses += Number(expenseRecordsToDisplay[i].amount);
		}
	}

	const totalExpensesString = intToCurrencyString(totalExpenses);

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

	// Controls inputs
	const [newRecordInput, setNewRecordInput] = useState<newRecordInputState>({
		recordType: "",
		recordId: 0,
		categoryName: "",
		date: dayjs(),
		amount: undefined,
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
		setNewRecordInput((prevState) => {
			return {
				...prevState,
				categoryName: e.target.value,
			};
		});
	};

	const handleDate = (e: any) => {
		setNewRecordInput((prevState) => {
			return {
				...prevState,
				date: e.target.value,
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
	const handleCreateRecord = async () => {};

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
		<div className={styles.container}>
			<div className={styles.dashboard}>
				<div className={styles.dashboardHeader}>
					<h1>This Month's View</h1>
					<div className={styles.dashboardInfo}>
						{/* Split the dashboard info to 2 columns displayed side by side */}
						<div className={styles.dashboardInfoColumn}>
							<h3>Expenses for this month: </h3>
							<h1>${totalExpensesString}</h1>
							<h4>You are over-budget!</h4>
						</div>
						<div className={styles.dashboardInfoColumn}>
							<h3>Income for this month: ${totalIncomeString}</h3>
							<h3>Budget left: $(-21.46)</h3>
						</div>
					</div>
				</div>
			</div>
			{/* Create new record button */}
			<Fab sx={{ margin: "0 48.8vw", bgcolor: "#66fcf1" }} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			{/* Form dialog for new record - opens on click of new record button */}
			<Dialog open={openModal} fullWidth onClose={handleClose} sx={{ marginLeft: "auto", marginRight: "auto" }}>
				<DialogTitle>Create Category</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ marginTop: "1rem" }}>
						<Stack spacing={3}>
							{/* Dropdown for record type */}
							<FormControl>
								<InputLabel htmlFor="income-or-expense">Record Type</InputLabel>
								<Select value={newRecordInput.recordType} onChange={handleRecordType} input={<OutlinedInput label="Record Type" id="income-or-expense" />}>
									<MenuItem value={"Income"}>Income</MenuItem>
									<MenuItem value={"Expenses"}>Expenses</MenuItem>
								</Select>
							</FormControl>
							{/* Dropdown for category name */}
							<FormControl>
								<InputLabel htmlFor="categoryName">Category Name</InputLabel>
								<Select value={newRecordInput.categoryName} onChange={handleCategoryName} input={<OutlinedInput label="Category Name" id="categoryName" />}>
									{categoryNamesToDisplay}
								</Select>
							</FormControl>
							{/* Date picker */}
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DesktopDatePicker label="date" inputFormat="DD/MM/YYYY" value={newRecordInput.date} onChange={handleDate} renderInput={(params) => <TextField {...params} />} />
							</LocalizationProvider>
							{/* Amount text field */}
							<FormControl>
								<InputLabel htmlFor="amount">Amount</InputLabel>
								<OutlinedInput id="amount" label="Amount" value={newRecordInput.amount} onChange={handleAmount} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
							</FormControl>
							{/* Detail text field */}
							<TextField id="detail" label="etail" variant="outlined" sx={{ width: "100%" }} value={newRecordInput.detail} onChange={handleDetail} />
							<p>{newRecordInput.detailCharacterCount}/50</p>
							{/* Note text field */}
							<TextField label="Note" multiline minRows={5} value={newRecordInput.note} onChange={handleNote} />
							<p>{newRecordInput.noteCharacterCount}/200</p>
						</Stack>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" size="large" onClick={handleCreateRecord}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default IncomeExpenseDashboard;
