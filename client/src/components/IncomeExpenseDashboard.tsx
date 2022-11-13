/** @format */

import React, { useState } from "react";
import styles from "./IncomeExpenseDashboard.module.css";
import { Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IncomeExpenseCreationModal from "./IncomeExpenseCreationModal";
import dayjs, { Dayjs } from "dayjs";
import WeekofYear from "dayjs/plugin/weekOfYear"
dayjs.extend(WeekofYear)

/* ====================================================
// Type Declaration
==================================================== */

interface IncomeExpenseDashboardProps {
	currentViewPage: "Daily" | "Weekly" | "Monthly" | "YTD";
	dateToDisplay: Dayjs;
	totalIncomeString: string;
	totalExpensesString: string;
	handleBackArrow: () => void;
	handleForwardArrow: () => void;
}

const IncomeExpenseDashboard = ({ currentViewPage, dateToDisplay, totalIncomeString, totalExpensesString, handleBackArrow, handleForwardArrow }: IncomeExpenseDashboardProps) => {
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

	/* ====================================================
    // Handle HTML text to display depending on the page being viewed
    ==================================================== */
	let dateHeader = "";
	let periodType = "";

	if (currentViewPage === "Monthly") {
		dateHeader = dateToDisplay.format("MMM YYYY");
		periodType = "month";
	} else if (currentViewPage === "Daily") {
		dateHeader = dateToDisplay.format("DD MMM YYYY");
		periodType = "day";
	} else if (currentViewPage === "Weekly") {
		dateHeader = `Week ${dateToDisplay.week()}`;
		periodType = "week";
	} else if (currentViewPage === "YTD") {
		dateHeader = `Year ${dateToDisplay.year()}`;
		periodType = "year";
	}

	return (
		<div className={styles.container}>
			<div className={styles.dashboard}>
				<IconButton onClick={handleBackArrow}>
					<ArrowBackIosNewIcon sx={{ color: "white" }} />
				</IconButton>
				<div className={styles.dashboardHeader}>
					<h1>{dateHeader}</h1>
					<div className={styles.dashboardInfo}>
						{/* Split the dashboard info to 2 columns displayed side by side */}
						<div className={styles.dashboardInfoColumn}>
							<h3>Expenses for the {periodType}: </h3>
							<h1>${totalExpensesString}</h1>
							<h4>You are over-budget!</h4>
						</div>
						<div className={styles.dashboardInfoColumn}>
							<h3>
								Income for the {periodType}: ${totalIncomeString}
							</h3>
							<h3>Budget left: $(-21.46)</h3>
						</div>
					</div>
				</div>
				<IconButton onClick={handleForwardArrow}>
					<ArrowForwardIosIcon sx={{ color: "white" }} />
				</IconButton>
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
