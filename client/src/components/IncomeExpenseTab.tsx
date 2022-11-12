/** @format */

import React from "react";
import styles from "./IncomeExpenseTab.module.css";

/* ====================================================
// Type Declaration
==================================================== */

interface IncomeExpenseTabProps {
	displayRecord: string;
	changeDisplayRecord: (type: string) => void;
}

const IncomeExpenseTab = ({ displayRecord, changeDisplayRecord }: IncomeExpenseTabProps) => {
	const handleIncomeClick = () => {
		changeDisplayRecord("Income");
	};

	const handleExpensesClick = () => {
		changeDisplayRecord("Expenses");
	};

	return (
		<div className={styles.container}>
			<div className={displayRecord === "Income" ? styles.tabActive : styles.tab} onClick={handleIncomeClick}>
				<h1>Income</h1>
			</div>
			<div className={displayRecord === "Expenses" ? styles.tabActive : styles.tab} onClick={handleExpensesClick}>
				<h1>Expenses</h1>
			</div>
		</div>
	);
};

export default IncomeExpenseTab;
