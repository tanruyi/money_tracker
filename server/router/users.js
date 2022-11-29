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
const usersRouter = express.Router();

// Import routes
const { createUser, logIn, refreshAccessToken } = require("../controllers/users");

// Import validation middleware
const { validateCreateUser, validateLogIn } = require("../validation/users");

// Import authentication middleware
const verifyAccessToken = require("../middleware/verifyAccessToken");

/* =========================================
// ROUTER
========================================= */

// New user creation
usersRouter.put("/create", validateCreateUser, createUser);

// Log in
usersRouter.post("/login", validateLogIn, logIn);

// Refresh JWT access token
usersRouter.post("/refresh", refreshAccessToken);

/* =========================================
// EXPORTS
========================================= */

module.exports = usersRouter;
