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

// Create new budget record
const createBudget = async (req, res) => {
	try {
		const newBudgetRecord = await prisma.budget.create({
			data: {
				userId: req.body.userId,
				categoryId: req.body.categoryId,
				amount: req.body.amount,
				recordId: req.body.recordId,
				startMonth: req.body.startMonth,
				endMonth: req.body.endMonth,
			},
		});

		console.log(`New budget record created: ${newBudgetRecord.id}`);
		res.json({ status: "success", message: "new budget record created" });
	} catch (err) {
		console.error("POST /budget/create", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Get all budget records for a user
const getBudgetRecords = async (req, res) => {
	// Convert userId passed via req.params from string to integer, which is the value type of userId in expenses in db
	const targetUser = parseInt(req.params.userId);

	try {
		const allBudgetRecords = await prisma.budget.findMany({
			where: {
				userId: targetUser,
			},
		});

		console.log(`Successfully retrieved all budget records for userId ${targetUser}`);
		res.json(allBudgetRecords);
	} catch (err) {
		console.error("GET /budget/:userId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Update a budget record for a user
const updateBudgetRecord = async (req, res) => {
	// Convert budgetId passed via req.params from string to integer, which is the value type of id in budget in db
	const targetBudgetRecord = parseInt(req.params.budgetId);

	try {
		const updatedBudgetRecord = await prisma.budget.update({
			where: {
				id: targetBudgetRecord,
			},
			data: {
				categoryId: req.body.categoryId,
				amount: req.body.amount,
				recordId: req.body.recordId,
				startMonth: req.body.startMonth,
				endMonth: req.body.endMonth,
			},
		});

		console.log(`Category updated for budgetId ${updatedBudgetRecord.id}`);
		res.json({ status: "success", message: "budget record updated" });
	} catch (err) {
		console.error("PUT /budget/:budgetId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Delete a budget record
const deleteBudgetRecord = async (req, res) => {
	// Convert budgetId passed via req.params from string to integer, which is the value type of id in budget in db
	// const targetBudgetRecord = parseInt(req.params.budgetId);

	// Checks whether id is provided, if not throw error
	if (!req?.body?.id) {
		return res.status(400).json({ status: "error", message: "id not provided" });
	}

	try {
		const deletedBudgetRecord = await prisma.budget.delete({
			where: {
				id: req.body.id,
			},
		});

		console.log(`Budget record deleted for budgetId ${deletedBudgetRecord.id}`);
		res.json({ status: "success", message: "budget record deleted" });
	} catch (err) {
		console.error("DELETE /budget/delete", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	createBudget,
	getBudgetRecords,
	updateBudgetRecord,
	deleteBudgetRecord,
};
