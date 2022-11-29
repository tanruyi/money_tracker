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

// Import validation middleware
const { validateCreateBudget, validateGetBudgetRecords, validateUpdateBudgetRecord, validateDeleteBudgetRecord } = require("../validation/budget");

// Import authentication middleware
const verifyAccessToken = require("../middleware/verifyAccessToken");

/* =========================================
// ROUTER
========================================= */

// Create new budget record
budgetRouter.post("/create", verifyAccessToken, validateCreateBudget, createBudget);

// Get all budget records for a user based on userId
budgetRouter.get("/:userId", verifyAccessToken, validateGetBudgetRecords, getBudgetRecords);

// Update a budget record
budgetRouter.put("/:budgetId", verifyAccessToken, validateUpdateBudgetRecord, updateBudgetRecord);

// Delete a budget record
budgetRouter.delete("/delete", verifyAccessToken, validateDeleteBudgetRecord, deleteBudgetRecord);

/* =========================================
// EXPORTS
========================================= */

module.exports = budgetRouter;
