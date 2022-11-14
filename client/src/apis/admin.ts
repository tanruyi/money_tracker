/** @format */

import axiosInstance from "./axiosInstance";

/* ====================================================
// Find account using username
==================================================== */

export const findAccountAPI = async (username: string) => {
	// find account URL to append to base URL
	const findAccountURL = `/admin/find_account/${username}`;

    const response = await axiosInstance.get(findAccountURL);
    
	return response;
};

/* ====================================================
// Delete account
==================================================== */
export const deleteAccountAPI = async (requestBody: any) => {
	// delete account URL to append to base URL

	const deleteAccountURL = "/admin/delete_account";

	const response = await axiosInstance.delete(deleteAccountURL, requestBody);

	return response;
};
