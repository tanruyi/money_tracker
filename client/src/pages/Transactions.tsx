/** @format */

import React, { useState } from "react";
import styles from "./Transactions.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import StyledButton from "../components/styledMUI/Button";
import StyledToggleButton from "../components/styledMUI/ToggleButton";
import TransactionRows from "../components/TransactionRows";
dayjs.extend(isBetween);

const Transactions = () => {
	/* ====================================================
    // Record to display
    ==================================================== */

	const [recordType, setRecordType] = useState<"Income" | "Expenses">("Income");
	const [periodType, setPeriodType] = useState<"Monthly" | "YTD">("Monthly");

	function handleRecordTypeChange(e: React.MouseEvent<HTMLElement>, newRecordType: "Income" | "Expenses") {
		if (newRecordType !== null) {
			setRecordType(newRecordType);
		}
	}

	function handlePeriodTypeChange(e: React.MouseEvent<HTMLElement>, newPeriodType: "Monthly" | "YTD") {
		if (newPeriodType !== null) {
			setPeriodType(newPeriodType);
		}
	}

	/* ====================================================
    // Date to display
    ==================================================== */

	// This is the dayjs object for today's date
	const [dateToDisplay, setDateToDisplay] = useState(dayjs());

	const handleBackArrow = () => {
		if (periodType === "Monthly") {
			setDateToDisplay((prevState) => prevState.subtract(1, "month"));
		} else if (periodType === "YTD") {
			setDateToDisplay((prevState) => prevState.subtract(1, "year"));
		}
	};

	const handleForwardArrow = () => {
		if (periodType === "Monthly") {
			setDateToDisplay((prevState) => prevState.add(1, "month"));
		} else if (periodType === "YTD") {
			setDateToDisplay((prevState) => prevState.add(1, "year"));
		}
	};

	/* ====================================================
    // Handle HTML text to display for title
    ==================================================== */
	let dateHeader = "";

	if (periodType === "Monthly") {
		dateHeader = dateToDisplay.format("MMM YYYY");
	} else if (periodType === "YTD") {
		dateHeader = `Year ${dateToDisplay.year()}`;
	}

	return (
		<div className={styles.transactionsContainer}>
			<div className={styles.transactionsPeriodDisplay}>
				{/* To change info displayed to previous month or year */}
				<IconButton sx={{ color: "var(--pink)", height: "3rem", width: "3rem", marginRight: "1rem" }} onClick={handleBackArrow}>
					<ArrowBackIosNewIcon />
				</IconButton>

				<h1>{dateHeader}</h1>
				{/* To change info displayed to next month or year */}
				<IconButton sx={{ color: "var(--pink)", height: "3rem", width: "3rem", marginLeft: "1rem" }} onClick={handleForwardArrow}>
					<ArrowForwardIosIcon />
				</IconButton>
			</div>
			<div className={styles.transactionsToggleButtonsContainer}>
				<ToggleButtonGroup exclusive value={recordType} onChange={handleRecordTypeChange}>
					<StyledToggleButton value="Income">Income</StyledToggleButton>
					<StyledToggleButton value="Expenses">Expenses</StyledToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup exclusive value={periodType} onChange={handlePeriodTypeChange}>
					<StyledToggleButton value="Monthly">Monthly</StyledToggleButton>
					<StyledToggleButton value="YTD">YTD</StyledToggleButton>
				</ToggleButtonGroup>
			</div>
			<div className={styles.transactionHeaderContainer}>
				<h2 className={styles.transactionHeader}>Transactions</h2>
				<StyledButton variant="contained" sx={{ fontSize: "1rem" }}>
					Create transaction
				</StyledButton>
			</div>
			<TransactionRows />
		</div>
	);
};

export default Transactions;
