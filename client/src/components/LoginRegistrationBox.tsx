/** @format */

import React from "react";
import styles from "./LoginRegistrationBox.module.css";

const LoginRegistrationBox = () => {
	return (
		<div className={styles.loginRegistrationBoxContainer}>
			<p className={styles.loginRegistrationBoxHeadline}>Welcome back</p>
            <button className={styles.loginRegistrationBoxButton}>Login</button>
            <button className={styles.loginRegistrationBoxButton}>Create account</button>
		</div>
	);
};

export default LoginRegistrationBox;
