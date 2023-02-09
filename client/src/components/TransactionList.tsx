/** @format */

import dayjs, { Dayjs } from "dayjs";
import styles from "./TransactionList.module.css";
import { useCurrentUserContext, IncomeExpense } from "../context/currentUserContext";
import TransactionDateBlock from "./TransactionDateBlock";
import { useState } from "react";

interface TransactionListProps {
	recordType: "Income" | "Expenses";
	periodType: "Monthly" | "YTD";
	dateToDisplay: Dayjs;
}

const TransactionList = ({ recordType, periodType, dateToDisplay }: TransactionListProps) => {
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

	return (
		<div className={styles.transactionsRowsContainer}>
			{datesWithRecordsSorted.map((date, index) => (
				<TransactionDateBlock key={index} date={date} recordsToDisplay={recordsToDisplay} recordType={recordType} />
			))}
		</div>
	);
};

export default TransactionList;
