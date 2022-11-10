/** @format */

import React from "react";
import IncomeExpenseDashboard from "../components/IncomeExpenseDashboard";
import IncomeExpenseRowDisplay from "../components/IncomeExpenseRowDisplay";
import IncomeExpenseTab from "../components/IncomeExpenseTab";
import { useCurrentUserContext } from "../context/currentUserContext";

const MonthlyView = () => {
	const { currentUserId } = useCurrentUserContext();
	return (
		<div>
			<IncomeExpenseDashboard />
			<IncomeExpenseTab />
			<IncomeExpenseRowDisplay />
		</div>
	);
};

export default MonthlyView;
