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

	const mainPages = (
		<>
			<Navbar />
			<Routes>
				<Route path="/monthly" element={<MonthlyView />} />
			</Routes>{" "}
		</>
	);

	return (
		<CurrentUserContext.Provider value={{ currentUserId, setCurrentUserId }}>
			{currentUserId === 0 ? <Login /> : mainPages}

			{/* <Login /> */}
			{/* <Navbar />
			<Routes>
				<Route path="/monthly" element={<MonthlyView />} />
			</Routes> */}
		</CurrentUserContext.Provider>
	);
}

export default App;
