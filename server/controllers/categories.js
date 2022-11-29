/**
 * /* ==============================================
 * // DEPENDENCIES
 * ==============================================
 *
 * @format
 */

// Import Prisma Client
const { PrismaClient } = require("@prisma/client");

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Import express validator
const { validationResult } = require("express-validator");

/* =========================================
// ROUTES
========================================= */

// Create multiple categories (only used during user registration)
const createDefaultCategories = async (req, res) => {
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const newCategories = await prisma.categories.createMany({
			data: req.body.newCategories,
		});

		console.log("Default categories created");
		res.json({ status: "success", message: "default categories created" });
	} catch (err) {
		console.error("POST /category/create", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Creates new category
const createCategory = async (req, res) => {
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const newCategory = await prisma.categories.create({
			data: {
				userId: req.body.userId,
				recordId: req.body.recordId,
				categoryName: req.body.categoryName,
			},
		});

		console.log(`New category created: ${newCategory.categoryName}`);
		res.json({ status: "success", message: "new category created" });
	} catch (err) {
		console.error("POST /category/create", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Get all categories for a user
const getCategories = async (req, res) => {
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

	// Convert userId passed via req.params from string to integer, which is the value type of userId in categories in db
	const targetUser = parseInt(req.params.userId);

	try {
		const categories = await prisma.categories.findMany({
			where: {
				userId: targetUser,
			},
		});

		console.log(`Successfully retrieved all categories for userId ${targetUser}`);
		res.json(categories);
	} catch (err) {
		console.error("GET /category/:useriId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Update a category for a user
const updateCategory = async (req, res) => {
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

	// Convert categoryId passed via req.params from string to integer, which is the value type of id in categories in db
	const targetCategory = parseInt(req.params.categoryId);

	try {
		const updatedCategory = await prisma.categories.update({
			where: {
				id: targetCategory,
			},
			data: {
				recordId: req.body.recordId,
				categoryName: req.body.categoryName,
			},
		});

		console.log(`Category updated for categoryId ${updatedCategory.id}`);
		res.json({ status: "success", message: "category updated" });
	} catch (err) {
		console.error("PUT /category/:categoryId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Delete a category
const deleteCategory = async (req, res) => {
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const deletedCategory = await prisma.categories.delete({
			where: {
				id: req.body.id,
			},
		});

		console.log(`Category deleted for categoryId ${deletedCategory.id}`);
		res.json({ status: "success", message: "category deleted" });
	} catch (err) {
		console.error("DELETE /category/delete", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	createCategory,
	createDefaultCategories,
	getCategories,
	updateCategory,
	deleteCategory,
};
