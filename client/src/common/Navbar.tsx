/** @format */

import React from "react";
import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		// Holding container
		<div className={styles.container}>
			{/* Logo Image */}
			<img className={styles.logo} src={logo} alt="logo" />

			{/* Container for nav links */}
			<div className={styles.pageLinkContainer}>
				{/* TODO: Add routes for below */}
				<div className={styles.pageLink}>
					<h1>Daily</h1>
				</div>
				<div className={styles.pageLink}>
					<h1>Weekly</h1>
				</div>
				<div className={styles.pageLink}>
					<Link to="/monthly">
						<h1>Monthly</h1>
					</Link>
				</div>
				<div className={styles.pageLink}>
					<h1>YTD</h1>
				</div>
				<div className={styles.pageLink}>
					<h1>Budget</h1>
				</div>
				<div className={styles.pageLink}>
					<h1>Analyse</h1>
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
