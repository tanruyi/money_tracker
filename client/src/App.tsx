/** @format */

import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./common/Navbar";
import MonthlyView from "./pages/MonthlyView";
import Login from "./pages/Login.js";
import { useCurrentUserContext } from "./context/currentUserContext";

function App() {
	/* ====================================================
    // Context
    ==================================================== */
	const { currentUserId } = useCurrentUserContext();

	/* ====================================================
    // HTML Components
    ==================================================== */
	const mainPages = (
		<>
			<Navbar />
			<Routes>
				<Route path="/monthly" element={<MonthlyView />} />
			</Routes>{" "}
		</>
	);

	return <>{currentUserId === 0 ? <Login /> : mainPages}</>;
}

export default App;
