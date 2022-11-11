/** @format */

import axiosInstance from "./axiosInstance";

/* ====================================================
// Create new category for a user
==================================================== */

export const createIncomeAPI = async (data: any) => {
	// income creation URL to append to base URL
	const incomeCreationURL = "/income/create";

	const response = await axiosInstance.post(incomeCreationURL, data);

	return response;
};

/* ====================================================
// Get all income for logged in user
==================================================== */

export const getAllIncomeAPI = async (currentUserId: number) => {
	// get income URL to append to base URL
	const getIncomeURL = `/income/${currentUserId.toString()}`;

	const response = await axiosInstance.get(getIncomeURL);

	return response;
};

/* ====================================================
// Update a income for logged in user
==================================================== */
export const updateIncomeAPI = async (incomeId: number, data: any) => {
	// update income URL to append to base URL
	const updateIncomeURL = `/income/${incomeId.toString()}`;

	const response = await axiosInstance.put(updateIncomeURL, data);

	return response;
};

/* ====================================================
// Delete a income for logged in user
==================================================== */
export const deleteIncomeAPI = async (requestBody: any) => {
	// delete income URL to append to base URL
	const deleteIncomeURL = "/income/delete";

	const response = await axiosInstance.delete(deleteIncomeURL, requestBody);

	return response;
};
