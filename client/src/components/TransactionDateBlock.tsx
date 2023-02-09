/** @format */

import styles from "./TransactionDateBlock.module.css";
import dayjs from "dayjs";
import { intToCurrencyString } from "../utilities/utilityFunctions";
import { IncomeExpense } from "../context/currentUserContext";
import TransactionRow from "./TransactionRow";

/* ====================================================
// Type Declaration
==================================================== */

interface TransactionDateBlockProps {
	date: any;
	recordsToDisplay: IncomeExpense[];
	recordType: "Income" | "Expenses";
}

const TransactionDateBlock = ({ date, recordsToDisplay, recordType }: TransactionDateBlockProps) => {
	/* ====================================================
    // Row Header - Date
    ==================================================== */

	const dateHeader = dayjs(date).format("DD MMM YYYY");

	/* ====================================================
    // Filter For Every Transaction Under Given Date
    ==================================================== */

	// Filter records to those that match the date to be displayed
	const recordsForDate = recordsToDisplay.filter((record) => record.date === date);

	/* ====================================================
    // Row Header - Date
    ==================================================== */

	// This is the total amount to display, will show "-" sign if expenses
	let totalAmountForDate = 0;

	for (let i = 0; i < recordsForDate.length; i++) {
		totalAmountForDate += Number(recordsForDate[i].amount);
	}

	let totalAmountForDateString = `$${intToCurrencyString(totalAmountForDate)}`;

	if (recordType === "Expenses") {
		totalAmountForDateString = `-$${intToCurrencyString(totalAmountForDate)}`;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.headerDate}>
					<h2>{dateHeader}</h2>
					<hr />
				</div>
				<h2 className={styles.headerAmount}>{totalAmountForDateString}</h2>
			</div>

			{recordsForDate.map((record) => {
				return <TransactionRow record={record} recordType={recordType} />;
			})}
		</div>
	);
};

export default TransactionDateBlock;
