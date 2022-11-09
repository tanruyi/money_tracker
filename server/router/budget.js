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
const { createBudget } = require("../controllers/budget");

const auth = require("../middleware/auth");

/* =========================================
// ROUTER
========================================= */

// Create new budget record
budgetRouter.post("/create", createBudget);

/* =========================================
// EXPORTS
========================================= */

module.exports = budgetRouter;
