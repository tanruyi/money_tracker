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

	const { currentUserId, categories, incomeRecords, expenseRecords, refreshData } = useCurrentUserContext();

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

	// Set year to display to current year by default
	const [yearToDisplay, setYearToDisplay] = useState(dayjs().year());

	// Set month to display to current month by default
	const [monthToDisplay, setMonthToDisplay] = useState(dayjs().month() + 1);

	/* ====================================================
    // Filtered Income Records for Month to Display
    ==================================================== */

	// Filter income records to those with mth & yr we want to display
	let incomeRecordsToDisplay = incomeRecords.filter((record) => {
		const recordYear = dayjs(record.date).get("year");
		const recordMonth = dayjs(record.date).get("month") + 1;
		return recordYear === yearToDisplay && recordMonth === monthToDisplay;
	});

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

    const incomeRecordRows = datesWithIncomeRecords.map((date, index) => (
        <IncomeExpenseRow key={index} date={date} incomeRecordsToDisplay={incomeRecordsToDisplay} displayRecord={displayRecord} />
    ));

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

	return (
		<div>
			<IncomeExpenseDashboard totalIncomeString={totalIncomeString} totalExpensesString={totalExpensesString} />
			<IncomeExpenseTab changeDisplayRecord={changeDisplayRecord} />
			<div className={styles.rowsContainer}>
				{incomeRecordRows}
			</div>
		</div>
	);
};

export default MonthlyView;
