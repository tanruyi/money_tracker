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

/* =========================================
// ROUTES
========================================= */

// Creates new category
const createCategory = async (req, res) => {
	try {
		const newCategory = await prisma.categories.create({
			data: {
				userId: req.body.userId,
				typeId: req.body.typeId,
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
	// Convert categoryId passed via req.params from string to integer, which is the value type of id in categories in db
	const targetCategory = parseInt(req.params.categoryId);

	try {
		const updatedCategory = await prisma.categories.update({
			where: {
				id: targetCategory,
			},
			data: {
				typeId: req.body.typeId,
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
	// Convert categoryId passed via req.params from string to integer, which is the value type of id in categories in db
	const targetCategory = parseInt(req.params.categoryId);

	try {
		const deletedCategory = await prisma.categories.delete({
			where: {
				id: targetCategory,
			},
		});

		console.log(`Category deleted for categoryId ${deletedCategory.id}`);
		res.json({ status: "success", message: "category deleted" });
	} catch (err) {
		console.error("DELETE /category/:categoryId", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

/* =========================================
// EXPORTS
========================================= */
module.exports = {
	createCategory,
	getCategories,
	updateCategory,
	deleteCategory,
};
