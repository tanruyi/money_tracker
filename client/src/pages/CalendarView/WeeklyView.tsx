/** @format */

import React, { useState } from "react";
import styles from "./View.module.css";
import { useCurrentUserContext } from "../../context/currentUserContext";
import dayjs from "dayjs";
import { intToCurrencyString } from "../../utilities/utilityFunctions";
import IncomeExpenseDashboard from "../../components/IncomeExpenseDashboard";
import IncomeExpenseRow from "../../components/IncomeExpenseRow";
import noMoneyMeme from "../../assets/you-aint-got-no-money-patricia-carson.gif";
import giveMeMeme from "../../assets/kitty-kitten.gif";

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

	/* ====================================================
    // Date for display
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
    // Filtered Income Records for Week to Display
    ==================================================== */

	// Filter income records to those with mth & yr we want to display
	let incomeRecordsToDisplay = incomeRecords.filter((record) => {
		const dateToCompare = dayjs(record.date);

		return dateToDisplay.isSame(dateToCompare, "week");
	});

	/* ====================================================
    // Total Income for Displayed Week
    ==================================================== */

	let totalIncome = 0;

	for (let i = 0; i < incomeRecordsToDisplay.length; i++) {
		totalIncome += Number(incomeRecordsToDisplay[i].amount);
	}

	// this will be displayed in HTML
	const totalIncomeString = intToCurrencyString(totalIncome);

	/* ====================================================
    // List of Dates with Income Records for Displayed Week
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
    // Filtered Expense Records for Week to Display
    ==================================================== */

	// Filter expense records to those with mth & yr we want to display
	let expenseRecordsToDisplay = expenseRecords.filter((record) => {
		const dateToCompare = dayjs(record.date);

		return dateToDisplay.isSame(dateToCompare, "week");
	});

	/* ====================================================
    // Total Expenses for Displayed Week
    ==================================================== */

	let totalExpenses = 0;

	if (expenseRecordsToDisplay.length > 0) {
		for (let i = 0; i < expenseRecordsToDisplay.length; i++) {
			totalExpenses += Number(expenseRecordsToDisplay[i].amount);
		}
	}

	const totalExpensesString = intToCurrencyString(totalExpenses);

	/* ====================================================
    // List of Dates with Expense Records for Displayed Week
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
    // Handle Clicks on Income or Expense Tabs
    ==================================================== */
	const handleIncomeClick = () => {
		setDisplayRecord("Income");
	};

	const handleExpensesClick = () => {
		setDisplayRecord("Expenses");
	};

	/* ====================================================
    // Display Image if there are no records
    ==================================================== */

	const incomeImage = <img className={styles.meme} src={noMoneyMeme} alt="no-money-meme" />;

	const expenseImage = <img className={styles.meme} src={giveMeMeme} alt="give-me-meme" />;

	let imgToDisplay;

	if (displayRecord === "Income" && datesWithIncomeRecords.length === 0) {
		imgToDisplay = incomeImage;
	} else if (displayRecord === "Expenses" && datesWithExpenseRecords.length === 0) {
		imgToDisplay = expenseImage;
	}

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
			{/* Income or Expense Records */}{" "}
			<div className={styles.rowsContainer}>
				{displayRecord === "Income" ? incomeRecordRows : expenseRecordRows}
				{imgToDisplay}
			</div>
		</div>
	);
};

export default WeeklyView;
