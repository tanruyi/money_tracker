/** @format */

import { axiosInstance, axiosInstanceRefresh } from "./axiosInstance";

/* ====================================================
// Create new budget for a user
==================================================== */

export const createBudgetAPI = async (data: any, accessToken: string) => {
	// budget creation URL to append to base URL
	const budgetCreationURL = "/budget/create";

	const response = await axiosInstanceRefresh(accessToken).post(budgetCreationURL, data);

	return response;
};

/* ====================================================
// Get all budget for logged in user
==================================================== */

export const getAllBudgetAPI = async (currentUserId: number, accessToken: string) => {
	// get budget URL to append to base URL
	const getBudgetURL = `/budget/${currentUserId.toString()}`;

	const response = await axiosInstanceRefresh(accessToken).get(getBudgetURL);

	return response;
};

/* ====================================================
// Update a budget for logged in user
==================================================== */
export const updateBudgetAPI = async (budgetId: number, data: any, accessToken: string) => {
	// update budget URL to append to base URL
	const updateBudgetURL = `/budget/${budgetId.toString()}`;

	const response = await axiosInstanceRefresh(accessToken).put(updateBudgetURL, data);

	return response;
};

/* ====================================================
// Delete a budget for logged in user
==================================================== */
export const deleteBudgetAPI = async (requestBody: any, accessToken: string) => {
	// delete budget URL to append to base URL
	const deleteBudgetURL = "/budget/delete";

	const response = await axiosInstanceRefresh(accessToken).delete(deleteBudgetURL, requestBody);

	return response;
};
