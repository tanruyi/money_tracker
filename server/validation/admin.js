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

// Deletes all data and account for a user
const validateDeleteAccount = [check("userId", "userId is required").not().isEmpty(), check("userId", "userId must be integer").isInt()];

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	validateDeleteAccount,
};
