/** @format */

import { axiosInstanceRefresh } from "./axiosInstance";
// import { useRefreshAccessTokenAPI } from "./users";
// import { useCurrentUserContext } from "../context/currentUserContext";
// import { useEffect, useState } from "react";

// const useAxiosRefresh = () => {
// 	/* ====================================================
//     // Use Custom Hook
//     ==================================================== */
// 	const refresh = useRefreshAccessTokenAPI();

// 	/* ====================================================
//     // Context
//     ==================================================== */
// 	const { currentUser } = useCurrentUserContext();
// 	console.log("currentUser in useAxiosRefresh1:", currentUser);

// 	/* ====================================================
//     // Add interceptors to custom axios instance for auto-refresh of access token
//     ==================================================== */
// 	useEffect(() => {
// 		// Intercepts request before it is sent to server
// 		const requestIntercept = axiosInstanceRefresh.interceptors.request.use(
// 			// Add authorisation headers with JWT access token
// 			function (config: any) {
// 				if (!config.headers["Authorization"]) {
// 					console.log("currentUserInfo in useAxiosRefresh2:", currentUser);
// 					config.headers["Authorization"] = `Bearer ${currentUser?.access}`;
// 				}
// 				return config;
// 			},
// 			function (error) {
// 				return Promise.reject(error);
// 			}
// 		);

// 		// Intercepts response from server
// 		const responseIntercept = axiosInstanceRefresh.interceptors.response.use(
// 			// To proceed if no error
// 			function (response) {
// 				return response;
// 			},
// 			async function (error) {
// 				// Get config of request sent
// 				const prevRequest = error?.config;

// 				// To refresh access token & resend failed request with new access token
// 				if (error?.response?.status === 403 && !prevRequest?.sent) {
// 					prevRequest.sent = true;

// 					const newAccessToken = await refresh();
// 					prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
// 					return axiosInstanceRefresh(prevRequest);
// 				}

// 				return Promise.reject(error);
// 			}
// 		);

// 		// To remove interceptors on unmount
// 		return () => {
// 			axiosInstanceRefresh.interceptors.response.eject(requestIntercept);
// 			axiosInstanceRefresh.interceptors.request.eject(responseIntercept);
// 		};
// 	}, [currentUser, refresh]);

// 	return axiosInstanceRefresh;
// };

// export default useAxiosRefresh;
