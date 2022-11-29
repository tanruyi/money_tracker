/** @format */

import { axiosInstance, axiosInstanceRefresh } from "./axiosInstance";

/* ====================================================
// Create new category for a user
==================================================== */

export const createIncomeAPI = async (data: any, accessToken: string) => {
	// income creation URL to append to base URL
	const incomeCreationURL = "/income/create";

	const response = await axiosInstanceRefresh(accessToken).post(incomeCreationURL, data);

	return response;
};

/* ====================================================
// Get all income for logged in user
==================================================== */

export const getAllIncomeAPI = async (currentUserId: number, accessToken: string) => {
	// get income URL to append to base URL
	const getIncomeURL = `/income/${currentUserId.toString()}`;

	const response = await axiosInstanceRefresh(accessToken).get(getIncomeURL);

	return response;
};

/* ====================================================
// Update a income for logged in user
==================================================== */
export const updateIncomeAPI = async (incomeId: number, data: any, accessToken: string) => {
	// update income URL to append to base URL
	const updateIncomeURL = `/income/${incomeId.toString()}`;

	const response = await axiosInstanceRefresh(accessToken).put(updateIncomeURL, data);

	return response;
};

/* ====================================================
// Delete a income for logged in user
==================================================== */
export const deleteIncomeAPI = async (requestBody: any, accessToken: string) => {
	// delete income URL to append to base URL
	const deleteIncomeURL = "/income/delete";

	const response = await axiosInstanceRefresh(accessToken).delete(deleteIncomeURL, requestBody);

	return response;
};
