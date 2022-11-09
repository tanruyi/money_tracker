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
const budgetRouter = express.Router();

// Import routes
const { createBudget, getBudgetRecords, updateBudgetRecord, deleteBudgetRecord } = require("../controllers/budget");

/* =========================================
// ROUTER
========================================= */

// Create new budget record
budgetRouter.post("/create", createBudget);

// Get all budget records for a user based on userId
budgetRouter.get("/:userId", getBudgetRecords);

// Update a budget record
budgetRouter.put("/:budgetId", updateBudgetRecord);

// Delete a budget record
budgetRouter.delete("/delete", deleteBudgetRecord);

/* =========================================
// EXPORTS
========================================= */

module.exports = budgetRouter;
