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

	const { categories, budgets } = useCurrentUserContext();

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

	// Filter budget income records to those within period we want to display, start mth & end mth inclusive
	let budgetIncomeRecordsToDisplay = budgetIncomeRecords.filter((record) => {
		return dateToDisplay.isBetween(dayjs(record.startMonth), dayjs(record.endMonth), "month", "[]");
	});

	/* ====================================================
    // Total Budget Income for Each Category
    ==================================================== */

	// const categoryIdListForIncomeSet = new Set();

	// for (let i = 0; i < budgetIncomeRecordsToDisplay.length; i++) {
	// 	categoryIdListForIncomeSet.add(budgetIncomeRecordsToDisplay[i].categoryId);
	// }

	// const categoryIdListForIncome = Array.from(categoryIdListForIncomeSet);

	// let incomeForEachCategory: { [key: string]: string | number } = { Type: "Income" };

	// for (let i = 0; categoryIdListForIncome.length; i++) {
	// 	// Find id for category
	// 	const categoryObject = categories.find((category) => category.id === categoryIdListForIncome[i]);

	// 	const categoryName = categoryObject?.categoryName;

	// 	let totalIncomeForCategory = 0;

	// 	// Filter the list of budget income records for those under the same id
	// 	const budgetIncomeRecordsForCategory = budgetIncomeRecordsToDisplay.filter((category) => category.id === categoryIdListForIncome[i]);

	// 	// Get the sum of budgetted income for all records under the category
	// 	for (let i = 0; i < budgetIncomeRecordsForCategory.length; i++) {
	// 		totalIncomeForCategory += Number(budgetIncomeRecordsForCategory[i].amount);
	// 	}

	// 	incomeForEachCategory.categoryName = totalIncomeForCategory;
	// }

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
    // Total Budget Expenses for Each Category
    ==================================================== */

	// const categoryIdListForExpenseSet = new Set();

	// for (let i = 0; i < budgetExpenseRecordsToDisplay.length; i++) {
	// 	categoryIdListForExpenseSet.add(budgetExpenseRecordsToDisplay[i].categoryId);
	// }

	// const categoryIdListForExpense = Array.from(categoryIdListForExpenseSet);

	// let expenseForEachCategory: { [key: string]: string | number } = { Type: "Expenses" };

	// for (let i = 0; categoryIdListForExpense.length; i++) {
	// 	// Find id for category
	// 	const categoryObject = categories.find((category) => category.id === categoryIdListForExpense[i]);

	// 	const categoryName = categoryObject?.categoryName;

	// 	let totalExpenseForCategory = 0;

	// 	// Filter the list of budget income records for those under the same id
	// 	const budgetExpenseRecordsForCategory = budgetExpenseRecordsToDisplay.filter((category) => category.id === categoryIdListForExpense[i]);

	// 	// Get the sum of budgetted income for all records under the category
	// 	for (let i = 0; i < budgetExpenseRecordsForCategory.length; i++) {
	// 		totalExpenseForCategory += Number(budgetExpenseRecordsForCategory[i].amount);
	// 	}

	// 	expenseForEachCategory.categoryName = totalExpenseForCategory;
	// }

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
    // Data to pass to chart in BudgetDashboard
    ==================================================== */

	// const data: {[key: string]: string | number }[] = [incomeForEachCategory, expenseForEachCategory];

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
			<BudgetDashboard currentPeriodView={currentPeriodView} dateToDisplay={dateToDisplay} handleBackArrow={handleBackArrow} handleForwardArrow={handleForwardArrow} totalIncome={totalIncome} totalExpenses={totalExpenses} />
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
