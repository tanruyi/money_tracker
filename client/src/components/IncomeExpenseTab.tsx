/** @format */

import React from "react";
import styles from "./IncomeExpenseTab.module.css";

/* ====================================================
// Type Declaration
==================================================== */

interface IncomeExpenseTabProps {
	changeDisplayRecord: (type: string) => void;
}

const IncomeExpenseTab = ({ changeDisplayRecord }: IncomeExpenseTabProps) => {
	const handleIncomeClick = () => {
		changeDisplayRecord("Income");
	};

	const handleExpensesClick = () => {
		changeDisplayRecord("Expenses");
	};

	return (
		<div className={styles.container}>
			<div className={styles.tab} onClick={handleIncomeClick}>
				<h1>Income</h1>
			</div>
			<div className={styles.tab} onClick={handleExpensesClick}>
				<h1>Expenses</h1>
			</div>
		</div>
	);
};

export default IncomeExpenseTab;
