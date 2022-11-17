/** @format */

import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../context/currentUserContext";

/* ====================================================
// Type Declaration
==================================================== */

interface NavbarProps {
	updateCurrentViewPage: (page: "Daily" | "Weekly" | "Monthly" | "YTD") => void;
}

const Navbar = ({ updateCurrentViewPage }: NavbarProps) => {
	/* ====================================================
    // Context
    ==================================================== */
	const { currentUserRole } = useCurrentUserContext();

	/* ====================================================
    // Handles calendar view page to display
    ==================================================== */

	const handleViewClick = (page: "Daily" | "Weekly" | "Monthly" | "YTD") => {
		updateCurrentViewPage(page);
	};

	/* ====================================================
    // Saves current page
    ==================================================== */

	const adminLink = (
		<div className={styles.pageLink}>
			<Link to="/admin">
				<h1 className={styles.pageTitle}>Admin</h1>
			</Link>
		</div>
	);

	return (
		// Holding container
		<div className={styles.container}>
			{/* Title */}
			<h3 className={styles.title}>Money Tracker</h3>
			{/* Container for nav links */}
			<div className={styles.pageLinkContainer}>
				{/* Links to different pages */}
				<div className={styles.pageLink}>
					<Link to="/daily" onClick={() => handleViewClick("Daily")}>
						<h1 className={styles.pageTitle}>Daily</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/weekly" onClick={() => handleViewClick("Weekly")}>
						<h1 className={styles.pageTitle}>Weekly</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/monthly" onClick={() => handleViewClick("Monthly")}>
						<h1 className={styles.pageTitle}>Monthly</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/ytd" onClick={() => handleViewClick("YTD")}>
						<h1 className={styles.pageTitle}>YTD</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/budget">
						<h1 className={styles.pageTitle}>Budget</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/analyse">
						<h1 className={styles.pageTitle}>Analyse</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/settings">
						<h1 className={styles.pageTitle}>Settings</h1>
					</Link>
				</div>

				{/* Admin link is only available to admins */}
				{currentUserRole === "admin" ? adminLink : ""}
			</div>
		</div>
	);
};

export default Navbar;
