/** @format */

import React, { useState } from "react";
import styles from "./IncomeExpenseRow.module.css";
import icon from "../assets/cocoa.png";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import { Income } from "../context/currentUserContext";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import IncomeExpenseEditModal from "./IncomeExpenseEditModal";
import { useCurrentUserContext } from "../context/currentUserContext";

/* ====================================================
// Type Declaration
==================================================== */

interface IncomeExpenseRowProps {
	date: any;
	incomeRecordsToDisplay: Income[];
	displayRecord: string;
}

const IncomeExpenseRow = ({ date, incomeRecordsToDisplay, displayRecord }: IncomeExpenseRowProps) => {
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
		setOpenModal(true);
	};

	// Closes dialog
	const handleClose = () => {
		setOpenModal(false);
	};

	/* ====================================================
    // Handle Click on Edit Button
    ==================================================== */

	/* ====================================================
    // Row Expense Line HTML Component
    ==================================================== */

	const incomeRecordsForDate = incomeRecordsToDisplay.filter((record) => record.date === date);

	const incomeRecordsLines = incomeRecordsForDate.map((record) => {
		// const categoryRecord = categories.find((category) => category.id === record.categoryId);

		let categoryRecord: any;

		for (let i = 0; i < categories.length; i++) {
			if (categories[i].id === record.categoryId) {
				categoryRecord = categories[i];
				break;
			}
			continue;
		}

		const categoryName = categoryRecord.categoryName;

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
					<h2>-${intToCurrencyString(record.amount)}</h2>
				</div>
				<div className={styles.rowButton}>
					<IconButton onClick={handleClickOpen}>
						<EditIcon fontSize="large" />
					</IconButton>
					{/* Form dialog for edit of record - opens on click of edit button */}
					<IncomeExpenseEditModal openModal={openModal} handleClose={handleClose} record={record} categoryRecord={categoryRecord} displayRecord={displayRecord} />
				</div>
			</div>
		);
	});

	/* ====================================================
    // Row Header - Date
    ==================================================== */
	let totalAmountForDate = 0;

	for (let i = 0; i < incomeRecordsForDate.length; i++) {
		totalAmountForDate += incomeRecordsForDate[i].amount;
	}

	const totalAmountForDateString = intToCurrencyString(totalAmountForDate);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h1>{dateHeader}</h1>
				<h1>${totalAmountForDateString}</h1>
			</div>

			{incomeRecordsLines}
		</div>
	);
};

export default IncomeExpenseRow;
