/**
 * /* ==============================================
 * // DEPENDENCIES
 * ==============================================
 *
 * @format
 */

// Import express validator
const { check } = require("express-validator");

/* =========================================
// MIDDLEWARE VALIDATORS
========================================= */

// Create new budget record
const validateCreateBudget = [
	check("userId", "userId is required").not().isEmpty(),
	check("userId", "userId must be integer").isInt(),
	check("categoryId", "categoryId is required").not().isEmpty(),
	check("categoryId", "categoryId must be integer").isInt(),
	check("amount", "amount is required").not().isEmpty(),
	check("amount", "amount must be float").isFloat(),
	check("recordId", "recordId is required").not().isEmpty(),
	check("recordId", "recordId must be integer").isInt(),
	check("startMonth", "startMonth is required").not().isEmpty(),
	check("endMonth", "endMonth is required").not().isEmpty(),
];

// Get all budget records for a user
const validateGetBudgetRecords = [check("userId", "userId must be integer").isInt()];

// Update a budget record for a user
const validateUpdateBudgetRecord = [
	check("budgetId", "budgetId is required").not().isEmpty(),
	check("budgetId", "budgetId must be integer").isInt(),
	check("categoryId", "categoryId must be integer").isInt().optional(),
	check("amount", "amount must be float").isFloat().optional(),
	check("recordId", "recordId must be integer").isInt().optional(),
];

// Delete a budget record
const validateDeleteBudgetRecord = [check("id", "id is required").not().isEmpty(), check("id", "id must be integer").isInt()];

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	validateCreateBudget,
	validateGetBudgetRecords,
	validateUpdateBudgetRecord,
	validateDeleteBudgetRecord,
};
