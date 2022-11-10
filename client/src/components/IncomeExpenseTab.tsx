/** @format */

import React from "react";
import styles from "./IncomeExpenseTab.module.css";

const IncomeExpenseTab = () => {
	return (
		<div className={styles.container}>
			<div className={styles.tab}>
				<h1>Income</h1>
			</div>
			<div className={styles.tab}>
				<h1>Expenses</h1>
			</div>
		</div>
	);
};

export default IncomeExpenseTab;
