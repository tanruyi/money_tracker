/** @format */

import React, { useState } from "react";
import styles from "./IncomeExpenseDashboard.module.css";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IncomeExpenseCreationModal from "./IncomeExpenseCreationModal";

/* ====================================================
// Type Declaration
==================================================== */

interface IncomeExpenseDashboardProps {
	totalIncomeString: string;
	totalExpensesString: string;
}

const IncomeExpenseDashboard = ({ totalIncomeString, totalExpensesString }: IncomeExpenseDashboardProps) => {
	/* ====================================================
    // Handle category creation modal
    ==================================================== */

	const [openModal, setOpenModal] = useState<boolean>(false);

	// Opens dialog
	const handleClickOpen = () => {
		setOpenModal(true);
	};

	// Closes dialog
	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.dashboard}>
				<div className={styles.dashboardHeader}>
					<h1>This Month's View</h1>
					<div className={styles.dashboardInfo}>
						{/* Split the dashboard info to 2 columns displayed side by side */}
						<div className={styles.dashboardInfoColumn}>
							<h3>Expenses for this month: </h3>
							<h1>${totalExpensesString}</h1>
							<h4>You are over-budget!</h4>
						</div>
						<div className={styles.dashboardInfoColumn}>
							<h3>Income for this month: ${totalIncomeString}</h3>
							<h3>Budget left: $(-21.46)</h3>
						</div>
					</div>
				</div>
			</div>
			{/* Create new record button */}
			<Fab sx={{ margin: "0 48.8vw", bgcolor: "#66fcf1" }} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			{/* Form dialog for new record - opens on click of new record button */}
			<IncomeExpenseCreationModal openModal={openModal} handleClose={handleClose} />
		</div>
	);
};

export default IncomeExpenseDashboard;
