/** @format */

import dayjs, { Dayjs } from "dayjs";
import React from "react";
import styles from "./TransactionRows.module.css";
import { useCurrentUserContext, IncomeExpense } from "../context/currentUserContext";
import IncomeExpenseRow from "../components/IncomeExpenseRow";

interface TransactionRowsProps {
	recordType: "Income" | "Expenses";
	periodType: "Monthly" | "YTD";
	dateToDisplay: Dayjs;
}

const TransactionRows = ({ recordType, periodType, dateToDisplay }: TransactionRowsProps) => {
	/* ====================================================
    // Context
    ==================================================== */

	const { incomeRecords, expenseRecords } = useCurrentUserContext();

	/* ====================================================
    // Filtered Records for Period to Display
    ==================================================== */

	const recordsToFilter: IncomeExpense[] = recordType === "Income" ? incomeRecords : expenseRecords;

	// Filter records to those within period we want to display
	let recordsToDisplay: IncomeExpense[] = [];

	if (periodType === "YTD") {
		recordsToDisplay = recordsToFilter.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "year");
		});
	} else {
		recordsToDisplay = recordsToFilter.filter((record) => {
			const dateToCompare = dayjs(record.date);

			return dateToDisplay.isSame(dateToCompare, "month");
		});
	}

	/* ====================================================
    // List of Dates with Records for Displayed Period, Sorted in Descending Order
    ==================================================== */

	// Get list of unique dates from filtered records
	const datesWithRecordsSet = new Set();

	for (let i = 0; i < recordsToDisplay.length; i++) {
		datesWithRecordsSet.add(recordsToDisplay[i].date);
	}

	// Convert set back to array
	const datesWithRecords = Array.from(datesWithRecordsSet);

	// Sort array of dates in descending order
	const datesWithRecordsSorted = datesWithRecords.sort((date1, date2) => {
		const date1Object = new Date(String(date1));

		const date2Object = new Date(String(date2));

		return Number(date2Object) - Number(date1Object);
	});

	/* ====================================================
    // JSX to Display For Every Date With Transactions
    ==================================================== */

	const recordRowsForDisplay = datesWithRecordsSorted.map((date, index) => (
		<IncomeExpenseRow key={index} date={date} recordsToDisplay={recordsToDisplay} displayRecord={recordType} />
	));

	return <div className={styles.transactionsRowsContainer}>{recordRowsForDisplay}</div>;
};

export default TransactionRows;
