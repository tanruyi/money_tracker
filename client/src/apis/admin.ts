/** @format */

import { axiosInstance, axiosInstanceRefresh } from "./axiosInstance";

/* ====================================================
// Find account using username
==================================================== */

export const findAccountAPI = async (username: string, accessToken: string) => {
	// find account URL to append to base URL
	const findAccountURL = `/admin/find_account/${username}`;

	const response = await axiosInstanceRefresh(accessToken).get(findAccountURL);

	return response;
};

/* ====================================================
// Delete account
==================================================== */
export const deleteAccountAPI = async (requestBody: any, accessToken: string) => {
	// delete account URL to append to base URL

	const deleteAccountURL = "/admin/delete_account";

	const response = await axiosInstanceRefresh(accessToken).delete(deleteAccountURL, requestBody);

	return response;
};
