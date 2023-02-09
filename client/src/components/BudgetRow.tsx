/** @format */

import { useState } from "react";
import styles from "./BudgetRow.module.css";
import icon from "../assets/money.svg";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import { useCurrentUserContext, Budget } from "../context/currentUserContext";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import BudgetEditModal from "./BudgetEditModal";

/* ====================================================
// Type Declaration
==================================================== */

interface BudgetRowProps {
	record: Budget;
	type: string;
}

const BudgetRow = ({ record, type }: BudgetRowProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { categories } = useCurrentUserContext();

	/* ====================================================
    // Handle budget creation modal
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
    // Text to display in row
    ==================================================== */

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

	if (type === "Expenses") {
		amountToDisplay = `-$${intToCurrencyString(record.amount)}`;
	}

	const startMonthToDisplay = dayjs(record.startMonth).format("MMM YYYY");
	const endMonthToDisplay = dayjs(record.endMonth).format("MMM YYYY");

	return (
		<div className={styles.rowContainer}>
			{/* Icon */}
			<img src={icon} alt="icon" />
			{/* Category name & budget period */}
			<div className={styles.rowInfo}>
				<h3>{categoryName}</h3>
				<p>
					{startMonthToDisplay} - {endMonthToDisplay}
				</p>
			</div>
			{/* Budget amount */}
			<div className={styles.rowAmount}>
				<h3>{amountToDisplay}</h3>
			</div>
			{/* Edit button */}
			<IconButton onClick={handleClickOpen}>
				<EditIcon fontSize="large" />
			</IconButton>
			{/* Form dialog for edit of record - opens on click of edit button */}
			<BudgetEditModal openModal={openModal} handleClose={handleClose} record={record} categoryRecord={categoryRecord} type={type} />
		</div>
	);
};

export default BudgetRow;
