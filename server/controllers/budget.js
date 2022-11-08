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
		// Create new budget record
		const newBudgetRecord = await prisma.budget.create({
			data: {
				userId: req.body.userId,
				categoryId: req.body.categoryId,
				amount: req.body.amount,
				periodId: req.body.periodId,
			},
		});

		console.log(`New budget record created: ${newBudgetRecord.id}`);
		res.json({ status: "success", message: "new budget record created" });
	} catch (err) {
		console.log(`POST /budget/create ${err}`);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	createBudget,
};
