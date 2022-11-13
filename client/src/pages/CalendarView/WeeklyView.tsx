/** @format */

import React, { useState } from "react";
import styles from "./View.module.css";
import { useCurrentUserContext } from "../../context/currentUserContext";
import dayjs from "dayjs";
import { intToCurrencyString } from "../../utilities/utilityFunctions";
import IncomeExpenseDashboard from "../../components/IncomeExpenseDashboard";
import IncomeExpenseTab from "../../components/IncomeExpenseTab";
import IncomeExpenseRow from "../../components/IncomeExpenseRow";

/* ====================================================
// Type Declaration
==================================================== */

interface WeeklyViewProps {
	currentViewPage: "Daily" | "Weekly" | "Monthly" | "YTD";
}

const WeeklyView = ({ currentViewPage }: WeeklyViewProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { incomeRecords, expenseRecords } = useCurrentUserContext();

	/* ====================================================
    // Income or expense to be displayed
    ==================================================== */
	const [displayRecord, setDisplayRecord] = useState<"Income" | "Expenses">("Income");

	const changeDisplayRecord = (type: "Income" | "Expenses") => {
		setDisplayRecord(type);
	};

	/* ====================================================
    // Date, month & year for display
    ==================================================== */

	// This is the dayjs object for today's date
	const [dateToDisplay, setDateToDisplay] = useState(dayjs());

	const handleBackArrow = () => {
		setDateToDisplay((prevState) => prevState.subtract(1, "week"));
	};

	const handleForwardArrow = () => {
		setDateToDisplay((prevState) => prevState.add(1, "week"));
	};

	/* ====================================================
    // Filtered Income Records for Month to Display
    ==================================================== */

	// Filter income records to those with mth & yr we want to display
	let incomeRecordsToDisplay = incomeRecords.filter((record) => {
		const dateToCompare = dayjs(record.date);

		return dateToDisplay.isSame(dateToCompare, "week");
	});

	/* ====================================================
    // Total Income for Displayed Date
    ==================================================== */

	let totalIncome = 0;

	for (let i = 0; i < incomeRecordsToDisplay.length; i++) {
		totalIncome += Number(incomeRecordsToDisplay[i].amount);
	}

	// this will be displayed in HTML
	const totalIncomeString = intToCurrencyString(totalIncome);

	/* ====================================================
    // List of Dates with Income Records for Displayed Date
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
    // Filtered Expense Records for Date to Display
    ==================================================== */

	// Filter expense records to those with mth & yr we want to display
	let expenseRecordsToDisplay = expenseRecords.filter((record) => {
		const dateToCompare = dayjs(record.date);

		return dateToDisplay.isSame(dateToCompare, "week");
	});

	/* ====================================================
    // Total Expenses for Displayed Date
    ==================================================== */

	let totalExpenses = 0;

	if (expenseRecordsToDisplay.length > 0) {
		for (let i = 0; i < expenseRecordsToDisplay.length; i++) {
			totalExpenses += Number(expenseRecordsToDisplay[i].amount);
		}
	}

	const totalExpensesString = intToCurrencyString(totalExpenses);

	/* ====================================================
    // List of Dates with Expense Records for Displayed Date
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
				currentViewPage={currentViewPage}
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

export default WeeklyView;
