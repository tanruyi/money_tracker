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

/* =========================================
// ROUTER
========================================= */

// New user creation
usersRouter.put("/create", createUser);

// Log in
usersRouter.post("/login", logIn);

// Refresh JWT access token
usersRouter.post("/refresh", refreshAccessToken);

/* =========================================
// EXPORTS
========================================= */

module.exports = usersRouter;
