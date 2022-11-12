/** @format */

import React, { useState } from "react";
import styles from "./IncomeExpenseDashboard.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

const IncomeExpenseDashboard = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { currentUserId, incomeRecords, expenseRecords } = useCurrentUserContext();

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
			<Fab sx={{ margin: "0 48.8vw", bgcolor: "#66fcf1" }}>
				<AddIcon />
			</Fab>
		</div>
	);
};

export default IncomeExpenseDashboard;
