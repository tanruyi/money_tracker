/** @format */

import React, { useState } from "react";
import styles from "./Analyse.module.css";
import { useCurrentUserContext, Budget } from "../context/currentUserContext";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

/* ====================================================
// Type Declaration
==================================================== */

interface Data {
	Category: string;
	IncomeOrExpense: string;
	Actual: number;
	Budget: number;
}

const Analyse = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { categories, budgets, incomeRecords, expenseRecords } = useCurrentUserContext();

	/* ====================================================
    // Income or expense to be displayed
    ==================================================== */
	const [displayRecord, setDisplayRecord] = useState<"Income" | "Expenses">("Income");

	/* ====================================================
    // Current period to be displayed to be displayed
    ==================================================== */
	const [currentPeriodView, setCurrentPeriodView] = useState<"Monthly" | "YTD">("Monthly");

	/* ====================================================
    // Date for display
    ==================================================== */

	// This is the dayjs object for today's date
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
    // Filtered Income Records for Date to Display
    ==================================================== */

	// Filter income records to those with mth & yr we want to display
	let incomeRecordsToDisplay = incomeRecords.filter((record) => {
		const dateToCompare = dayjs(record.date);

		return dateToDisplay.isSame(dateToCompare, "month");
	});

	/* ====================================================
    // Filtered Expense Records for Date to Display
    ==================================================== */

	// Filter expense records to those with mth & yr we want to display
	let expenseRecordsToDisplay = expenseRecords.filter((record) => {
		const dateToCompare = dayjs(record.date);

		return dateToDisplay.isSame(dateToCompare, "month");
	});

	/* ====================================================
    // Filtered Budget Records for Date to Display
    ==================================================== */

	let budgetRecordsToUse: Budget[] | [] = [];

	// Filter for budget records depending on whether it is Income or Expense currently displayed
	if (displayRecord === "Income") {
		budgetRecordsToUse = budgets.filter((record) => record.recordId === 1);
	} else if (displayRecord === "Expenses") {
		budgetRecordsToUse = budgets.filter((record) => record.recordId === 2);
	}

	// Filter budget income records to those within period we want to display, start mth & end mth inclusive
	let budgetRecordsToDisplay = budgetRecordsToUse.filter((record) => {
		return dateToDisplay.isBetween(dayjs(record.startMonth), dayjs(record.endMonth), "month", "[]");
	});

	console.log("budgetRecordsToDisplay", budgetRecordsToDisplay);

	/* ====================================================
    // Data to pass to bar chart
    ==================================================== */

	let dataForChartArray: Data[] = [];

	// Loop through list of categories under the user
	for (let i = 0; i < categories.length; i++) {
		let newDataObject: Data = {
			Category: "",
			IncomeOrExpense: displayRecord,
			Actual: 0,
			Budget: 0,
		};

		// Add category name to newDataObject
		newDataObject.Category = categories[i].categoryName;

		// Add total actual amount for category to newDataObject
		if (displayRecord === "Income") {
			let totalActual = 0;

			for (let j = 0; j < incomeRecordsToDisplay.length; j++) {
				if (incomeRecordsToDisplay[j].categoryId === categories[i].id) {
					totalActual += Number(incomeRecordsToDisplay[j].amount);
				}
			}

			newDataObject.Actual = totalActual;
		} else if (displayRecord === "Expenses") {
			let totalActual = 0;

			for (let j = 0; j < expenseRecordsToDisplay.length; j++) {
				if (expenseRecordsToDisplay[j].categoryId === categories[i].id) {
					totalActual += Number(expenseRecordsToDisplay[j].amount);
				}
			}

			newDataObject.Actual = totalActual;
		}

		// Add total budgeted amount for category to newDataObject
		let totalBudgeted = 0;

		if (currentPeriodView === "Monthly") {
			for (let k = 0; k < budgetRecordsToDisplay.length; k++) {
				if (budgetRecordsToDisplay[k].categoryId === categories[i].id) {
					totalBudgeted += Number(budgetRecordsToDisplay[k].amount);
				}
			}
		} else if (currentPeriodView === "YTD") {
			for (let k = 0; k < budgetRecordsToDisplay.length; k++) {
				if (budgetRecordsToDisplay[k].categoryId === categories[i].id) {
					const startMth = dayjs(budgetRecordsToDisplay[k].startMonth);
					const endMth = dayjs(budgetRecordsToDisplay[k].endMonth);

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

					totalBudgeted += noOfMonths * Number(budgetRecordsToDisplay[k].amount);
				}
			}
		}

		newDataObject.Budget = totalBudgeted;

		dataForChartArray.push(newDataObject);
	}

	/* ====================================================
    // Handle Clicks on Monthly or YTD Buttons
    ==================================================== */
	const handleMonthlyClick = () => {
		setCurrentPeriodView("Monthly");
	};

	const handleYTDClick = () => {
		setCurrentPeriodView("YTD");
	};

	/* ====================================================
    // Handle Clicks on Income or Expense Buttons
    ==================================================== */
	const handleIncomeClick = () => {
		setDisplayRecord("Income");
	};

	const handleExpensesClick = () => {
		setDisplayRecord("Expenses");
	};

	/* ====================================================
    // Handle HTML text to display for title
    ==================================================== */
	let dateHeader = "";
	let periodType = "";

	if (currentPeriodView === "Monthly") {
		dateHeader = dateToDisplay.format("MMM YYYY");
		periodType = "month";
	} else if (currentPeriodView === "YTD") {
		dateHeader = `Year ${dateToDisplay.year()}`;
		periodType = "year";
	}

	return (
		<div className={styles.container}>
			<div className={styles.buttonsContainer}>
				<div className={styles.typeButtonContainer}>
					<div className={displayRecord === "Income" ? styles.typeButtonActive : styles.typeButton} onClick={handleIncomeClick}>
						Income
					</div>
					<div className={displayRecord === "Expenses" ? styles.typeButtonActive : styles.typeButton} onClick={handleExpensesClick}>
						Expenses
					</div>
				</div>
				<div className={styles.typeButtonContainer}>
					<div id="monthly-button" className={currentPeriodView === "Monthly" ? styles.typeButtonActive : styles.typeButton} onClick={handleMonthlyClick}>
						Monthly
					</div>
					<div id="YTD-button" className={currentPeriodView === "YTD" ? styles.typeButtonActive : styles.typeButton} onClick={handleYTDClick}>
						YTD
					</div>
				</div>
			</div>
			<h1>{dateHeader}</h1>
			<div className={styles.chartContainer}>
				<IconButton sx={{ color: "var(--color10)" }} onClick={handleBackArrow}>
					<ArrowBackIosNewIcon />
				</IconButton>
				<div className={styles.chartBox}>
					<ResponsiveContainer height="100%" width="100%">
						<BarChart data={dataForChartArray} margin={{ top: 50, right: 20, bottom: 20, left: 20 }}>
							<XAxis dataKey="Category" label={{ value: "Categories", position: "bottom" }} />
							<YAxis label={{ value: "Amount", angle: -90, position: "left" }} />
							<Tooltip />
							<Bar dataKey="Actual" fill="var(--emphasise)">
								<LabelList dataKey="Actual" position="top" />
							</Bar>
							<Bar dataKey="Budget" fill="var(--color5)">
								<LabelList dataKey="Budget" position="top" />
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
				<IconButton sx={{ color: "var(--color10)" }} onClick={handleForwardArrow}>
					<ArrowForwardIosIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default Analyse;
