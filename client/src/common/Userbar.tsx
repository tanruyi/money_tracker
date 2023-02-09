/** @format */

import styles from "./Userbar.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";

const Userbar = () => {

	/* ====================================================
    // Context
    ==================================================== */
	const { currentUser } = useCurrentUserContext();

	return (
		<div className={styles.userbarContainer}>
			<p>
                Welcome, <span>{currentUser.username}</span>
			</p>
		</div>
	);
};

export default Userbar;
