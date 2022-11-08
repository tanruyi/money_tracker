/** @format */

import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./common/Navbar";
import MonthlyView from "./pages/MonthlyView";

function App() {
	return (
		<>
			<Navbar />
			<MonthlyView />
		</>
	);
}

export default App;
