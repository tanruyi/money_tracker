/** @format */

import React, { useState } from "react";
import styles from "./CalendarView.module.css";
import { useCurrentUserContext, IncomeExpense } from "../context/currentUserContext";
import noMoneyMeme from "../assets/you-aint-got-no-money-patricia-carson.gif";
import giveMeMeme from "../assets/kitty-kitten.gif";
import dayjs from "dayjs";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import IncomeExpenseDashboard from "../components/IncomeExpenseDashboard";
import IncomeExpenseRow from "../components/IncomeExpenseRow";

/* ====================================================
// Type Declaration
==================================================== */

interface CalendarViewProps {
	currentViewPage: "Daily" | "Weekly" | "Monthly" | "YTD";
}

const CalendarView = ({ currentViewPage }: CalendarViewProps) => {
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
		if (currentViewPage === "YTD") {
			setDateToDisplay((prevState) => prevState.subtract(1, "year"));
		} else if (currentViewPage === "Monthly") {
			setDateToDisplay((prevState) => prevState.subtract(1, "month"));
		} else if (currentViewPage === "Weekly") {
			setDateToDisplay((prevState) => prevState.subtract(1, "week"));
		} else if (currentViewPage === "Daily") {
			setDateToDisplay((prevState) => prevState.subtract(1, "day"));
		}
	};

	const handleForwardArrow = () => {
		if (currentViewPage === "YTD") {
			setDateToDisplay((prevState) => prevState.add(1, "year"));
		} else if (currentViewPage === "Monthly") {
			setDateToDisplay((prevState) => prevState.add(1, "month"));
		} else if (currentViewPage === "Weekly") {
			setDateToDisplay((prevState) => prevState.add(1, "week"));
		} else if (currentViewPage === "Daily") {
			setDateToDisplay((prevState) => prevState.add(1, "day"));
		}
	};

	/* ====================================================
    // Filtered Income Records for Period to Display
    ==================================================== */

	// Filter income records to those within period we want to display
	let incomeRecordsToDisplay: IncomeExpense[] = [];

	if (currentViewPage === "YTD") {
		incomeRecordsToDisplay = incomeRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "year");
		});
	} else if (currentViewPage === "Monthly") {
		incomeRecordsToDisplay = incomeRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "month");
		});
	} else if (currentViewPage === "Weekly") {
		incomeRecordsToDisplay = incomeRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "week");
		});
	} else if (currentViewPage === "Daily") {
		incomeRecordsToDisplay = incomeRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "day");
		});
	}

	/* ====================================================
    // Total Income for Displayed Period
    ==================================================== */

	let totalIncome = 0;

	for (let i = 0; i < incomeRecordsToDisplay.length; i++) {
		totalIncome += Number(incomeRecordsToDisplay[i].amount);
	}

	// this will be displayed in HTML
	const totalIncomeString = intToCurrencyString(totalIncome);

	/* ====================================================
    // List of Dates with Income Records for Displayed Period, Sorted in Descending Order
    ==================================================== */

	const datesWithIncomeRecordsSet = new Set();

	for (let i = 0; i < incomeRecordsToDisplay.length; i++) {
		datesWithIncomeRecordsSet.add(incomeRecordsToDisplay[i].date);
	}

	const datesWithIncomeRecords = Array.from(datesWithIncomeRecordsSet);

	const datesWithIncomeRecordsSorted = datesWithIncomeRecords.sort((date1, date2) => {
		const date1Object = new Date(String(date1));

		const date2Object = new Date(String(date2));

		return Number(date2Object) - Number(date1Object);
	});

	/* ====================================================
    // Income Rows to Display
    ==================================================== */

	const incomeRecordRows = datesWithIncomeRecordsSorted.map((date, index) => (
		<IncomeExpenseRow key={index} date={date} recordsToDisplay={incomeRecordsToDisplay} displayRecord={displayRecord} />
	));

	/* ====================================================
    // Filtered Expense Records for Period to Display
    ==================================================== */

	// Filter expense records to those with mth & yr we want to display
	let expenseRecordsToDisplay: IncomeExpense[] = [];

	if (currentViewPage === "YTD") {
		expenseRecordsToDisplay = expenseRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "year");
		});
	} else if (currentViewPage === "Monthly") {
		expenseRecordsToDisplay = expenseRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "month");
		});
	} else if (currentViewPage === "Weekly") {
		expenseRecordsToDisplay = expenseRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "week");
		});
	} else if (currentViewPage === "Daily") {
		expenseRecordsToDisplay = expenseRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "day");
		});
	}

	/* ====================================================
    // Total Expenses for Displayed Period
    ==================================================== */

	let totalExpenses = 0;

	if (expenseRecordsToDisplay.length > 0) {
		for (let i = 0; i < expenseRecordsToDisplay.length; i++) {
			totalExpenses += Number(expenseRecordsToDisplay[i].amount);
		}
	}

	const totalExpensesString = intToCurrencyString(totalExpenses);

	/* ====================================================
    // List of Dates with Expense Records for Displayed Period, Sorted in Descending Order
    ==================================================== */

	const datesWithExpenseRecordsSet = new Set();

	for (let i = 0; i < expenseRecordsToDisplay.length; i++) {
		datesWithExpenseRecordsSet.add(expenseRecordsToDisplay[i].date);
	}

	const datesWithExpenseRecords = Array.from(datesWithExpenseRecordsSet);

	const datesWithExpenseRecordsSorted = datesWithExpenseRecords.sort((date1, date2) => {
		const date1Object = new Date(String(date1));

		const date2Object = new Date(String(date2));

		return Number(date2Object) - Number(date1Object);
	});

	/* ====================================================
    // Expense Rows to Display
    ==================================================== */

	const expenseRecordRows = datesWithExpenseRecordsSorted.map((date, index) => (
		<IncomeExpenseRow key={index} date={date} recordsToDisplay={expenseRecordsToDisplay} displayRecord={displayRecord} />
	));

	/* ====================================================
    // Compare Income & Expense Against Budget, Only Available for Monthly & YTD View
    ==================================================== */

	// Filter for income records
	const budgetIncomeRecords = budgets.filter((record) => record.recordId === 1);

	// Filter budget income records to those within period we want to display, start mth & end mth inclusive
	let budgetIncomeRecordsToUse = budgetIncomeRecords.filter((record) => {
		return dateToDisplay.isBetween(dayjs(record.startMonth), dayjs(record.endMonth), "month", "[]");
	});

	let totalbudgettedIncome = 0;

	for (let i = 0; i < budgetIncomeRecordsToUse.length; i++) {
		if (currentViewPage === "Monthly") {
			totalbudgettedIncome += Number(budgetIncomeRecordsToUse[i].amount);
		} else if (currentViewPage === "YTD") {
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
	}

	// Filter for expense records
	const budgetExpenseRecords = budgets.filter((record) => record.recordId === 2);

	// Filter budget expense records to those within period we want to display
	const budgetExpenseRecordsToUse = budgetExpenseRecords.filter((record) => {
		return dateToDisplay.isBetween(dayjs(record.startMonth), dayjs(record.endMonth), "month", "[]");
	});

	let totalbudgettedExpense = 0;

	for (let i = 0; i < budgetExpenseRecordsToUse.length; i++) {
		if (currentViewPage === "Monthly") {
			totalbudgettedExpense += Number(budgetExpenseRecordsToUse[i].amount);
		} else if (currentViewPage === "YTD") {
			// Get the start & end mth of the record in dayjs
			const startMth = dayjs(budgetExpenseRecordsToUse[i].startMonth);
			const endMth = dayjs(budgetExpenseRecordsToUse[i].endMonth);

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

			totalbudgettedExpense += noOfMonths * Number(budgetExpenseRecordsToUse[i].amount);
		}
	}

	let budgetIncomeCheckText = "";

	if (currentViewPage === "Monthly" || currentViewPage === "YTD") {
		if (totalbudgettedIncome > totalIncome) {
			budgetIncomeCheckText = "Congrats! Your have achieved your budgeted income!";
		} else {
			budgetIncomeCheckText = "You have not hit your budgeted income. Just a bit more to go! ";
		}
	}

	let budgetExpenseCheckText = "";

	if (currentViewPage === "Monthly" || currentViewPage === "YTD") {
		if (totalbudgettedExpense > totalExpenses) {
			budgetExpenseCheckText = "Oh no! You have hit your budgeted expenses!";
		} else {
			budgetExpenseCheckText = "Well done! Your expenses are within the budget.";
		}
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
			<div className={styles.rowsContainer}>
				{displayRecord === "Income" ? incomeRecordRows : expenseRecordRows}
				{imgToDisplay}
			</div>
		</div>
	);
};

export default CalendarView;
