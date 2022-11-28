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

// For state user
interface User {
	accessToken: string;
	id: number;
	role: "user" | "admin" | "";
	username: string;
}

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
	currentUser: User;
	updateCurrentUser: (userInfo: any) => void;
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

    // Logged in user info
	const [currentUser, setCurrentUser] = useState<User>({
		accessToken: "",
		id: 0,
		role: "",
		username: "",
	});

    // To save info of logged in user
	const updateCurrentUser = (userInfo: any) => {
		let role: "user" | "admin" | "" = "";

		if (userInfo.roleId === 1) {
			role = "user";
		} else if (userInfo.roleId === 2) {
			role = "admin";
		}

		setCurrentUser({
			...currentUser,
			accessToken: userInfo.access,
			id: userInfo.id,
			role: role,
			username: userInfo.username,
		});
	};

	// The states below store the API data for the current logged in user
	const [categories, setCategories] = useState<Category[]>([]);

	const [incomeRecords, setIncomeRecords] = useState<IncomeExpense[]>([]);

	const [expenseRecords, setExpenseRecords] = useState<IncomeExpense[]>([]);

	const [budgets, setBudgets] = useState<Budget[]>([]);

	async function getAllUserData() {
		// get categories data
		const allCategoriesResponse = getAllCategoriesAPI(currentUser.id);

		setCategories((await allCategoriesResponse).data);

		// get income data
		const allIncomeResponse = getAllIncomeAPI(currentUser.id);
		setIncomeRecords((await allIncomeResponse).data);

		// get expenses data
		const allExpensesResponse = getAllExpensesAPI(currentUser.id);
		setExpenseRecords((await allExpensesResponse).data);

		// get budget data
		const allBudgetResponse = getAllBudgetAPI(currentUser.id);
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
	}, [currentUser, refreshCurrentUserData]);

	return (
		<CurrentUserContext.Provider
			value={{
				currentUser,
				updateCurrentUser,
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
