/** @format */

import axios from "axios";

// For requests where access token does not need to be provided - i.e. registration & login

export const axiosInstance = axios.create({
	baseURL: "https://money-tracker-api.onrender.com",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

export const axiosInstanceRefresh = (accessToken: string) =>
	axios.create({
		baseURL: "https://money-tracker-api.onrender.com",
		timeout: 5000,
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		withCredentials: true,
	});
