/** @format */

import React from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

/* ====================================================
// Type Declaration
==================================================== */

interface NavbarProps {
	updateCurrentViewPage: (page: "Daily" | "Weekly" | "Monthly" | "YTD") => void;
}

const Navbar = ({ updateCurrentViewPage }: NavbarProps) => {
	// Updates state in App depending on which link is clicked
	const handleViewClick = (page: "Daily" | "Weekly" | "Monthly" | "YTD") => {
		updateCurrentViewPage(page);
	};

	return (
		// Holding container
		<div className={styles.container}>
			{/* Logo Image */}
			<img className={styles.logo} src={logo} alt="logo" />

			{/* Container for nav links */}
			<div className={styles.pageLinkContainer}>
				{/* TODO: Add routes for below */}
				<div className={styles.pageLink}>
					<Link to="/daily" onClick={() => handleViewClick("Daily")}>
						<h1>Daily</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/weekly" onClick={() => handleViewClick("Weekly")}>
						<h1>Weekly</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/monthly" onClick={() => handleViewClick("Monthly")}>
						<h1>Monthly</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/ytd" onClick={() => handleViewClick("YTD")}>
						<h1>YTD</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/budget">
						<h1>Budget</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/analyse">
						<h1>Analyse</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/settings">
						<h1>Settings</h1>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
