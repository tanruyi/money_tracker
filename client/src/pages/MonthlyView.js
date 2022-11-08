/** @format */

import React from "react";
import IncomeExpenseDashboard from "../components/IncomeExpenseDashboard";
import IncomeExpenseTab from "../components/IncomeExpenseTab";

const MonthlyView = () => {
	return (
		<div>
			<IncomeExpenseDashboard />
			<IncomeExpenseTab />
		</div>
	);
};

export default MonthlyView;
