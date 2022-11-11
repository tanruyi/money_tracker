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

export const getAllCategoriesAPI = async (currentUserId: number) => {
	// get categories URL to append to base URL
	const getCategoriesURL = `/categories/${currentUserId.toString()}`;

	const response = await axiosInstance.get(getCategoriesURL);

	return response;
};

/* ====================================================
// Update a category for logged in user
==================================================== */
export const updateCategoryAPI = async (categoryId: number, data: any) => {
	// update category URL to append to base URL
	const updateCategoryURL = `/categories/${categoryId.toString()}`;

	const response = await axiosInstance.put(updateCategoryURL, data);

	return response;
};

/* ====================================================
// Delete a category for logged in user
==================================================== */
export const deleteCategoryAPI = async (categoryId: number) => {
	// delete category URL to append to base URL
	const deleteCategoryURL = "/categories/delete";

	const response = await axiosInstance.delete(deleteCategoryURL);

	return response;
};
