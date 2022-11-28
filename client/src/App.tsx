/** @format */

import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./common/Navbar";
import Login from "./pages/Login";
import { useCurrentUserContext } from "./context/currentUserContext";
import Settings from "./pages/Settings";
import Budget from "./pages/Budget";
import Analyse from "./pages/Analyse";
import Admin from "./pages/Admin";
import CalendarView from "./pages/CalendarView";

function App() {
	/* ====================================================
    // Context
    ==================================================== */
	const { currentUser } = useCurrentUserContext();

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
			<Navbar currentViewPage={currentViewPage} updateCurrentViewPage={updateCurrentViewPage} />
			<Routes>
				<Route path="/calendar" element={<CalendarView currentViewPage={currentViewPage} />} />
				<Route path="/budget" element={<Budget />} />
				<Route path="/analyse" element={<Analyse />} />
				<Route path="/settings" element={<Settings />} />
				{currentUser.role === "admin" ? <Route path="/admin" element={<Admin />} /> : ""}
			</Routes>{" "}
		</>
	);

	return <>{currentUser.id === 0 ? defaultPages : mainPages}</>;
}

export default App;
