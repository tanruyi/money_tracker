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

// Create multiple categories (only used during user registration)
const validateCreateDefaultCategories = [
	check("newCategories.*.userId", "userId is required").not().isEmpty(),
	check("newCategories.*.userId", "userId must be integer").isInt(),
	check("newCategories.*.recordId", "recordId is required").not().isEmpty(),
	check("newCategories.*.recordId", "recordId must be integer").isInt(),
	check("newCategories.*.categoryName", "categoryName is required").not().isEmpty(),
	check("newCategories.*.categoryName", "categoryName must be max 30 characters").isLength({ min: 0, max: 30 }),
];

// Creates new category
const validateCreateCategory = [
	check("userId", "userId is required").not().isEmpty(),
	check("userId", "userId must be integer").isInt(),
	check("recordId", "recordId is required").not().isEmpty(),
	check("recordId", "recordId must be integer").isInt(),
	check("categoryName", "categoryName is required").not().isEmpty(),
	check("categoryName", "categoryName must be max 30 characters").isLength({ min: 0, max: 30 }),
];

// Get all categories for a user
const validateGetCategories = [check("userId", "userId must be integer").isInt()];

// Update a category for a user
const validateUpdateCategory = [
	check("categoryId", "categoryId must be integer").isInt(),
	check("recordId", "recordId must be integer").isInt().optional(),
	check("categoryName", "categoryName must be max 30 characters").isLength({ min: 0, max: 30 }).optional(),
];

// Delete a category
const validateDeleteCategory = [check("id", "id is required").not().isEmpty(), check("id", "id must be integer").isInt()];

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	validateCreateDefaultCategories,
	validateCreateCategory,
	validateGetCategories,
	validateUpdateCategory,
	validateDeleteCategory,
};
