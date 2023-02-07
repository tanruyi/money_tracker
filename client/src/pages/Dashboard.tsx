/** @format */

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";
import DashboardChart from "../components/DashboardChart";
import StyledToggleButton from "../components/styledMUI/ToggleButton";
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
			<div className={styles.dashboardChartHeaderContainer}>
				<h2 className={styles.dashboardChartHeader}>Income</h2>
				<ToggleButtonGroup exclusive value={chartPeriodType} onChange={handleIncomeChartType}>
					<StyledToggleButton value="Monthly">Monthly</StyledToggleButton>
					<StyledToggleButton value="YTD">YTD</StyledToggleButton>
				</ToggleButtonGroup>
			</div>

			<DashboardChart recordType={"Income"} periodType={chartPeriodType} />

			<div className={styles.dashboardChartHeaderContainer}>
				<h2 className={styles.dashboardChartHeader}>Expenses</h2>
				<ToggleButtonGroup exclusive value={chartPeriodType} onChange={handleIncomeChartType}>
					<StyledToggleButton value="Monthly">Monthly</StyledToggleButton>
					<StyledToggleButton value="YTD">YTD</StyledToggleButton>
				</ToggleButtonGroup>
			</div>

			<DashboardChart recordType={"Expenses"} periodType={chartPeriodType} />
		</div>
	);
};

export default Dashboard;
