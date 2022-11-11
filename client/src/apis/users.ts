/** @format */

import axiosInstance from "./axiosInstance";

/* ====================================================
// Login
==================================================== */

export const loginAPI = async (data: any) => {
	// login API url to append to base URL
	const loginURL = "/users/login";

	const response = await axiosInstance.post(loginURL, data);

	return response;
};

/* ====================================================
// Registration
==================================================== */

export const registrationAPI = async (data: any) => {
	// registration API url to append to base URL
	const registrationURL = "/users/create";

	const response = await axiosInstance.put(registrationURL, data);

	return response;
};
