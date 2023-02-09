/** @format */

import { useState } from "react";
import styles from "./CategoryRow.module.css";
import icon from "../assets/money.svg";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Category } from "../context/currentUserContext";
import CategoryEditModal from "./CategoryEditModal";

/* ====================================================
// Type Declaration
==================================================== */

type CategoryRowProps = {
	category: Category;
};

const CategoryRow = ({ category }: CategoryRowProps) => {
	/* ====================================================
    // Handles form dialog
    ==================================================== */

	const [openModal, setOpenModal] = useState<boolean>(false);

	// Opens dialog
	const handleClickOpen = () => {
		setOpenModal(true);
	};

	// // Closes dialog
	const handleClose = () => {
		setOpenModal(false);
	};

	return (
		<div id={"categoryId" + category.id.toString()} className={styles.rowContainer}>
			<img src={icon} alt="icon" />
			<h3>{category.categoryName}</h3>
			<IconButton onClick={handleClickOpen}>
				<EditIcon fontSize="large" />
			</IconButton>
			{/* Form Dialog, only visible when open */}
			<CategoryEditModal category={category} openModal={openModal} handleClose={handleClose} />
		</div>
	);
};

export default CategoryRow;
