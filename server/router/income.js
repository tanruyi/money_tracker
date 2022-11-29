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
const incomeRouter = express.Router();

// Import routes
const { createIncomeRecord, getIncomeRecords, updateIncomeRecord, deleteIncomeRecord } = require("../controllers/income");

// Import validation middleware
const { validateCreateIncomeRecord, validateGetIncomeRecords, validateUpdateIncomeRecord, validateDeleteIncomeRecord } = require("../validation/income");

// Import authentication middleware
const verifyAccessToken = require("../middleware/verifyAccessToken");

/* =========================================
// ROUTER
========================================= */

// Create new income record
incomeRouter.post("/create", verifyAccessToken, validateCreateIncomeRecord, createIncomeRecord);

// Get all income records for a user based on userId
incomeRouter.get("/:userId", verifyAccessToken, validateGetIncomeRecords, getIncomeRecords);

// Update a income record
incomeRouter.put("/:incomeId", verifyAccessToken, validateUpdateIncomeRecord, updateIncomeRecord);

// Delete a income record
incomeRouter.delete("/delete", verifyAccessToken, validateDeleteIncomeRecord, deleteIncomeRecord);

/* =========================================
// EXPORTS
========================================= */

module.exports = incomeRouter;
