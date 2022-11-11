/** @format */

import React, { useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { getAllCategoriesAPI } from "../apis/categories";
import { getAllIncomeAPI } from "../apis/income";

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

// For state income
interface Income {
	id: number;
	userId: number;
	date: Date;
	categoryId: number;
	amount: number;
	detail: string;
	note: string;
}

interface CurrentUserContextProviderProps {
	children: ReactNode;
}

interface CurrentUserContextType {
	currentUserId: UserId;
	updateCurrentUser: (id: number) => void;
	refreshData: () => void;
	categories: Category[];
	incomeRecords: Income[];
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

	// If this is true, rerun getAllUserData to get updated data from db
	const [refreshCurrentUserData, setRefreshCurrentUserData] = useState<number>(0);

	const refreshData = () => {
		// Change to true
		setRefreshCurrentUserData((prevState) => (prevState += 1));
	};

	// The states below store the API data for the current logged in user
	const [categories, setCategories] = useState<Category[]>([]);

	const [incomeRecords, setIncomeRecords] = useState<Income[]>([]);

	const [expenseRecords, setExpenseRecords] = useState([]);

	const [budgets, setBudgets] = useState([]);

	async function getAllUserData() {
		// get categories data
		const allCategoriesResponse = getAllCategoriesAPI(currentUserId);

		setCategories((await allCategoriesResponse).data);

		// get income data
		const allIncomeResponse = getAllIncomeAPI(currentUserId);
		setIncomeRecords((await allIncomeResponse).data);

		console.log("getAllUserData");
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
	}, [currentUserId, refreshCurrentUserData]);

	return <CurrentUserContext.Provider value={{ currentUserId, updateCurrentUser, refreshData, categories, incomeRecords }}>{children}</CurrentUserContext.Provider>;
}
