/** @format */

import React, { useState } from "react";
import styles from "./BudgetDashboard.module.css";
import { Fab, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BudgetCreationModal from "./BudgetCreationModal";
import dayjs, { Dayjs } from "dayjs";
import WeekofYear from "dayjs/plugin/weekOfYear";
import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis } from "recharts";

dayjs.extend(WeekofYear);

/* ====================================================
// Type Declaration
==================================================== */

interface BudgetDashboardProps {
	currentPeriodView: "Monthly" | "YTD";
	dateToDisplay: Dayjs;
	handleBackArrow: () => void;
	handleForwardArrow: () => void;
	totalIncome: number;
	totalExpenses: number;
}

const BudgetDashboard = ({ currentPeriodView, dateToDisplay, handleBackArrow, handleForwardArrow, totalIncome, totalExpenses }: BudgetDashboardProps) => {
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

	if (currentPeriodView === "Monthly") {
		dateHeader = dateToDisplay.format("MMM YYYY");
		periodType = "month";
	} else if (currentPeriodView === "YTD") {
		dateHeader = `Year ${dateToDisplay.year()}`;
		periodType = "year";
	}

	/* ====================================================
    // Bar chart
    ==================================================== */
	const data = [
		{
			Type: "Income",
			Amount: totalIncome,
		},
		{
			Type: "Expenses",
			Amount: totalExpenses,
		},
	];

	console.log(data);

	return (
		<div className={styles.container}>
			<div className={styles.dashboard}>
				<IconButton sx={{ color: "var(--color10)" }} onClick={handleBackArrow}>
					<ArrowBackIosNewIcon />
				</IconButton>
				<div className={styles.dashboardHeader}>
					<h1>{dateHeader}</h1>
					<div className={styles.dashboardInfo}>
						<ResponsiveContainer width="100%" height="80%">
							<BarChart data={data} width={400} height={200} margin={{ top: 20, right: 5, bottom: 5, left: 5 }}>
								<XAxis dataKey="Type" />
								<Tooltip />
								<Bar dataKey="Amount" fill="var(--emphasise)">
									<LabelList dataKey="Amount" position="top" />
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
				<IconButton sx={{ color: "var(--color10)" }} onClick={handleForwardArrow}>
					<ArrowForwardIosIcon />
				</IconButton>
			</div>
			{/* Create new record button */}
			<Fab sx={{ marginLeft: "48.8vw", marginTop: "-7vh", bgcolor: "var(--emphasise)" }} onClick={handleClickOpen}>
				<AddIcon />
			</Fab>
			{/* Form dialog for new record - opens on click of new record button */}
			<BudgetCreationModal openModal={openModal} handleClose={handleClose} />
		</div>
	);
};

export default BudgetDashboard;
