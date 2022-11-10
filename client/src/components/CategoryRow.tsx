/** @format */

import React, { useState } from "react";
import styles from "./CategoryRow.module.css";
import icon from "../assets/cocoa.png";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { Category } from "../context/currentUserContext";

type CategoryRowProps = {
	category: Category;
};

const CategoryRow = ({ category }: CategoryRowProps) => {
	/* ====================================================
    // Handles form dialog
    ==================================================== */

	const [openModal, setOpenModal] = useState<boolean>(false);

	let incomeOrExpense = "";

	if (category.recordId === 1) {
		incomeOrExpense = "Income";
	} else if (category.recordId === 2) {
		incomeOrExpense = "Expenses";
	}

	const [recordType, setRecordType] = useState(incomeOrExpense);

	const [categoryName, setCategoryName] = useState<string>(category.categoryName);

	const handleClickOpen = () => {
		setOpenModal(true);
	};

	const handleClose = () => {
		setOpenModal(false);
	};

	const handleRecordType = (e: any) => {
		setRecordType(e.target.value);
	};

	const handleCategoryName = (e: any) => {
		setCategoryName(e.target.value);
	};

	const handleUpdate = () => {};

	const handleDelete = () => {};

	return (
		<div id={"categoryId" + category.id.toString()} className={styles.rowContainer}>
			<div className={styles.rowIcon}>
				<img src={icon} alt="icon" />
			</div>
			<div className={styles.rowInfo}>
				<h2>{category.categoryName}</h2>
			</div>
			<div className={styles.rowButton}>
				<IconButton>
					<EditIcon fontSize="large" onClick={handleClickOpen} />
				</IconButton>
				<Dialog open={openModal} fullWidth onClose={handleClose} sx={{ marginLeft: "auto", marginRight: "auto" }}>
					<DialogTitle>Edit Category</DialogTitle>
					<DialogContent>
						<Box component="form" sx={{ marginTop: "1rem" }}>
							<FormControl sx={{ width: "100%", marginBottom: "1rem" }}>
								<InputLabel htmlFor="income-or-expense">Type</InputLabel>
								<Select value={recordType} onChange={handleRecordType} input={<OutlinedInput label="Type" id="income-or-expense" />}>
									<MenuItem value={"Income"}>Income</MenuItem>
									<MenuItem value={"Expenses"}>Expenses</MenuItem>
								</Select>
							</FormControl>
							<TextField id="categoryName" label="Category Name" variant="outlined" sx={{ width: "100%" }} value={categoryName} onChange={handleCategoryName} />
						</Box>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" size="large" onClick={handleUpdate}>
							Update
						</Button>
						<Button variant="contained" size="large" onClick={handleDelete}>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};

export default CategoryRow;
