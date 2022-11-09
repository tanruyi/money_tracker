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
const adminRouter = express.Router();

// Import routes
const { deleteAccount, resetPw } = require("../controllers/admin");

/* =========================================
// ROUTER
========================================= */

// Reset password
adminRouter.patch("/reset_pw", resetPw);

// Deletes all data and account for a user
adminRouter.delete("/delete_account", deleteAccount);

/* =========================================
// EXPORTS
========================================= */

module.exports = adminRouter;
