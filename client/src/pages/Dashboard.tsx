/** @format */

import { ToggleButtonGroup, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useState } from "react";
import DashboardChart from "../components/DashboardChart";
import StyledToggleButton from "../components/styledMUI/ToggleButton";
import styles from "./Dashboard.module.css";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const Dashboard = () => {
	/* ====================================================
    // Current period to be displayed
    ==================================================== */

	const [periodType, setPeriodType] = useState<"Monthly" | "YTD">("Monthly");

	function handleIncomeChartType(e: React.MouseEvent<HTMLElement>, newPeriodType: "Monthly" | "YTD") {
		if (newPeriodType !== null) {
			setPeriodType(newPeriodType);
		}
	}

	/* ====================================================
    // Date to display
    ==================================================== */

	// This is the dayjs object for today's date
	const [dateToDisplay, setDateToDisplay] = useState(dayjs());

	const handleBackArrow = () => {
		if (periodType === "Monthly") {
			setDateToDisplay((prevState) => prevState.subtract(1, "month"));
		} else if (periodType === "YTD") {
			setDateToDisplay((prevState) => prevState.subtract(1, "year"));
		}
	};

	const handleForwardArrow = () => {
		if (periodType === "Monthly") {
			setDateToDisplay((prevState) => prevState.add(1, "month"));
		} else if (periodType === "YTD") {
			setDateToDisplay((prevState) => prevState.add(1, "year"));
		}
	};

	/* ====================================================
    // Handle HTML text to display for title
    ==================================================== */
	let dateHeader = "";

	if (periodType === "Monthly") {
		dateHeader = dateToDisplay.format("MMM YYYY");
	} else if (periodType === "YTD") {
		dateHeader = `Year ${dateToDisplay.year()}`;
	}

	return (
		<div className={styles.dashboardContainer}>
			<div className={styles.dashboardDateContainer}>
				{/* To change info displayed to previous month or year */}
				<IconButton sx={{ color: "var(--pink)", height: "3rem", width: "3rem", marginRight: "1rem" }} onClick={handleBackArrow}>
					<ArrowBackIosNewIcon />
				</IconButton>
				<h1>{dateHeader}</h1>
				{/* To change info displayed to next month or year */}
				<IconButton sx={{ color: "var(--pink)", height: "3rem", width: "3rem", marginLeft: "1rem" }} onClick={handleForwardArrow}>
					<ArrowForwardIosIcon />
				</IconButton>
			</div>
			<div className={styles.dashBoardToggleButtonsContainer}>
				<ToggleButtonGroup exclusive value={periodType} onChange={handleIncomeChartType}>
					<StyledToggleButton value="Monthly">Monthly</StyledToggleButton>
					<StyledToggleButton value="YTD">YTD</StyledToggleButton>
				</ToggleButtonGroup>
			</div>
			<h2 className={styles.dashboardChartHeader}>Income</h2>
			<DashboardChart recordType={"Income"} periodType={periodType} dateToDisplay={dateToDisplay} />
			<h2 className={styles.dashboardChartHeader}>Expenses</h2>
			<DashboardChart recordType={"Expenses"} periodType={periodType} dateToDisplay={dateToDisplay} />
		</div>
	);
};

export default Dashboard;
