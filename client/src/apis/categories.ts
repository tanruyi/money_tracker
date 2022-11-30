/** @format */

import { axiosInstance, axiosInstanceRefresh } from "./axiosInstance";

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
// Create new category for a user
==================================================== */

export const createCategoryAPI = async (data: any, accessToken: string) => {
	// categories creation URL to append to base URL
	const categoryCreationURL = "/categories/create";

	const response = await axiosInstanceRefresh(accessToken).post(categoryCreationURL, data);

	return response;
};

/* ====================================================
// Get all categories for logged in user
==================================================== */

export const getAllCategoriesAPI = async (currentUserId: number, accessToken: string) => {
	// get categories URL to append to base URL
	console.log("currentUserId: ", currentUserId);
	const getCategoriesURL = `/categories/${currentUserId.toString()}`;

	const response = await axiosInstanceRefresh(accessToken).get(getCategoriesURL);

	return response;
};

/* ====================================================
// Update a category for logged in user
==================================================== */
export const updateCategoryAPI = async (categoryId: number, data: any, accessToken: string) => {
	// update category URL to append to base URL
	const updateCategoryURL = `/categories/${categoryId.toString()}`;

	const response = await axiosInstanceRefresh(accessToken).put(updateCategoryURL, data);

	return response;
};

/* ====================================================
// Delete a category for logged in user
==================================================== */
export const deleteCategoryAPI = async (requestBody: any, accessToken: string) => {
	// delete category URL to append to base URL
	const deleteCategoryURL = "/categories/delete";

	const response = await axiosInstanceRefresh(accessToken).delete(deleteCategoryURL, requestBody);

	return response;
};
