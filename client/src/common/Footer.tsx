/** @format */

import styles from "./Footer.module.css";
import githubLogo from "../assets/github-mark-white.svg";

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<p className={styles.footerText}>
				Made with ♡ <br />
				By Ru Yi
			</p>
			<a className={styles.footerGithubLink} href="https://github.com/tanruyi/money_tracker-front-end" target="_blank">
				<img src={githubLogo} alt="GitHub" className={styles.footerGithubImg} />
				<p>
					Click here to access the <br /> GitHub repository
				</p>
			</a>
		</div>
	);
};

export default Footer;
