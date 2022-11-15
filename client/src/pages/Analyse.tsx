/** @format */

import React, { useState } from "react";
import styles from "./Analyse.module.css";
import { useCurrentUserContext, Budget } from "../context/currentUserContext";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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

			for (let j = 0; j < incomeRecords.length; j++) {
				if (incomeRecords[j].categoryId === categories[i].id) {
					totalActual += Number(incomeRecords[j].amount);
				}
			}

			newDataObject.Actual = totalActual;
		} else if (displayRecord === "Expenses") {
			let totalActual = 0;

			for (let j = 0; j < expenseRecords.length; j++) {
				if (expenseRecords[j].categoryId === categories[i].id) {
					totalActual += Number(expenseRecords[j].amount);
				}
			}

			newDataObject.Actual = totalActual;
		}

		// Add total budgeted amount for category to newDataObject
		let budgetRecordsToUse: Budget[] | [] = [];

		// Filter for budget records depending on whether it is Income or Expense currently displayed
		if (displayRecord === "Income") {
			budgetRecordsToUse = budgets.filter((record) => record.recordId === 1);
		} else if (displayRecord === "Expenses") {
			budgetRecordsToUse = budgets.filter((record) => record.recordId === 2);
		}

		let totalBudgeted = 0;

		if (budgetRecordsToUse.length > 0) {
			for (let k = 0; k < budgetRecordsToUse.length; k++) {
				if (budgetRecordsToUse[k].categoryId === categories[i].id) {
					totalBudgeted += Number(budgetRecordsToUse[k].amount);
				}
			}
		}

		newDataObject.Budget = totalBudgeted;

		dataForChartArray.push(newDataObject);
	}

	/* ====================================================
    // Get total income for each category for current displayed period
    ==================================================== */

	return (
		<div className={styles.container}>
			<h1>Budget vs Actual</h1>
			<div className={styles.chartContainer}>
				<ResponsiveContainer height="100%" width="100%">
					<BarChart data={dataForChartArray} margin={{ top: 50, right: 20, bottom: 20, left: 20 }}>
                        <XAxis dataKey="Category" />
                        <YAxis label={{ value: "Amount", angle: -90, position: 'insideLeft' }} />
						<Tooltip />
						<Bar dataKey="Actual" fill="red">
							<LabelList dataKey="Actual" position="top" />
						</Bar>
						<Bar dataKey="Budget" fill="blue">
							<LabelList dataKey="Budget" position="top" />
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default Analyse;
