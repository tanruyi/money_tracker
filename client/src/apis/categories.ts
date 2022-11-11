/** @format */

import axiosInstance from "./axiosInstance";

/* ====================================================
// Default categories creation during registration
==================================================== */

export const createDefaultCategoriesAPI = async (data: any) => {
	// categories creation URL to append to base URL
	const manyCategoriesCreationURL = "/categories/create_multiple";

	const response = await axiosInstance.post(manyCategoriesCreationURL, data);

	return response;
};

/* ====================================================
// Get all categories for logged in user
==================================================== */

export const getAllCategories = async (currentUserId: number) => {
	// get categories URL to append to base URL

	const getCategoriesURL = `/categories/${currentUserId.toString()}`;

	const response = await axiosInstance.get(getCategoriesURL);

	return response;
};
