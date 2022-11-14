/** @format */

import React, { useState } from "react";
import styles from "./View.module.css";
import { useCurrentUserContext } from "../../context/currentUserContext";
import dayjs from "dayjs";
import { intToCurrencyString } from "../../utilities/utilityFunctions";
import IncomeExpenseDashboard from "../../components/IncomeExpenseDashboard";
import IncomeExpenseRow from "../../components/IncomeExpenseRow";

/* ====================================================
// Type Declaration
==================================================== */

interface YTDViewProps {
	currentViewPage: "Daily" | "Weekly" | "Monthly" | "YTD";
}

const YTDView = ({ currentViewPage }: YTDViewProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { incomeRecords, expenseRecords, budgets } = useCurrentUserContext();

	/* ====================================================
    // Income or expense to be displayed
    ==================================================== */
	const [displayRecord, setDisplayRecord] = useState<"Income" | "Expenses">("Income");

	/* ====================================================
    // Date for display
    ==================================================== */

	// This is the dayjs object for today's date
	const [dateToDisplay, setDateToDisplay] = useState(dayjs());

	const handleBackArrow = () => {
		setDateToDisplay((prevState) => prevState.subtract(1, "year"));
	};

	const handleForwardArrow = () => {
		setDateToDisplay((prevState) => prevState.add(1, "year"));
	};

	/* ====================================================
    // Filtered Income Records for YTD to Display
    ==================================================== */

	// Filter income records to those with mth & yr we want to display
	let incomeRecordsToDisplay = incomeRecords.filter((record) => {
		const dateToCompare = dayjs(record.date);

		return dateToDisplay.isSame(dateToCompare, "year");
	});

	/* ====================================================
    // Total Income for Displayed YTD
    ==================================================== */

	let totalIncome = 0;

	for (let i = 0; i < incomeRecordsToDisplay.length; i++) {
		totalIncome += Number(incomeRecordsToDisplay[i].amount);
	}

	// this will be displayed in HTML
	const totalIncomeString = intToCurrencyString(totalIncome);

	/* ====================================================
    // List of Dates with Income Records for Displayed YTD
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
    // Filtered Expense Records for YTD to Display
    ==================================================== */

	// Filter expense records to those with mth & yr we want to display
	let expenseRecordsToDisplay = expenseRecords.filter((record) => {
		const dateToCompare = dayjs(record.date);

		return dateToDisplay.isSame(dateToCompare, "year");
	});

	/* ====================================================
    // Total Expenses for Displayed YTD
    ==================================================== */

	let totalExpenses = 0;

	if (expenseRecordsToDisplay.length > 0) {
		for (let i = 0; i < expenseRecordsToDisplay.length; i++) {
			totalExpenses += Number(expenseRecordsToDisplay[i].amount);
		}
	}

	const totalExpensesString = intToCurrencyString(totalExpenses);

	/* ====================================================
    // List of Dates with Expense Records for Displayed YTD
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

	/* ====================================================
    // Compare Income & Expense Against Budget
    ==================================================== */

	// Filter for income records
	const budgetIncomeRecords = budgets.filter((record) => record.recordId === 1);

	// Filter budget income records to those within period we want to display, start mth & end mth inclusive
	let budgetIncomeRecordsToUse = budgetIncomeRecords.filter((record) => {
		return dateToDisplay.isBetween(dayjs(record.startMonth), dayjs(record.endMonth), "month", "[]");
	});

	// Get total budgeted income for YTD
	let totalbudgettedIncome = 0;

	for (let i = 0; i < budgetIncomeRecordsToUse.length; i++) {
		// Get the start & end mth of the record in dayjs
		const startMth = dayjs(budgetIncomeRecordsToUse[i].startMonth);
		const endMth = dayjs(budgetIncomeRecordsToUse[i].endMonth);

		// Get the yr of display in string
		const currentYr = dateToDisplay.format("YYYY");

		// Get the 1 Jan & 31 Dec of yr of display in dayjs
		const startofYr = dayjs(`${currentYr}-01-01`, "YYYY-MM-DD");
		const endofYr = dayjs(`${currentYr}-12-31`, "YYYY-MM-DD");

		let noOfMonths = 0;

		// Get boolean whether start & end mth are within the year of display
		const startMthWithinYr = startMth.isBetween(startofYr, endofYr, "month", "[]");
		const endMthWithinYr = endMth.isBetween(startofYr, endofYr, "month", "[]");

		// Get the number of months b/w start & end mth within yr of display
		if (startMthWithinYr && endMthWithinYr) {
			noOfMonths = endMth.diff(startMth, "month") + 1;
		} else if (!startMthWithinYr && endMthWithinYr) {
			noOfMonths = endMth.diff(startofYr, "month") + 1;
		} else if (!startMthWithinYr && !endMthWithinYr) {
			noOfMonths = endofYr.diff(startofYr, "month") + 1;
		} else if (startMthWithinYr && !endMthWithinYr) {
			noOfMonths = endofYr.diff(startMth, "month") + 1;
		}

		totalbudgettedIncome += noOfMonths * Number(budgetIncomeRecordsToUse[i].amount);
	}

	// Filter for expense records
	const budgetExpenseRecords = budgets.filter((record) => record.recordId === 2);

	// Filter budget expense records to those within period we want to display
	const budgetExpenseRecordsToUse = budgetExpenseRecords.filter((record) => {
		return dateToDisplay.isBetween(dayjs(record.startMonth), dayjs(record.endMonth), "month", "[]");
	});

	// Get total budgeted expenses for YTD
	let totalbudgettedExpense = 0;

	for (let i = 0; i < budgetExpenseRecordsToUse.length; i++) {
		const startMth = dayjs(budgetExpenseRecordsToUse[i].startMonth);
		const endMth = dayjs(budgetExpenseRecordsToUse[i].endMonth);

		const currentYr = dateToDisplay.format("YYYY");

		const startofYr = dayjs(`${currentYr}-01-01`, "YYYY-MM-DD");
		const endofYr = dayjs(`${currentYr}-12-31`, "YYYY-MM-DD");

		let noOfMonths = 0;

		const startMthWithinYr = startMth.isBetween(startofYr, endofYr, "month", "[]");
		const endMthWithinYr = endMth.isBetween(startofYr, endofYr, "month", "[]");

		if (startMthWithinYr && endMthWithinYr) {
			noOfMonths = endMth.diff(startMth, "month") + 1;
		} else if (!startMthWithinYr && endMthWithinYr) {
			noOfMonths = endMth.diff(startofYr, "month") + 1;
		} else if (!startMthWithinYr && !endMthWithinYr) {
			noOfMonths = endofYr.diff(startofYr, "month") + 1;
		} else if (startMthWithinYr && !endMthWithinYr) {
			noOfMonths = endofYr.diff(startMth, "month") + 1;
		}
		totalbudgettedExpense += noOfMonths * Number(budgetExpenseRecordsToUse[i].amount);
	}

	let budgetIncomeCheckText = "";

	if (totalbudgettedIncome > totalIncome) {
		budgetIncomeCheckText = "Congrats! Your income has exceeded the budget!";
	} else {
		budgetIncomeCheckText = "You have not hit your budgeted income. Just a bit more to go! ";
	}

	let budgetExpenseCheckText = "";

	if (totalbudgettedExpense > totalExpenses) {
		budgetExpenseCheckText = "Your expenses have exceeded the budget!";
	} else {
		budgetExpenseCheckText = "Well done! Your expenses are within the budget.";
	}

	/* ====================================================
    // Handle Clicks on Income or Expense Tabs
    ==================================================== */
	const handleIncomeClick = () => {
		setDisplayRecord("Income");
	};

	const handleExpensesClick = () => {
		setDisplayRecord("Expenses");
	};

	return (
		<div>
			{/* Dashboard */}
			<IncomeExpenseDashboard
				currentViewPage={currentViewPage}
				dateToDisplay={dateToDisplay}
				totalIncomeString={totalIncomeString}
				totalExpensesString={totalExpensesString}
				handleBackArrow={handleBackArrow}
				handleForwardArrow={handleForwardArrow}
				budgetIncomeCheckText={budgetIncomeCheckText}
				budgetExpenseCheckText={budgetExpenseCheckText}
			/>
			{/* Income or Expense Tab */}
			<div className={styles.tabContainer}>
				<div className={displayRecord === "Income" ? styles.tabActive : styles.tab} onClick={handleIncomeClick}>
					<h1>Income</h1>
				</div>
				<div className={displayRecord === "Expenses" ? styles.tabActive : styles.tab} onClick={handleExpensesClick}>
					<h1>Expenses</h1>
				</div>
			</div>
			{/* Income or Expense Records */}
			<div className={styles.rowsContainer}>{displayRecord === "Income" ? incomeRecordRows : expenseRecordRows}</div>
		</div>
	);
};

export default YTDView;
