/** @format */

import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./common/Navbar";
import MonthlyView from "./pages/CalendarView/MonthlyView";
import Login from "./pages/Login";
import { useCurrentUserContext } from "./context/currentUserContext";
import Settings from "./pages/Settings";
import DailyView from "./pages/CalendarView/DailyView";
import WeeklyView from "./pages/CalendarView/WeeklyView";
import YTDView from "./pages/CalendarView/YTDView";
import Budget from "./pages/Budget";
import Analyse from "./pages/Analyse";

function App() {
	/* ====================================================
    // Context
    ==================================================== */
	const { currentUserId } = useCurrentUserContext();

	/* ====================================================
    // HTML Components
    ==================================================== */

	const [currentViewPage, setCurrentViewPage] = useState<"Daily" | "Weekly" | "Monthly" | "YTD">("Monthly");

	const updateCurrentViewPage = (page: "Daily" | "Weekly" | "Monthly" | "YTD") => {
		setCurrentViewPage(page);
	};

	const defaultPages = (
		<Routes>
			<Route path="/" element={<Login />} />
		</Routes>
	);
	const mainPages = (
		<>
			<Navbar updateCurrentViewPage={updateCurrentViewPage} />
			<Routes>
				<Route path="/daily" element={<DailyView currentViewPage={currentViewPage} />} />
				<Route path="/weekly" element={<WeeklyView currentViewPage={currentViewPage} />} />
                <Route path="/monthly" element={<MonthlyView currentViewPage={currentViewPage} />} />
                <Route path="/ytd" element={<YTDView currentViewPage={currentViewPage} />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/analyse" element={<Analyse />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>{" "}
		</>
	);

	return (
		<>
			{currentUserId === 0 ? defaultPages : mainPages}
			{/* {mainPages} */}
		</>
	);
}

export default App;
