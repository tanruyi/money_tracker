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

// Import validation middleware
const {
	validateCreateDefaultCategories,
	validateCreateCategory,
	validateGetCategories,
	validateUpdateCategory,
	validateDeleteCategory,
} = require("../validation/categories");

/* =========================================
// ROUTER
========================================= */

// Create default categories
categoriesRouter.post("/create_multiple", validateCreateDefaultCategories, createDefaultCategories);

// Create new category
categoriesRouter.post("/create", validateCreateCategory, createCategory);

// Get all categories for a user based on userId
categoriesRouter.get("/:userId", validateGetCategories, getCategories);

// Update a category
categoriesRouter.put("/:categoryId", validateUpdateCategory, updateCategory);

// Delete a category
categoriesRouter.delete("/delete", validateDeleteCategory, deleteCategory);

/* =========================================
// EXPORTS
========================================= */

module.exports = categoriesRouter;
