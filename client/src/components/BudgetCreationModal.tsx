/** @format */

import { useState } from "react";
import { useCurrentUserContext } from "../context/currentUserContext";
import { createBudgetAPI } from "../apis/budget";
import {
	Box,
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
import dayjs, { Dayjs } from "dayjs";
import isSameOfAfter from "dayjs/plugin/isSameOrAfter";
import StyledButton from "../styledMUI/Button";
dayjs.extend(isSameOfAfter);

/* ====================================================
// Type Declaration
==================================================== */

interface newBudgetInputState {
	recordType: string;
	recordId: number;
	categoryName: string;
	categoryId: number;
	startMonth: any;
	endMonth: any;
	amount: string;
}

interface newBudgetData {
	userId: number;
	categoryId: number;
	amount: number | undefined;
	recordId: number;
	startMonth: Dayjs;
	endMonth: Dayjs;
}

interface BudgetCreationModalProps {
	openModal: boolean;
	handleClose: () => void;
}

const BudgetCreationModal = ({ openModal, handleClose }: BudgetCreationModalProps) => {
	/* ====================================================
	// Context
	==================================================== */

	const { currentUser, categories, refreshData } = useCurrentUserContext();

	/* ====================================================
    // Error State
    ==================================================== */

	const [error, setError] = useState<any>();

	/* ====================================================
    // Controlled inputs
    ==================================================== */
	const [newBudgetInput, setNewBudgetInput] = useState<newBudgetInputState>({
		recordType: "",
		recordId: 0,
		categoryName: "",
		categoryId: 0,
		startMonth: dayjs(),
		endMonth: dayjs(),
		amount: "",
	});

	const handleRecordType = (e: any) => {
		setNewBudgetInput((prevState) => {
			return {
				...prevState,
				recordType: e.target.value,
			};
		});

		if (e.target.value === "Income") {
			setNewBudgetInput((prevState) => {
				return {
					...prevState,
					recordId: 1,
				};
			});
		} else if (e.target.value === "Expenses") {
			setNewBudgetInput((prevState) => {
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

		setNewBudgetInput((prevState) => {
			return {
				...prevState,
				categoryName: e.target.value,
				categoryId: categoryId,
			};
		});
	};

	const handleStartMonth = (newDate: Dayjs | null) => {
		setNewBudgetInput((prevState) => {
			return {
				...prevState,
				startMonth: newDate,
			};
		});
	};

	const handleEndMonth = (newDate: Dayjs | null) => {
		const after = newDate?.isSameOrAfter(newBudgetInput.startMonth);

		if (after === true) {
			setNewBudgetInput((prevState) => {
				return {
					...prevState,
					endMonth: newDate,
				};
			});
		} else {
			window.alert("End month must be same or after start month.");
		}
	};

	const handleAmount = (e: any) => {
		setNewBudgetInput((prevState) => {
			return {
				...prevState,
				amount: e.target.value,
			};
		});
	};

	/* ====================================================
    // Runs on click of create button
    ==================================================== */
	const handleCreateRecord = async () => {
		let data: newBudgetData = {
			userId: currentUser.id,
			categoryId: newBudgetInput.categoryId,
			amount: Number(newBudgetInput.amount),
			recordId: newBudgetInput.recordId,
			startMonth: newBudgetInput.startMonth,
			endMonth: newBudgetInput.endMonth,
		};

		if (data.userId || data.categoryId || data.amount || data.recordId || data.startMonth || data.endMonth) {
			try {
				const response = await createBudgetAPI(data, currentUser.accessToken);

				// Refreshes the data on page
				refreshData();

				// Close modal upon successful update
				handleClose();

				// Clear submitted info from state after creation
				setNewBudgetInput({
					recordType: "",
					recordId: 0,
					categoryName: "",
					categoryId: 0,
					startMonth: dayjs(),
					endMonth: dayjs(),
					amount: "",
				});
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

	const categoryNamesForSelection = categories.filter((category) => category.recordId === newBudgetInput.recordId);

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
			<DialogTitle sx={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif", paddingTop: "2rem", color: "var(--purple)", fontSize: "1.5rem" }}>
				Create Budget Record
			</DialogTitle>
			<DialogContent>
				<Box component="form" sx={{ marginTop: "1rem" }}>
					<Stack spacing={3}>
						{/* Dropdown for record type */}
						<FormControl>
							<InputLabel htmlFor="income-or-expense">Record Type</InputLabel>
							<Select
								value={newBudgetInput.recordType}
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
								value={newBudgetInput.categoryName}
								onChange={handleCategoryName}
								input={<OutlinedInput label="Category Name" id="categoryName" />}
							>
								{categoryNamesToDisplay}
							</Select>
						</FormControl>
						{/* Date picker */}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DesktopDatePicker
								label="Start Month"
								views={["year", "month"]}
								value={newBudgetInput.startMonth}
								onChange={handleStartMonth}
								renderInput={(params) => <TextField {...params} helperText={null} />}
							/>
							<DesktopDatePicker
								label="End Month"
								views={["year", "month"]}
								value={newBudgetInput.endMonth}
								onChange={handleEndMonth}
								renderInput={(params) => <TextField {...params} helperText={null} />}
							/>
						</LocalizationProvider>
						{/* Amount text field */}
						<FormControl>
							<InputLabel htmlFor="amount">Monthly Amount</InputLabel>
							<OutlinedInput
								id="amount"
								label="Monthly Amount"
								value={newBudgetInput.amount}
								onChange={handleAmount}
								startAdornment={<InputAdornment position="start">$</InputAdornment>}
							/>
						</FormControl>
					</Stack>
				</Box>
			</DialogContent>
			{/* Create button */}
			<DialogActions>
				<StyledButton variant="contained" sx={{ fontSize: "1rem", width: "8rem", height: "3rem" }} onClick={handleCreateRecord}>
					Create
				</StyledButton>
			</DialogActions>
		</Dialog>
	);
};

export default BudgetCreationModal;
