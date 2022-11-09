/** @format */

import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./common/Navbar";
import MonthlyView from "./pages/MonthlyView";
import Home from "./pages/Login";

function App() {
	return (
		<>
			<Home />
			{/* <Navbar />
			<Routes>
				<Route path="/monthly" element={<MonthlyView />} />
			</Routes> */}
		</>
	);
}

export default App;
