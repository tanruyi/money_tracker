/** @format */

import { axiosInstance, axiosInstanceRefresh } from "./axiosInstance";

/* ====================================================
// Create new expense for a user
==================================================== */

export const createExpenseAPI = async (data: any, accessToken: string) => {
	// expense creation URL to append to base URL
	const expenseCreationURL = "/expense/create";

	const response = await axiosInstanceRefresh(accessToken).post(expenseCreationURL, data);

	return response;
};

/* ====================================================
// Get all expense for logged in user
==================================================== */

export const getAllExpensesAPI = async (currentUserId: number, accessToken: string) => {
	// get expense URL to append to base URL
	const getExpenseURL = `/expense/${currentUserId.toString()}`;

	const response = await axiosInstanceRefresh(accessToken).get(getExpenseURL);

	return response;
};

/* ====================================================
// Update a expense for logged in user
==================================================== */
export const updateExpenseAPI = async (expenseId: number, data: any, accessToken: string) => {
	// update expense URL to append to base URL
	const updateExpenseURL = `/expense/${expenseId.toString()}`;

	const response = await axiosInstanceRefresh(accessToken).put(updateExpenseURL, data);

	return response;
};

/* ====================================================
// Delete a expense for logged in user
==================================================== */
export const deleteExpenseAPI = async (requestBody: any, accessToken: string) => {
	// delete expense URL to append to base URL
	const deleteExpenseURL = "/expense/delete";

	const response = await axiosInstanceRefresh(accessToken).delete(deleteExpenseURL, requestBody);

	return response;
};
