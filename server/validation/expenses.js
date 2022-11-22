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

// Creates new expense record
const validateCreateExpenseRecord = [
	check("userId", "userId is required").not().isEmpty(),
	check("userId", "userId must be integer").isInt(),
	check("date", "date is required").not().isEmpty(),
	check("date", "date must be date").isDate(),
	check("categoryId", "categoryId is required").not().isEmpty(),
	check("categoryId", "categoryId must be integer").isInt(),
	check("amount", "amount is required").not().isEmpty(),
	check("amount", "amount must be float").isFloat(),
	check("detail", "detail must be max 50 characters").isLength({ min: 0, max: 50 }),
	check("note", "note must be max 200 characters").isLength({ min: 0, max: 200 }),
];

// Get all expense records for a user
const validateGetExpenseRecords = [check("userId", "userId must be integer").isInt()];

// Update a expense record for a user
const validateUpdateExpenseRecord = [
	check("incomeId", "incomeId must be integer").isInt(),
	check("date", "date must be date").isDate().optional(),
	check("categoryId", "categoryId must be integer").isInt().optional(),
	check("amount", "amount must be float").isFloat().optional(),
	check("detail", "detail must be max 50 characters").isLength({ min: 0, max: 50 }).optional(),
	check("note", "note must be max 200 characters").isLength({ min: 0, max: 200 }).optional(),
];

// Delete a expense record
const validateDeleteExpenseRecord = [check("id", "id is required").not().isEmpty(), check("id", "id must be integer").isInt()];

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	validateCreateExpenseRecord,
	validateGetExpenseRecords,
	validateUpdateExpenseRecord,
	validateDeleteExpenseRecord,
};
