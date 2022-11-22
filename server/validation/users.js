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

// New user creation
const validateCreateUser = [
	check("username", "username is required").not().isEmpty(),
	check("username", "username must be max 20 characters").isLength({ min: 0, max: 20 }),
	check("password", "password is required").not().isEmpty(),
];

const validateLogIn = [check("username", "username is required").not().isEmpty(), check("password", "password is required").not().isEmpty()];

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	validateCreateUser,
	validateLogIn,
};
