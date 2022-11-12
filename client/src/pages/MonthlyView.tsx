/** @format */

import React, { useState } from "react";
import styles from "./MonthlyView.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import dayjs from "dayjs";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import IncomeExpenseDashboard from "../components/IncomeExpenseDashboard";
import IncomeExpenseTab from "../components/IncomeExpenseTab";
import IncomeExpenseRow from "../components/IncomeExpenseRow";

const MonthlyView = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { incomeRecords, expenseRecords } = useCurrentUserContext();

	/* ====================================================
    // Income or expense to be displayed
    ==================================================== */
	const [displayRecord, setDisplayRecord] = useState<string>("Income");

	const changeDisplayRecord = (type: string) => {
		setDisplayRecord(type);
	};

	/* ====================================================
    // Month & year for display
    ==================================================== */

	const [dateToDisplay, setDateToDisplay] = useState(dayjs());

	// Set year to display to current year by default
	const [yearToDisplay, setYearToDisplay] = useState(dayjs().year());

	// Set month to display to current month by default
	const [monthToDisplay, setMonthToDisplay] = useState(dayjs().month());

	const handleBackArrow = () => {
		setDateToDisplay((prevState) => prevState.subtract(1, "month"));
		setYearToDisplay(dateToDisplay.year());
		setMonthToDisplay(dateToDisplay.month());
	};

	const handleForwardArrow = () => {
		setDateToDisplay((prevState) => prevState.add(1, "month"));
		setYearToDisplay(dateToDisplay.year());
		setMonthToDisplay(dateToDisplay.month());
	};

	/* ====================================================
    // Filtered Income Records for Month to Display
    ==================================================== */

	// Filter income records to those with mth & yr we want to display
	// let incomeRecordsToDisplay = incomeRecords.filter((record) => {
	// 	console.log("incomeRecordsToDisplay...");
	// 	const dateToCompare = dayjs(record.date);
	// 	const recordYear = dateToCompare.year();
	// 	console.log("recordYear: ", recordYear);
	// 	const recordMonth = dateToCompare.month();
	// 	console.log("recordMonth", recordMonth);
	// 	return recordYear === yearToDisplay && recordMonth === monthToDisplay;
	// });

	let incomeRecordsToDisplay: any[] = [];

	for (let i = 0; i < incomeRecords.length; i++) {
		const dateToCompare = dayjs(incomeRecords[i].date);
		const recordYear = dateToCompare.year();
		const recordMonth = dateToCompare.month();

		if (recordYear === yearToDisplay && recordMonth === monthToDisplay) {
			incomeRecordsToDisplay.push(incomeRecords[i]);
		}
	}

	console.log("dateToDisplay: ", dateToDisplay);
	console.log("incomeRecordsToDisplay: ", incomeRecordsToDisplay);

	/* ====================================================
    // Total Income for Displayed Month
    ==================================================== */

	let totalIncome = 0;

	for (let i = 0; i < incomeRecordsToDisplay.length; i++) {
		totalIncome += Number(incomeRecordsToDisplay[i].amount);
	}

	// this will be displayed in HTML
	const totalIncomeString = intToCurrencyString(totalIncome);

	/* ====================================================
    // List of Dates with Income Records for Displayed Month
    ==================================================== */

	const datesWithIncomeRecordsSet = new Set();

	for (let i = 0; i < incomeRecordsToDisplay.length; i++) {
		datesWithIncomeRecordsSet.add(incomeRecordsToDisplay[i].date);
	}

	const datesWithIncomeRecords = Array.from(datesWithIncomeRecordsSet);

	/* ====================================================
    // Income Rows to Display
    ==================================================== */

	const incomeRecordRows = datesWithIncomeRecords.map((date, index) => <IncomeExpenseRow key={index} date={date} recordsToDisplay={incomeRecordsToDisplay} displayRecord={displayRecord} />);

	/* ====================================================
    // Filtered Expense Records for Month to Display
    ==================================================== */

	// Filter expense records to those with mth & yr we want to display
	let expenseRecordsToDisplay = expenseRecords.filter((record) => {
		const recordYear = dayjs(record.date).get("year");
		const recordMonth = dayjs(record.date).get("month") + 1;
		return recordYear === yearToDisplay && recordMonth === monthToDisplay;
	});

	/* ====================================================
    // Total Expenses for Displayed Month
    ==================================================== */

	let totalExpenses = 0;

	if (expenseRecordsToDisplay.length > 0) {
		for (let i = 0; i < expenseRecordsToDisplay.length; i++) {
			totalExpenses += Number(expenseRecordsToDisplay[i].amount);
		}
	}

	const totalExpensesString = intToCurrencyString(totalExpenses);

	/* ====================================================
    // List of Dates with Expense Records for Displayed Month
    ==================================================== */

	const datesWithExpenseRecordsSet = new Set();

	for (let i = 0; i < expenseRecordsToDisplay.length; i++) {
		datesWithExpenseRecordsSet.add(expenseRecordsToDisplay[i].date);
	}

	const datesWithExpenseRecords = Array.from(datesWithExpenseRecordsSet);

	/* ====================================================
    // Expense Rows to Display
    ==================================================== */

	const expenseRecordRows = datesWithExpenseRecords.map((date, index) => <IncomeExpenseRow key={index} date={date} recordsToDisplay={expenseRecordsToDisplay} displayRecord={displayRecord} />);

	return (
		<div>
			<IncomeExpenseDashboard
				dateToDisplay={dateToDisplay}
				totalIncomeString={totalIncomeString}
				totalExpensesString={totalExpensesString}
				handleBackArrow={handleBackArrow}
				handleForwardArrow={handleForwardArrow}
			/>
			<IncomeExpenseTab displayRecord={displayRecord} changeDisplayRecord={changeDisplayRecord} />
			<div className={styles.rowsContainer}>{displayRecord === "Income" ? incomeRecordRows : expenseRecordRows}</div>
		</div>
	);
};

export default MonthlyView;
