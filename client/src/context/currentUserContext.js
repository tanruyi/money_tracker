/** @format */

import React, { useContext, useState } from "react";

const CurrentUserContext = React.createContext();

/* ====================================================
// Context Consumer
==================================================== */

export function useCurrentUserContext() {
	return useContext(CurrentUserContext);
}

/* ====================================================
// Context Provider
==================================================== */

export function CurrentUserContextProvider({ children }) {
	const [currentUserId, setCurrentUserId] = useState(0);

	return <CurrentUserContext.Provider value={{ currentUserId, setCurrentUserId }}>{children}</CurrentUserContext.Provider>;
}
