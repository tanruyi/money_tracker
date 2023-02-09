/** @format */

import styles from "./Navbar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserContext } from "../context/currentUserContext";

/* ====================================================
// Type Declaration
==================================================== */

const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	/* ====================================================
    // Context
    ==================================================== */
	const { currentUser, updateCurrentUser } = useCurrentUserContext();

	/* ====================================================
    // Saves current page
    ==================================================== */

	const adminLink = (
		<div className={styles.navbarPageLink}>
			<Link to="/admin">
				<p className={location.pathname === "/admin" ? styles.pageTitleActive : styles.pageTitle}>Admin</p>
			</Link>
		</div>
	);

	/* ====================================================
    // Handle log out
    ==================================================== */

	const handleLogOut = () => {
		updateCurrentUser(0);
		navigate("/");
	};

	return (
		// Holding container
		<div className={styles.navbarContainer}>
			{/* Title */}
			<h1 className={styles.navbarTitle}>Money Tracker</h1>
			{/* Container for nav links */}
			<div className={styles.navbarPageLinksContainer}>
				{/* Links to different pages */}
				<div className={styles.navbarPageLink}>
					<Link to="/dashboard">
						<p className={location.pathname === "/dashboard" ? styles.pageTitleActive : styles.pageTitle}>Dashboard</p>
					</Link>
				</div>
				<div className={styles.navbarPageLink}>
					<Link to="/transactions">
						<p className={location.pathname === "/transactions" ? styles.pageTitleActive : styles.pageTitle}>Transactions</p>
					</Link>
				</div>
				<div className={styles.navbarPageLink}>
					<Link to="/budget">
						<p className={location.pathname === "/budget" ? styles.pageTitleActive : styles.pageTitle}>Budget</p>
					</Link>
				</div>
				<div className={styles.navbarPageLink}>
					<Link to="/analyse">
						<p className={location.pathname === "/analyse" ? styles.pageTitleActive : styles.pageTitle}>Analyse</p>
					</Link>
				</div>
				<div className={styles.navbarPageLink}>
					<Link to="/settings">
						<p className={location.pathname === "/settings" ? styles.pageTitleActive : styles.pageTitle}>Settings</p>
					</Link>
				</div>
			</div>

			<div className={styles.navbarOtherLinksContainer}>
				{/* Admin link is only available to admins */}
				{currentUser.role === "admin" ? adminLink : ""}

				<div className={styles.navbarPageLink}>
					<p className={styles.pageTitle} onClick={handleLogOut}>
						Logout
					</p>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
