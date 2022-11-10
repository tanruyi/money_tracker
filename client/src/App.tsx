/** @format */

import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./common/Navbar";
import MonthlyView from "./pages/MonthlyView";
import Login from "./pages/Login";
import { useCurrentUserContext } from "./context/currentUserContext";
import Settings from "./pages/Settings";

function App() {
	/* ====================================================
    // Context
    ==================================================== */
	const { currentUserId } = useCurrentUserContext();

	/* ====================================================
    // HTML Components
    ==================================================== */

	const defaultPages = (
		<Routes>
			<Route path="/" element={<Login />} />
		</Routes>
	);
	const mainPages = (
		<>
			<Navbar />
			<Routes>
				<Route path="/monthly" element={<MonthlyView />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>{" "}
		</>
	);

	return (
		<>
			{/* {currentUserId === 0 ? defaultPages : mainPages} */}
			{mainPages}
		</>
	);
}

export default App;
