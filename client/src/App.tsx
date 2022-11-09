/** @format */

import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import CurrentUserContext from "./context/currentUserContext";
import Navbar from "./common/Navbar";
import MonthlyView from "./pages/MonthlyView";
import Login from "./pages/Login";

function App() {
	const [currentUserId, setCurrentUserId] = useState<number>(0);

	return (
		<CurrentUserContext.Provider value={{ currentUserId, setCurrentUserId }}>
			<Login />
			{/* <Navbar />
			<Routes>
				<Route path="/monthly" element={<MonthlyView />} />
			</Routes> */}
		</CurrentUserContext.Provider>
	);
}

export default App;
