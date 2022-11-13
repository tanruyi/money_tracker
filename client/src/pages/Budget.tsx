/** @format */

import React, { useState } from "react";
import styles from "./Budget.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import BudgetDashboard from "../components/BudgetDashboard";
import BudgetRow from "../components/BudgetRow";
dayjs.extend(isBetween);

const Budget = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { budgets } = useCurrentUserContext();

	/* ====================================================
    // Current period to be displayed to be displayed
    ==================================================== */
	const [currentPeriodView, setCurrentPeriodView] = useState<"Monthly" | "YTD">("Monthly");

	/* ====================================================
    // Date for display
    ==================================================== */

	const [dateToDisplay, setDateToDisplay] = useState(dayjs());

	const handleBackArrow = () => {
		if (currentPeriodView === "Monthly") {
			setDateToDisplay((prevState) => prevState.subtract(1, "month"));
		} else if (currentPeriodView === "YTD") {
			setDateToDisplay((prevState) => prevState.subtract(1, "year"));
		}
	};

	const handleForwardArrow = () => {
		if (currentPeriodView === "Monthly") {
			setDateToDisplay((prevState) => prevState.add(1, "month"));
		} else if (currentPeriodView === "YTD") {
			setDateToDisplay((prevState) => prevState.add(1, "year"));
		}
	};

	/* ====================================================
    // Filtered Budget Income Records to Display
    ==================================================== */

	// Filter for income records
	const budgetIncomeRecords = budgets.filter((record) => record.recordId === 1);

	// Filter budget income records to those within period we want to display
	const budgetIncomeRecordsToDisplay = budgetIncomeRecords.filter((record) => {
		return dateToDisplay.isBetween(dayjs(record.startMonth), dayjs(record.endMonth), "month", "[]");
	});

	/* ====================================================
    // Total Income for Displayed Period
    ==================================================== */

	let totalIncome = 0;

	for (let i = 0; i < budgetIncomeRecordsToDisplay.length; i++) {
		totalIncome += Number(budgetIncomeRecordsToDisplay[i].amount);
	}

	// this will be displayed in HTML
	const totalIncomeString = `$${intToCurrencyString(totalIncome)}`;

	/* ====================================================
    // Income Rows to Display
    ==================================================== */

	const budgetIncomeRows = budgetIncomeRecordsToDisplay.map((record, index) => <BudgetRow key={index} record={record} type={"Income"} />);

	/* ====================================================
	// Filtered Expense Records to Display
	==================================================== */
	// Filter for expense records
	const budgetExpenseRecords = budgets.filter((record) => record.recordId === 2);

	// Filter budget expense records to those within period we want to display
	const budgetExpenseRecordsToDisplay = budgetExpenseRecords.filter((record) => {
		return dateToDisplay.isBetween(dayjs(record.startMonth), dayjs(record.endMonth), "month", "[]");
	});

	/* ====================================================
	// Total Expenses for Displayed Period
	==================================================== */

	let totalExpenses = 0;

	if (budgetExpenseRecordsToDisplay.length > 0) {
		for (let i = 0; i < budgetExpenseRecordsToDisplay.length; i++) {
			totalExpenses += Number(budgetExpenseRecordsToDisplay[i].amount);
		}
	}

	const totalExpensesString = `-$${intToCurrencyString(totalExpenses)}`;

	/* ====================================================
	// Expense Rows to Display
	==================================================== */

	const expenseRecordRows = budgetExpenseRecordsToDisplay.map((record, index) => <BudgetRow key={index} record={record} type={"Expenses"} />);

	/* ====================================================
    // Handle Clicks on Monthly or YTD Tabs
    ==================================================== */
	const handleIncomeClick = () => {
		setCurrentPeriodView("Monthly");
	};

	const handleExpensesClick = () => {
		setCurrentPeriodView("YTD");
	};

	return (
		<div>
			{/* Dashboard */}
			<BudgetDashboard
				currentPeriodView={currentPeriodView}
				dateToDisplay={dateToDisplay}
				handleBackArrow={handleBackArrow}
				handleForwardArrow={handleForwardArrow}
			/>
			{/* Monthly or YTD Tab */}
			<div className={styles.tabContainer}>
				<div className={currentPeriodView === "Monthly" ? styles.tabActive : styles.tab} onClick={handleIncomeClick}>
					<h1>Monthly</h1>
				</div>
				<div className={currentPeriodView === "YTD" ? styles.tabActive : styles.tab} onClick={handleExpensesClick}>
					<h1>YTD</h1>
				</div>
			</div>
			{/* Budget Records */}
			<div className={styles.budgetRowsContainer}>
				<div className={styles.budgetRowsColumn}>
					<div className={styles.header}>
						<h1>Income</h1>
						<h1>{totalIncomeString}</h1>
					</div>
					{budgetIncomeRows}
				</div>
				<div className={styles.budgetRowsColumn}>
					<div className={styles.header}>
						<h1>Expenses</h1>
						<h1>{totalExpensesString}</h1>
					</div>
					{expenseRecordRows}
				</div>
			</div>
		</div>
	);
};

export default Budget;
