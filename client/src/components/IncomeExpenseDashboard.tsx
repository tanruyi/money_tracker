/** @format */

import React from "react";
import styles from "./IncomeExpenseDashboard.module.css";

const IncomeExpenseDashboard = () => {
	return (
		<div className={styles.container}>
			<div className={styles.dashboard}>
				<div className={styles.dashboardHeader}>
					<h1>This Month's View</h1>
					<div className={styles.dashboardInfo}>
						{/* Split the dashboard info to 2 columns displayed side by side */}
						<div className={styles.dashboardInfoColumn}>
							<h3>Expenses for this month: </h3>
							<h1>$321.46</h1>
							<h4>You are over-budget!</h4>
						</div>
						<div className={styles.dashboardInfoColumn}>
							<h3>Income for this month: $2,000</h3>
							<h3>Budget left: $(-21.46)</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IncomeExpenseDashboard;
