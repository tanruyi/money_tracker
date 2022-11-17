/** @format */

import React, { useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { getAllCategoriesAPI } from "../apis/categories";
import { getAllIncomeAPI } from "../apis/income";
import { getAllExpensesAPI } from "../apis/expenses";
import { getAllBudgetAPI } from "../apis/budget";

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
export interface IncomeExpense {
	id: number;
	userId: number;
	date: Date;
	categoryId: number;
	amount: number;
	detail: string;
	note: string;
}

// For state budget
export interface Budget {
	id: number;
	userId: number;
	categoryId: number;
	amount: number;
	recordId: number;
	startMonth: Date;
	endMonth: Date;
}

interface CurrentUserContextProviderProps {
	children: ReactNode;
}

interface CurrentUserContextType {
	currentUserId: UserId;
	updateCurrentUser: (id: number) => void;
	currentUserRole: "user" | "admin";
	updateCurrentUserRole: (roleId: number) => void;
	currentUsername: string;
	updateUsername: (username: string) => void;
	refreshData: () => void;
	categories: Category[];
	incomeRecords: IncomeExpense[];
	expenseRecords: IncomeExpense[];
	budgets: Budget[];
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

	// If this is changed, rerun getAllUserData to get updated data from db
	const [refreshCurrentUserData, setRefreshCurrentUserData] = useState<number>(0);

	const refreshData = () => {
		setRefreshCurrentUserData((prevState) => (prevState += 1));
	};

	// This stores the id of the current logged in user
	const [currentUserId, setCurrentUserId] = useState<UserId>(0);

	const updateCurrentUser = (id: number) => setCurrentUserId(id);

	// This stores the role of the current logged in user
	const [currentUserRole, setCurrentUserRole] = useState<"user" | "admin">("user");

	const updateCurrentUserRole = (roleId: number) => {
		if (roleId === 1) {
			setCurrentUserRole("user");
		} else if (roleId === 2) {
			setCurrentUserRole("admin");
		}
	};

	const [currentUsername, setCurrentUsername] = useState("");

	const updateUsername = (username: string) => {
		setCurrentUsername(username);
	};

	// The states below store the API data for the current logged in user
	const [categories, setCategories] = useState<Category[]>([]);

	const [incomeRecords, setIncomeRecords] = useState<IncomeExpense[]>([]);

	const [expenseRecords, setExpenseRecords] = useState<IncomeExpense[]>([]);

	const [budgets, setBudgets] = useState<Budget[]>([]);

	async function getAllUserData() {
		// get categories data
		const allCategoriesResponse = getAllCategoriesAPI(currentUserId);

		setCategories((await allCategoriesResponse).data);

		// get income data
		const allIncomeResponse = getAllIncomeAPI(currentUserId);
		setIncomeRecords((await allIncomeResponse).data);

		// get expenses data
		const allExpensesResponse = getAllExpensesAPI(currentUserId);
		setExpenseRecords((await allExpensesResponse).data);

		// get budget data
		const allBudgetResponse = getAllBudgetAPI(currentUserId);
		setBudgets((await allBudgetResponse).data);
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

	return (
		<CurrentUserContext.Provider
			value={{
				currentUserId,
				updateCurrentUser,
				currentUserRole,
				updateCurrentUserRole,
				currentUsername,
				updateUsername,
				refreshData,
				categories,
				incomeRecords,
				expenseRecords,
				budgets,
			}}
		>
			{children}
		</CurrentUserContext.Provider>
	);
}
