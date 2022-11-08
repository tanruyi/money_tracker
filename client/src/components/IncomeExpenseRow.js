/** @format */

import React from "react";
import styles from "./IncomeExpenseRow.module.css";
import icon from "../assets/cocoa.png";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const IncomeExpenseRow = () => {
	return (
		<div className={styles.container}>
			<h1>Today</h1>
			<div className={styles.rowContainer}>
				<div className={styles.rowIcon}>
					<img src={icon} alt="icon" />
				</div>
				<div className={styles.rowInfo}>
					<h2>Cold Storage</h2>
					<h3>Groceries</h3>
				</div>
				<div className={styles.rowAmount}>
					<h2>-$80.00</h2>
				</div>
				<div className={styles.rowButton}>
					<IconButton>
						<EditIcon fontSize="large" />
					</IconButton>
				</div>
			</div>
			<div className={styles.rowContainer}>
				<div className={styles.rowIcon}>
					<img src={icon} alt="icon" />
				</div>
				<div className={styles.rowInfo}>
					<h2>Cold Storage</h2>
					<h3>Groceries</h3>
				</div>
				<div className={styles.rowAmount}>
					<h2>-$80.00</h2>
				</div>
				<div className={styles.rowButton}>
					<IconButton>
						<EditIcon fontSize="large" />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default IncomeExpenseRow;
