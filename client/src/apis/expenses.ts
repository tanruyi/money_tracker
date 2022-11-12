/** @format */

import axiosInstance from "./axiosInstance";

/* ====================================================
// Create new expense for a user
==================================================== */

export const createExpenseAPI = async (data: any) => {
	// expense creation URL to append to base URL
	const expenseCreationURL = "/expense/create";

	const response = await axiosInstance.post(expenseCreationURL, data);

	return response;
};

/* ====================================================
// Get all expense for logged in user
==================================================== */

export const getAllExpensesAPI = async (currentUserId: number) => {
	// get expense URL to append to base URL
	const getExpenseURL = `/expense/${currentUserId.toString()}`;

	const response = await axiosInstance.get(getExpenseURL);

	return response;
};

/* ====================================================
// Update a expense for logged in user
==================================================== */
export const updateExpenseAPI = async (expenseId: number, data: any) => {
	// update expense URL to append to base URL
	const updateExpenseURL = `/expense/${expenseId.toString()}`;

	const response = await axiosInstance.put(updateExpenseURL, data);

	return response;
};

/* ====================================================
// Delete a expense for logged in user
==================================================== */
export const deleteExpenseAPI = async (requestBody: any) => {
	// delete expense URL to append to base URL
	const deleteExpenseURL = "/expense/delete";

	const response = await axiosInstance.delete(deleteExpenseURL, requestBody);

	return response;
};
