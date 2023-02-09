/** @format */

import React, { useState } from "react";
import styles from "./TransactionRow.module.css";
import icon from "../assets/money.svg";
import { useCurrentUserContext, IncomeExpense } from "../context/currentUserContext";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TransactionEditModal from "./TransactionEditModal";
import { intToCurrencyString } from "../utilities/utilityFunctions";

/* ====================================================
// Type Declaration
==================================================== */
interface TransactionRowProps {
	record: IncomeExpense;
	recordType: "Income" | "Expenses";
}

const TransactionRow = ({ record, recordType }: TransactionRowProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { categories } = useCurrentUserContext();

	/* ====================================================
    // JSX to Display For Every Transaction Under Given Date
    ==================================================== */

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
	let amountToDisplay = recordType === "Income" ? `$${intToCurrencyString(record.amount)}` : `-$${intToCurrencyString(record.amount)}`;

	// /* ====================================================
	// // Handle transaction update modal
	// ==================================================== */

	const [openModal, setOpenModal] = useState<boolean>(false);

	// Opens dialog
	const handleClickOpen = () => {
		setOpenModal(true);
	};

	// Closes dialog
	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<div className={styles.rowContainer}>
			<img src={icon} alt="icon" />
			<div className={styles.rowInfo}>
				<h3>{record.detail}</h3>
				<p>{categoryName}</p>
			</div>
			<div className={styles.rowAmount}>
				<h3>{amountToDisplay}</h3>
			</div>
			<IconButton onClick={handleClickOpen}>
				<EditIcon fontSize="large" />
			</IconButton>
			{/* Form dialog for edit of record - opens on click of edit button */}
			<TransactionEditModal openModal={openModal} handleClose={handleClose} record={record} categoryRecord={categoryRecord} recordType={recordType} />
		</div>
	);
};

export default TransactionRow;
