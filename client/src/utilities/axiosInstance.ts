/** @format */

import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://127.0.0.1:5001",
	timeout: 1000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
