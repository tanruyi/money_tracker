/** @format */

import React from "react";
import CategoryRow from "../components/CategoryRow";
import styles from "./Settings.module.css";

const Settings = () => {
	return (
		<div className={styles.container}>
			<h1>Settings</h1>
			<div className={styles.categoriesBox}>
				<h2>Categories</h2>
				<div className={styles.categoriesList}>
					<div className={styles.typeContainer}>
						<h2>Income</h2>
						<CategoryRow />
					</div>
					<div className={styles.typeContainer}>
						<h2>Expense</h2>
						<CategoryRow />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
