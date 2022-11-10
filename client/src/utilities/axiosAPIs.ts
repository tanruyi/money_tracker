/** @format */

import axiosInstance from "./axiosInstance";

/* ====================================================
// Login
==================================================== */
// login API url to append to base URL
const loginURL = "/users/login";

export const loginAPI = async (data: any) => {
	const response = await axiosInstance.post(loginURL, data);

	return response;
};

/* ====================================================
// Registration
==================================================== */
// registration API url to append to base URL
const registrationURL = "/users/create";

export const registrationAPI = async (data: any) => {
	const response = await axiosInstance.put(registrationURL, data);

	return response;
};

// categories creation URL to append to base URL
const manyCategoriesCreationURL = "/categories/create_multiple";

export const createDefaultCategoriesAPI = async (data: any) => {
	const response = await axiosInstance.post(manyCategoriesCreationURL, data);

	return response;
};

/* ====================================================
// Get all categories for logged in user
==================================================== */

export const getAllCategories = async (currentUserId: number) => {
	const getCategoriesURL = `/categories/${currentUserId.toString()}`;

	const response = await axiosInstance.get(getCategoriesURL);

	return response;
};
