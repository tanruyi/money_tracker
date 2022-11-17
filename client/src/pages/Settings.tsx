/** @format */

import React, { useState } from "react";
import CategoryRow from "../components/CategoryRow";
import styles from "./Settings.module.css";
import { useCurrentUserContext } from "../context/currentUserContext";
import whyMeme from "../assets/confused-white-persian-guardian.gif";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CategoryCreationModal from "../components/CategoryCreationModal";

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
			<h3>This is empty</h3>
			<img src={whyMeme} alt="why-meme" />
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

	/* ====================================================
    // Handle log out
    ==================================================== */

	const handleLogOut = () => {
		updateCurrentUser(0);
		navigate("/");
	};

	return (
		<div className={styles.container}>
			<div className={styles.itemBox}>
				<div className={styles.headerBox}>
					<h1>Categories</h1>
					<Fab sx={{ marginLeft: "75vw", bgcolor: "var(--emphasise)" }} onClick={handleClickOpen}>
						<AddIcon />
					</Fab>
				</div>
				<div className={styles.categoriesList}>
					<div className={styles.typeContainer}>
						<h2>Income</h2>
						{incomeCategories.length > 0 ? incomeCategoriesToDisplay : toDisplayIfNoCategories}
					</div>
					<div className={styles.typeContainer}>
						<h2>Expense</h2>
						{expenseCategories.length > 0 ? expenseCategoriesToDisplay : toDisplayIfNoCategories}{" "}
					</div>
				</div>
			</div>
			<div className={styles.itemBox}>
				<h1>Log Out</h1>
				<h2 className={styles.logOutLink} onClick={handleLogOut}>
					Click here to log out
				</h2>
			</div>
			{/* Form Dialog, only visible when open */}
			<CategoryCreationModal openModal={openModal} handleClickOpen={handleClickOpen} handleClose={handleClose} />
		</div>
	);
};

export default Settings;
