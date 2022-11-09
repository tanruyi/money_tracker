/**
 * /* ==============================================
 * // DEPENDENCIES
 * ==============================================
 *
 * @format
 */

// Import Express
const express = require("express");

// Instantiate Express Router
const expenseRouter = express.Router();

// Import routes
const { createExpenseRecord, getExpenseRecords, updateExpenseRecord, deleteExpenseRecord } = require("../controllers/expenses");

/* =========================================
// ROUTER
========================================= */

// Create new expense record
expenseRouter.post("/create", createExpenseRecord);

// Get all expense records for a user based on userId
expenseRouter.get("/:userId", getExpenseRecords);

// Update a expense record
expenseRouter.put("/:expenseId", updateExpenseRecord);

// Delete a expense record
expenseRouter.delete("/:expenseId", deleteExpenseRecord);

/* =========================================
// EXPORTS
========================================= */

module.exports = expenseRouter;
