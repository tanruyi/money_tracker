/** @format */

import React, { useContext, useState } from "react";
import { ReactNode } from "react";

/* ====================================================
// Type
==================================================== */

type UserId = number;

interface CurrentUserContextProviderProps {
	children: ReactNode;
}

interface CurrentUserContextType {
	currentUserId: UserId;
	updateCurrentUser: (id: number) => void;
}

const CurrentUserContext = React.createContext({} as CurrentUserContextType);

/* ====================================================
// Context Consumer
==================================================== */

export function useCurrentUserContext() {
	return useContext(CurrentUserContext);
}

/* ====================================================
// Context Provider
==================================================== */

export function CurrentUserContextProvider({ children }: CurrentUserContextProviderProps) {
	const [currentUserId, setCurrentUserId] = useState<UserId>(0);

	const updateCurrentUser = (id: number) => setCurrentUserId(id);

	return <CurrentUserContext.Provider value={{ currentUserId, updateCurrentUser }}>{children}</CurrentUserContext.Provider>;
}
