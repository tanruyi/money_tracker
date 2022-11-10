/** @format */

import React from "react";
import IncomeExpenseRow from "./IncomeExpenseRow";
import styles from "./IncomeExpenseRowDisplay.module.css";

const IncomeExpenseRowDisplay = () => {
	return (
		<div className={styles.container}>
			<IncomeExpenseRow />
		</div>
	);
};

export default IncomeExpenseRowDisplay;
