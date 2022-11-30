/** @format */

import React, { useState } from "react";
import styles from "./IncomeExpenseRow.module.css";
import icon from "../assets/money.svg";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import IncomeExpenseEditModal from "./IncomeExpenseEditModal";
import { useCurrentUserContext, IncomeExpense } from "../context/currentUserContext";

/* ====================================================
// Type Declaration
==================================================== */

interface IncomeExpenseRowProps {
	date: any;
	recordsToDisplay: IncomeExpense[];
	displayRecord: "Income" | "Expenses";
}

const IncomeExpenseRow = ({ date, recordsToDisplay, displayRecord }: IncomeExpenseRowProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { categories } = useCurrentUserContext();

	/* ====================================================
    // Row Header - Date
    ==================================================== */

	const dateHeader = dayjs(date).format("DD MMM YYYY");

	/* ====================================================
    // Handle category creation modal
    ==================================================== */

	const [openModal, setOpenModal] = useState<boolean>(false);

	// Opens dialog
    const handleClickOpen = () => {
        console.log("handleClickOpen run...")
		setOpenModal(true);
	};

	// Closes dialog
	const handleClose = () => {
		setOpenModal(false);
	};

	/* ====================================================
    // Row Expense Line HTML Component
    ==================================================== */

	// Filter records to those that match the date to be displayed
	const recordsForDate = recordsToDisplay.filter((record) => record.date === date);

	// Create HTML component for each line of record
	const recordsLines = recordsForDate.map((record) => {
		// Get the category name for categoryId given
		let categoryRecord: any;

		for (let i = 0; i < categories.length; i++) {
			if (categories[i].id === record.categoryId) {
				categoryRecord = categories[i];
				break;
			}
			continue;
		}

		const categoryName = categoryRecord.categoryName;

		// This is the amount to display, will show "-" sign if expenses
		let amountToDisplay = `$${intToCurrencyString(record.amount)}`;

		if (displayRecord === "Expenses") {
			amountToDisplay = `-$${intToCurrencyString(record.amount)}`;
		}

		return (
			<div className={styles.rowContainer}>
				<div className={styles.rowIcon}>
					<img src={icon} alt="icon" />
				</div>
				<div className={styles.rowInfo}>
					<h2>{record.detail}</h2>
					<h3>{categoryName}</h3>
				</div>
				<div className={styles.rowAmount}>
					<h2>{amountToDisplay}</h2>
				</div>
				<div className={styles.rowButton}>
					<IconButton onClick={handleClickOpen}>
						<EditIcon fontSize="large" />
					</IconButton>
					{/* Form dialog for edit of record - opens on click of edit button */}
					<IncomeExpenseEditModal
						openModal={openModal}
						handleClose={handleClose}
						record={record}
						categoryRecord={categoryRecord}
						displayRecord={displayRecord}
					/>
				</div>
			</div>
		);
	});

	/* ====================================================
    // Row Header - Date
    ==================================================== */

	// This is the total amount to display, will show "-" sign if expenses
	let totalAmountForDate = 0;

	for (let i = 0; i < recordsForDate.length; i++) {
		totalAmountForDate += Number(recordsForDate[i].amount);
	}

	let totalAmountForDateString = `$${intToCurrencyString(totalAmountForDate)}`;

	if (displayRecord === "Expenses") {
		totalAmountForDateString = `-$${intToCurrencyString(totalAmountForDate)}`;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{dateHeader}</h1>
				<h1>{totalAmountForDateString}</h1>
			</div>

			{recordsLines}
		</div>
	);
};

export default IncomeExpenseRow;
