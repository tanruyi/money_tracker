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
const categoriesRouter = express.Router();

// Import routes
const { createCategory, createDefaultCategories, getCategories, updateCategory, deleteCategory } = require("../controllers/categories");

/* =========================================
// ROUTER
========================================= */

// Create default categories
categoriesRouter.post("/create_multiple", createDefaultCategories);

// Create new category
categoriesRouter.post("/create", createCategory);

// Get all categories for a user based on userId
categoriesRouter.get("/:userId", getCategories);

// Update a category
categoriesRouter.put("/:categoryId", updateCategory);

// Delete a category
categoriesRouter.delete("/delete", deleteCategory);

/* =========================================
// EXPORTS
========================================= */

module.exports = categoriesRouter;
