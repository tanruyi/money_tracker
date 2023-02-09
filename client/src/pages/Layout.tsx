/** @format */

import styles from "./Layout.module.css"
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import Userbar from "../common/Userbar";

const Layout = () => {
	return (
		<>
			<Navbar />
            <div className={styles.rightContainer}>
				<Userbar />
				<Outlet />
				<Footer />
			</div>
		</>
	);
};

export default Layout;
