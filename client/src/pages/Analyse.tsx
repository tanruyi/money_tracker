/** @format */

import React, { useState } from "react";
import styles from "./Analyse.module.css";
import { useCurrentUserContext, Category, IncomeExpense } from "../context/currentUserContext";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton, ToggleButtonGroup } from "@mui/material";
import StyledToggleButton from "../components/styledMUI/ToggleButton";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

/* ====================================================
// Type Declaration
==================================================== */

interface Data {
	Category: string;
	Actual: number;
}

const Analyse = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { categories, budgets, incomeRecords, expenseRecords } = useCurrentUserContext();

	/* ====================================================
    // Current period to be displayed
    ==================================================== */
	const [periodType, setPeriodType] = useState<"Monthly" | "YTD">("Monthly");

	function handleIncomeChartType(e: React.MouseEvent<HTMLElement>, newPeriodType: "Monthly" | "YTD") {
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
    // Filtered Categories to be displayed
    ==================================================== */

	let filteredIncomeCategories: Category[] = categories.filter((category) => category.recordId === 1);
	let filteredExpensesCategories: Category[] = categories.filter((category) => category.recordId === 2);

	/* ====================================================
    // Filtered Income & Expense Records for Date to Display
    ==================================================== */

	// Filter income or expense records to those with mth & yr we want to display

	let filteredIncomeRecords: IncomeExpense[] | [] = [];
	let filteredExpenseRecords: IncomeExpense[] | [] = [];

	if (periodType === "Monthly") {
		filteredIncomeRecords = incomeRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "month");
		});

		filteredExpenseRecords = expenseRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "month");
		});
	} else if (periodType === "YTD") {
		filteredIncomeRecords = incomeRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "year");
		});

		filteredExpenseRecords = expenseRecords.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "year");
		});
	}

	/* ====================================================
    // Data to pass to bar chart
    ==================================================== */

	let incomeDataForChartArray: Data[] = [];
	let expensesDataForChartArray: Data[] = [];

	// Loop through list of income categories under the user
	for (let i = 0; i < filteredIncomeCategories.length; i++) {
		let newDataObject: Data = {
			Category: "",
			Actual: 0,
		};

		// Add category name to newDataObject
		newDataObject.Category = filteredIncomeCategories[i].categoryName;

		// Add total actual amount for category to newDataObject
		let totalActual = 0;

		for (let j = 0; j < filteredIncomeRecords.length; j++) {
			if (filteredIncomeRecords[j].categoryId === filteredIncomeCategories[i].id) {
				totalActual += Number(filteredIncomeRecords[j].amount);
			}
		}

		if (totalActual > 0) {
			newDataObject.Actual = totalActual;
			incomeDataForChartArray.push(newDataObject);
		} else {
			continue;
		}
	}

	for (let i = 0; i < filteredExpensesCategories.length; i++) {
		let newDataObject: Data = {
			Category: "",
			Actual: 0,
		};

		// Add category name to newDataObject
		newDataObject.Category = filteredExpensesCategories[i].categoryName;

		// Add total actual amount for category to newDataObject
		let totalActual = 0;

		for (let j = 0; j < filteredExpenseRecords.length; j++) {
			if (filteredExpenseRecords[j].categoryId === filteredExpensesCategories[i].id) {
				totalActual += Number(filteredExpenseRecords[j].amount);
			}
		}

		if (totalActual > 0) {
			newDataObject.Actual = totalActual;
			expensesDataForChartArray.push(newDataObject);
		} else {
			continue;
		}
	}

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
		<div className={styles.analyseContainer}>
			<div className={styles.analyseDateContainer}>
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
			<div className={styles.analyseToggleButtonsContainer}>
				<ToggleButtonGroup exclusive value={periodType} onChange={handleIncomeChartType}>
					<StyledToggleButton value="Monthly">Monthly</StyledToggleButton>
					<StyledToggleButton value="YTD">YTD</StyledToggleButton>
				</ToggleButtonGroup>
			</div>
			<div className={styles.analyseChartsContainer}>
				<div className={styles.analyseChartColumn}>
					<h2>Income</h2>
					<ResponsiveContainer height={250} width={730}>
						<PieChart>
							<Pie data={incomeDataForChartArray} nameKey={"Category"} dataKey={"Actual"} label />
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className={styles.analyseChartColumn}>
					<h2>Expenses</h2>
					<ResponsiveContainer height={250} width={730}>
						<PieChart>
							<Pie data={expensesDataForChartArray} nameKey={"Category"} dataKey={"Actual"} label />
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default Analyse;
