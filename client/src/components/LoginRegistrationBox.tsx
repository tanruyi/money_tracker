/** @format */

import { useState } from "react";
import styles from "./LoginRegistrationBox.module.css";

interface LoginRegistrationBoxProps {

}

const LoginRegistrationBox = () => {

    const [display, setDisplay] = useState("Default")

    const defaultDisplay = (
        <div className={styles.loginRegistrationBoxContainer}>
			<p className={styles.loginRegistrationBoxHeadline}>Welcome back</p>
            <button className={styles.loginRegistrationBoxButton}>Login</button>
            <button className={styles.loginRegistrationBoxButton}>Create account</button>
		</div>
    )

    const loginRegistrationDisplay = (
        <div className={styles.loginRegistrationBoxContainer}>
            <div className={styles.loginRegistrationBoxHeader}>
                <p className={styles.loginRegistrationBoxHeaderText}>Login</p>
                <p className={styles.loginRegistrationBoxBackButton}>Back</p>
            </div>
            <button className={styles.loginRegistrationBoxButton}>Login</button>
            <button className={styles.loginRegistrationBoxButton}>Create account</button>
		</div>
    )
	return (
		<>
			{loginRegistrationDisplay}
		</>
	);
};

export default LoginRegistrationBox;
