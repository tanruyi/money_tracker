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

// Creates new income record
const createIncomeRecord = async (req, res) => {
	// Convert date passed via req.body to Date object, which is the value type of date in income in db
	const newDate = new Date(req.body.date);

	try {
		const newIncomeRecord = await prisma.income.create({
			data: {
				userId: req.body.userId,
				date: newDate,
				categoryId: req.body.categoryId,
				amount: req.body.amount,
				detail: req.body.detail,
				note: req.body.note,
			},
		});

		console.log(`New income record created: id ${newIncomeRecord.id}`);
		res.json({ status: "success", message: "new income record created" });
	} catch (err) {
		console.error("POST /income/create", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Get all income records for a user
const getIncomeRecords = async (req, res) => {
	// Convert userId passed via req.params from string to integer, which is the value type of userId in income in db
	const targetUser = parseInt(req.params.userId);

	try {
		const allIncomeRecords = await prisma.income.findMany({
			where: {
				userId: targetUser,
			},
		});

		console.log(`Successfully retrieved all income records for userId ${targetUser}`);
		res.json(allIncomeRecords);
	} catch (err) {
		console.error("GET /income/:userId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Update a income record for a user
const updateIncomeRecord = async (req, res) => {
	// Convert incomeId passed via req.params from string to integer, which is the value type of id in income in db
	const targetIncomeRecord = parseInt(req.params.incomeId);

	// Convert date passed via req.body to Date object, which is the value type of date in income in db
	const newDate = new Date(req.body.date);

	try {
		const updatedIncomeRecord = await prisma.income.update({
			where: {
				id: targetIncomeRecord,
			},
			data: {
				date: newDate,
				categoryId: req.body.categoryId,
				amount: req.body.amount,
				detail: req.body.detail,
				note: req.body.note,
			},
		});

		console.log(`Category updated for incomeId ${updatedIncomeRecord.id}`);
		res.json({ status: "success", message: "income record updated" });
	} catch (err) {
		console.error("PUT /income/:incomeId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Delete a income record
const deleteIncomeRecord = async (req, res) => {
	// Convert incomeId passed via req.params from string to integer, which is the value type of id in income in db
	const targetIncomeRecord = parseInt(req.params.incomeId);

	try {
		const deletedIncomeRecord = await prisma.income.delete({
			where: {
				id: targetIncomeRecord,
			},
		});

		console.log(`Income record deleted for incomeId ${deletedIncomeRecord.id}`);
		res.json({ status: "success", message: "income record deleted" });
	} catch (err) {
		console.error("DELETE /income/:incomeId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	createIncomeRecord,
	getIncomeRecords,
	updateIncomeRecord,
	deleteIncomeRecord,
};
