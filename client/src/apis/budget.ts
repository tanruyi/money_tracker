/** @format */

import axiosInstance from "./axiosInstance";

/* ====================================================
// Create new budget for a user
==================================================== */

export const createBudgetAPI = async (data: any) => {
	// budget creation URL to append to base URL
	const budgetCreationURL = "/budget/create";

	const response = await axiosInstance.post(budgetCreationURL, data);

	return response;
};

/* ====================================================
// Get all budget for logged in user
==================================================== */

export const getAllBudgetAPI = async (currentUserId: number) => {
	// get budget URL to append to base URL
	const getBudgetURL = `/budget/${currentUserId.toString()}`;

	const response = await axiosInstance.get(getBudgetURL);

	return response;
};

/* ====================================================
// Update a budget for logged in user
==================================================== */
export const updateBudgetAPI = async (budgetId: number, data: any) => {
	// update budget URL to append to base URL
	const updateBudgetURL = `/budget/${budgetId.toString()}`;

	const response = await axiosInstance.put(updateBudgetURL, data);

	return response;
};

/* ====================================================
// Delete a budget for logged in user
==================================================== */
export const deleteBudgetAPI = async (requestBody: any) => {
	// delete budget URL to append to base URL
	const deleteBudgetURL = "/budget/delete";

	const response = await axiosInstance.delete(deleteBudgetURL, requestBody);

	return response;
};
