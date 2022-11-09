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

/* =========================================
// ROUTER
========================================= */

// Create new income record
incomeRouter.post("/create", createIncomeRecord);

// Get all income records for a user based on userId
incomeRouter.get("/:userId", getIncomeRecords);

// Update a income record
incomeRouter.put("/:incomeId", updateIncomeRecord);

// Delete a income record
incomeRouter.delete("/delete", deleteIncomeRecord);

/* =========================================
// EXPORTS
========================================= */

module.exports = incomeRouter;
