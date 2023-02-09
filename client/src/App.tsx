/** @format */

import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useCurrentUserContext } from "./context/currentUserContext";
import "./App.css";
import Welcome from "./pages/Welcome";
import Settings from "./pages/Settings";
import Budget from "./pages/Budget";
import Analyse from "./pages/Analyse";
import Admin from "./pages/Admin";
import Unauthorised from "./pages/Unauthorised";
import Missing from "./pages/Missing";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Layout from "./pages/Layout";

function App() {
	/* ====================================================
    // Context
    ==================================================== */
	const { currentUser } = useCurrentUserContext();

	/* ====================================================
    // HTML Components
    ==================================================== */

	// Login page
	const defaultPages = (
		<>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/dashboard" element={<Unauthorised />} />
				<Route path="/transactions" element={<Unauthorised />} />
				<Route path="/budget" element={<Unauthorised />} />
				<Route path="/analyse" element={<Unauthorised />} />
				<Route path="/settings" element={<Unauthorised />} />
				<Route path="/admin" element={<Unauthorised />} />

				{/* Catch all */}
				<Route path="/*" element={<Missing />} />
			</Routes>
		</>
	);

	// Pages available only after log in
	const mainPages = (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/transactions" element={<Transactions />} />
				<Route path="/budget" element={<Budget />} />
				<Route path="/analyse" element={<Analyse />} />
				<Route path="/settings" element={<Settings />} />

				{/* Admin page only for users with role admin */}
				<Route path="/admin" element={currentUser.role === "admin" ? <Admin /> : ""} />
				{/* Catch all */}
				<Route path="/*" element={<Missing />} />
			</Route>
		</Routes>

	);

	// Render log in page if user not logged in, otherwise render pages available after log in
	return <div className="appContainer">{currentUser.id === 0 ? defaultPages : mainPages}</div>;
}

export default App;
