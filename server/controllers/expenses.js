/**
 * /* ==============================================
 * // DEPENDENCIES
 * ==============================================
 *
 * @format
 */

// Import Prisma Client
const { PrismaClient } = require("@prisma/client");

// Instantiate PrismaClient
const prisma = new PrismaClient();

/* =========================================
// ROUTES
========================================= */

// Creates new expense record
const createExpenseRecord = async (req, res) => {
	// Convert date passed via req.body to Date object, which is the value type of date in expenses in db
	const newDate = new Date(req.body.date);

	try {
		const newExpenseRecord = await prisma.expenses.create({
			data: {
				userId: req.body.userId,
				date: newDate,
				categoryId: req.body.categoryId,
				amount: req.body.amount,
				detail: req.body.detail,
				note: req.body.note,
			},
		});

		console.log(`New expense record created: id ${newExpenseRecord.id}`);
		res.json({ status: "success", message: "new expense record created" });
	} catch (err) {
		console.error("POST /expense/create", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Get all expense records for a user
const getExpenseRecords = async (req, res) => {
	// Convert userId passed via req.params from string to integer, which is the value type of userId in expenses in db
	const targetUser = parseInt(req.params.userId);

	try {
		const allExpenseRecords = await prisma.expenses.findMany({
			where: {
				userId: targetUser,
			},
		});

		console.log(`Successfully retrieved all expense records for userId ${targetUser}`);
		res.json(allExpenseRecords);
	} catch (err) {
		console.error("GET /expense/:userId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Update a expense record for a user
const updateExpenseRecord = async (req, res) => {
	// Convert expenseId passed via req.params from string to integer, which is the value type of id in expenses in db
	const targetExpenseRecord = parseInt(req.params.expenseId);

	// Convert date passed via req.body to Date object, which is the value type of date in expenses in db
	const newDate = new Date(req.body.date);

	try {
		const updatedExpenseRecord = await prisma.expenses.update({
			where: {
				id: targetExpenseRecord,
			},
			data: {
				date: newDate,
				categoryId: req.body.categoryId,
				amount: req.body.amount,
				detail: req.body.detail,
				note: req.body.note,
			},
		});

		console.log(`Category updated for expenseId ${updatedExpenseRecord.id}`);
		res.json({ status: "success", message: "expense record updated" });
	} catch (err) {
		console.error("PUT /expense/:expenseId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Delete a expense record
const deleteExpenseRecord = async (req, res) => {
	// Convert expenseId passed via req.params from string to integer, which is the value type of id in expenses in db
	// const targetExpenseRecord = parseInt(req.params.expenseId);

	// Checks whether id is provided, if not throw error
	if (!req?.body?.id) {
		return res.status(400).json({ status: "error", message: "id not provided" });
	}

	try {
		const deletedExpenseRecord = await prisma.expenses.delete({
			where: {
				id: req.body.id,
			},
		});

		console.log(`Expense record deleted for expenseId ${deletedExpenseRecord.id}`);
		res.json({ status: "success", message: "expense record deleted" });
	} catch (err) {
		console.error("DELETE /expense/delete", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	createExpenseRecord,
	getExpenseRecords,
	updateExpenseRecord,
	deleteExpenseRecord,
};
