/** @format */

import React, { useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { getAllCategories } from "../apis/categories";

/* ====================================================
// Type Declaration
==================================================== */

// For state currentUserId
type UserId = number;

// For state categories
export interface Category {
	id: number;
	userId: number;
	recordId: number;
	categoryName: string;
}

interface CurrentUserContextProviderProps {
	children: ReactNode;
}

interface CurrentUserContextType {
	currentUserId: UserId;
	updateCurrentUser: (id: number) => void;
	categories: Category[];
}

/* ====================================================
// Context Creation
==================================================== */

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
	const [error, setError] = useState<any>();

	// This stores the id of the current logged in user
	const [currentUserId, setCurrentUserId] = useState<UserId>(0);

	const updateCurrentUser = (id: number) => setCurrentUserId(id);

	// The states below store the API data for the current logged in user
	const [categories, setCategories] = useState<Category[]>([]);

	const [incomeRecords, setIncomeRecords] = useState([]);

	const [expenseRecords, setExpenseRecords] = useState([]);

	const [budgets, setBudgets] = useState([]);

	async function getAllUserData() {
		const allCategoriesResponse = getAllCategories(currentUserId);
		setCategories((await allCategoriesResponse).data);
	}

	useEffect(() => {
		try {
			const response = getAllUserData();
		} catch (err) {
			if (typeof err === "string") {
				setError(err);
			} else if (err instanceof Error) {
				setError(err.message);
			}
		}
	}, [currentUserId]);

	return <CurrentUserContext.Provider value={{ currentUserId, updateCurrentUser, categories }}>{children}</CurrentUserContext.Provider>;
}
