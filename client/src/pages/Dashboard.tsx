/** @format */

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import DashboardChart from "../components/DashboardChart";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
	const [chartPeriodType, setChartPeriodType] = useState<"Monthly" | "YTD">("Monthly");

	function handleIncomeChartType(e: React.MouseEvent<HTMLElement>, newChartType: "Monthly" | "YTD") {
		if (newChartType !== null) {
			setChartPeriodType(newChartType);
		}
	}

	return (
		<div className={styles.dashboardContainer}>
			<div className={styles.dashboardChartContainer}>
				<h2 className={styles.dashboardChartHeader}>Income</h2>
				<ToggleButtonGroup
					exclusive
					value={chartPeriodType}
					onChange={handleIncomeChartType}
					sx={{
						gridColumn: "3",
						height: "4vh",
						marginTop: "1vh",
						width: "1vw",
					}}
				>
					<ToggleButton value="Monthly">Monthly</ToggleButton>
					<ToggleButton value="YTD">YTD</ToggleButton>
				</ToggleButtonGroup>
				<DashboardChart recordType={"Income"} periodType={chartPeriodType} />
			</div>
			<div className={styles.dashboardChartContainer}>
				<h2 className={styles.dashboardChartHeader}>Expenses</h2>
				<ToggleButtonGroup
					exclusive
					value={chartPeriodType}
					onChange={handleIncomeChartType}
					sx={{
						gridColumn: "3",
						height: "4vh",
						display: "flex",
						marginTop: "1vh",
					}}
				>
					<ToggleButton value="Monthly">Monthly</ToggleButton>
					<ToggleButton value="YTD">YTD</ToggleButton>
				</ToggleButtonGroup>
				<DashboardChart recordType={"Expenses"} periodType={chartPeriodType} />
			</div>
		</div>
	);
};

export default Dashboard;
