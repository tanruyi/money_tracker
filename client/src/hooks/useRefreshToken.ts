// import { refreshAccessTokenAPI } from "../apis/users";
import { useCurrentUserContext } from "../context/currentUserContext";

// const useRefreshToken = () => {
// 	/* ====================================================
//     // Context
//     ==================================================== */
// 	const { updateCurrentUser } = useCurrentUserContext();

// 	/* ====================================================
//     // Function to call refresh access token API & update access token in context
//     ==================================================== */

// 	const refresh = async () => {
// 		const response = await refreshAccessTokenAPI();

// 		updateCurrentUser(response.data.access);

// 		return response.data.access;
// 	};

// 	return refresh;
// };

// export default useRefreshToken;
