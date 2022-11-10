/** @format */

import React from "react";
import styles from "./CategoryRow.module.css";
import icon from "../assets/cocoa.png";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const CategoryRow = () => {
	return (
		<div className={styles.rowContainer}>
			<div className={styles.rowIcon}>
				<img src={icon} alt="icon" />
			</div>
			<div className={styles.rowInfo}>
				<h2>Cold Storage</h2>
			</div>
			<div className={styles.rowButton}>
				<IconButton>
					<EditIcon fontSize="large" />
				</IconButton>
			</div>
		</div>
	);
};

export default CategoryRow;
