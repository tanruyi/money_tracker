/** @format */

import axios from "axios";

// For requests where access token does not need to be provided - i.e. registration & login

let baseURL: any = process.env.REACT_APP_BASE_URL_PROD_MODE;

if (process.env.NODE_ENV === "development") {
	baseURL = process.env.REACT_APP_BASE_URL_DEV_MODE;
}

export const axiosInstance = axios.create({
	baseURL: "baseURL",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export const axiosInstanceRefresh = (accessToken: string) =>
	axios.create({
		baseURL: "baseURL",
		timeout: 5000,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		withCredentials: true,
	});
