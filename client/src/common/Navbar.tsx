/** @format */

import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useCurrentUserContext } from "../context/currentUserContext";
import { useLocation } from "react-router-dom";

/* ====================================================
// Type Declaration
==================================================== */

interface NavbarProps {
	currentViewPage: "Daily" | "Weekly" | "Monthly" | "YTD";
	updateCurrentViewPage: (page: "Daily" | "Weekly" | "Monthly" | "YTD") => void;
}

const Navbar = ({ currentViewPage, updateCurrentViewPage }: NavbarProps) => {
	const location = useLocation();

	/* ====================================================
    // Context
    ==================================================== */
	const { currentUser } = useCurrentUserContext();

	/* ====================================================
    // Saves current page
    ==================================================== */

	const adminLink = (
		<div className={styles.pageLink}>
			<Link to="/admin">
				<h1 className={location.pathname === "/admin" ? styles.pageTitleActive : styles.pageTitle}>Admin</h1>
			</Link>
		</div>
	);

	return (
		// Holding container
		<div className={styles.container}>
			{/* Title */}
			<h1 className={styles.title}>Money Tracker</h1>
			{/* Username */}
			<h3 className={styles.username}>User: {currentUser.username}</h3>
			{/* Container for nav links */}
			<div className={styles.pageLinkContainer}>
				{/* Links to different pages */}
				<div className={styles.pageLink} onClick={() => updateCurrentViewPage("Daily")}>
					<Link to="/calendar">
						<h1 className={currentViewPage === "Daily" && location.pathname === "/calendar" ? styles.pageTitleActive : styles.pageTitle}>Daily</h1>
					</Link>
				</div>
				<div className={styles.pageLink} onClick={() => updateCurrentViewPage("Weekly")}>
					<Link to="/calendar">
						<h1 className={currentViewPage === "Weekly" && location.pathname === "/calendar" ? styles.pageTitleActive : styles.pageTitle}>
							Weekly
						</h1>
					</Link>
				</div>
				<div className={styles.pageLink} onClick={() => updateCurrentViewPage("Monthly")}>
					<Link to="/calendar">
						<h1 className={currentViewPage === "Monthly" && location.pathname === "/calendar" ? styles.pageTitleActive : styles.pageTitle}>
							Monthly
						</h1>
					</Link>
				</div>
				<div className={styles.pageLink} onClick={() => updateCurrentViewPage("YTD")}>
					<Link to="/calendar">
						<h1 className={currentViewPage === "YTD" && location.pathname === "/calendar" ? styles.pageTitleActive : styles.pageTitle}>YTD</h1>
					</Link>
				</div>

				<div className={styles.pageLink}>
					<Link to="/budget">
						<h1 className={location.pathname === "/budget" ? styles.pageTitleActive : styles.pageTitle}>Budget</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/analyse">
						<h1 className={location.pathname === "/analyse" ? styles.pageTitleActive : styles.pageTitle}>Analyse</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<Link to="/settings">
						<h1 className={location.pathname === "/settings" ? styles.pageTitleActive : styles.pageTitle}>Settings</h1>
					</Link>
				</div>

				{/* Admin link is only available to admins */}
				{currentUser.role === "admin" ? adminLink : ""}
			</div>
		</div>
	);
};

export default Navbar;
