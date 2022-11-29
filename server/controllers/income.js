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

// Import express validator
const { validationResult } = require("express-validator");

/* =========================================
// ROUTES
========================================= */

// Creates new income record
const createIncomeRecord = async (req, res) => {
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

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
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

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
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

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
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const deletedIncomeRecord = await prisma.income.delete({
			where: {
				id: req.body.id,
			},
		});

		console.log(`Income record deleted for incomeId ${deletedIncomeRecord.id}`);
		res.json({ status: "success", message: "income record deleted" });
	} catch (err) {
		console.error("DELETE /income/delete", err);
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
