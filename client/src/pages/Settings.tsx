/** @format */

import React, { useState } from "react";
import CategoryRow from "../components/CategoryRow";
import CategoryCreationModal from "../components/CategoryCreationModal";
import styles from "./Settings.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import { useNavigate } from "react-router-dom";
import StyledButton from "../components/styledMUI/Button";

const Settings = () => {
	const navigate = useNavigate();

	/* ====================================================
    // Context
    ==================================================== */

	const { updateCurrentUser, categories } = useCurrentUserContext();

	/* ====================================================
    // Filter categories to income & expense types
    ==================================================== */

	let incomeCategories = [];
	let expenseCategories = [];

	// Loop through categories array and assign them to incomeCategories & expenseCategories based on whether it belongs to income or expense
	for (let i = 0; i < categories.length; i++) {
		if (categories[i].recordId === 1) {
			incomeCategories.push(categories[i]);
		} else if (categories[i].recordId === 2) {
			expenseCategories.push(categories[i]);
		}
	}

	// JSX for income & category rows
	const incomeCategoriesToDisplay = incomeCategories.map((category) => <CategoryRow category={category} />);

	const expenseCategoriesToDisplay = expenseCategories.map((category) => <CategoryRow category={category} />);

	// JSX if no categories for income or expenses
	const toDisplayIfNoCategories = (
		<div className={styles.thisIsEmpty}>
			<h3>You don't have any categories created. Please create one.</h3>
		</div>
	);

	/* ====================================================
    // Create new category modal
    ==================================================== */

	const [openModal, setOpenModal] = useState<boolean>(false);

	// Opens dialog
	const handleClickOpen = () => {
		setOpenModal(true);
	};

	// Closes dialog
	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<div className={styles.settingsContainer}>
			<div className={styles.settingsCategoriesHeader}>
				<h2>Categories</h2>
				<StyledButton variant="contained" sx={{ fontSize: "1rem" }} onClick={handleClickOpen}>
					Create category
				</StyledButton>
				{/* Form Dialog, only visible when open */}
				<CategoryCreationModal openModal={openModal} handleClose={handleClose} />
			</div>

			{/* Categories List */}
			<div className={styles.settingsCategoriesContainer}>
				<div className={styles.settingsCategoriesColumn}>
					<div className={styles.header}>
						<h2>Income</h2>
					</div>
					{incomeCategories.length > 0 ? incomeCategoriesToDisplay : toDisplayIfNoCategories}
				</div>
				<div className={styles.settingsCategoriesColumn}>
					<div className={styles.header}>
						<h2>Expenses</h2>
					</div>
					{expenseCategories.length > 0 ? expenseCategoriesToDisplay : toDisplayIfNoCategories}
				</div>
			</div>
		</div>
	);
};

export default Settings;
