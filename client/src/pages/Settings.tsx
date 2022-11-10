/** @format */

import React from "react";
import CategoryRow from "../components/CategoryRow";
import styles from "./Settings.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import whyMeme from "../assets/confused-white-persian-guardian.gif";

const Settings = () => {
	/* ====================================================
    // Context
    ==================================================== */

	const { categories } = useCurrentUserContext();

	/* ====================================================
    // Filter categories to income & expense types
    ==================================================== */

	let incomeCategories = [];
	let expenseCategories = [];

	for (let i = 0; i < categories.length; i++) {
		if (categories[i].recordId === 1) {
			incomeCategories.push(categories[i]);
		} else if (categories[i].recordId === 2) {
			expenseCategories.push(categories[i]);
		}
	}

	const incomeCategoriesToDisplay = incomeCategories.map((category) => <CategoryRow category={category} />);

	const expenseCategoriesToDisplay = expenseCategories.map((category) => <CategoryRow category={category} />);

	const toDisplayIfNoCategories = (
		<div className={styles.thisIsEmpty}>
			<h3>This is empty</h3>
			<img src={whyMeme} alt="why-meme" />
		</div>
	);

	return (
		<div className={styles.container}>
			<h1>Settings</h1>
			<div className={styles.categoriesBox}>
				<h2>Categories</h2>
				<div className={styles.categoriesList}>
					<div className={styles.typeContainer}>
						<h2>Income</h2>
						{incomeCategories.length > 0 ? incomeCategoriesToDisplay : toDisplayIfNoCategories}
					</div>
					<div className={styles.typeContainer}>
						<h2>Expense</h2>
                        {expenseCategories.length > 0 ? expenseCategoriesToDisplay : toDisplayIfNoCategories}					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
