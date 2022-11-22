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

// Import validation middleware
const { validateCreateExpenseRecord, validateGetExpenseRecords, validateUpdateExpenseRecord, validateDeleteExpenseRecord } = require("../validation/expenses");

/* =========================================
// ROUTER
========================================= */

// Create new expense record
expenseRouter.post("/create", validateCreateExpenseRecord, createExpenseRecord);

// Get all expense records for a user based on userId
expenseRouter.get("/:userId", validateGetExpenseRecords, getExpenseRecords);

// Update a expense record
expenseRouter.put("/:expenseId", validateUpdateExpenseRecord, updateExpenseRecord);

// Delete a expense record
expenseRouter.delete("/delete", validateDeleteExpenseRecord, deleteExpenseRecord);

/* =========================================
// EXPORTS
========================================= */

module.exports = expenseRouter;
