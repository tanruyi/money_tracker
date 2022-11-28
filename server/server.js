/**
 * /* ==============================================
 * // DEPENDENCIES
 * ==============================================
 *
 * @format
 */

// For .env files
require("dotenv").config();

// Imports CORS
const cors = require("cors");

// Imports body-parser
const bodyParser = require("body-parser");

// Import Express
const express = require("express");
const { response } = require("express");

// Instantiates a express server
const app = express();

// Import users router
const usersRouter = require("./router/users");

// Import categories router
const categoriesRouter = require("./router/categories");

// Import income router
const incomeRouter = require("./router/income");

// Import expense router
const expenseRouter = require("./router/expenses");

// Import budget router
const budgetRouter = require("./router/budget");

// Import admin router
const adminRouter = require("./router/admin");

/* ==============================================
// MIDDLEWARE
============================================== */

// Allows only cross-origin requests from specified URL
app.use(
	cors({
		origin: process.env.ALLOWED_ORIGINS,
	})
);

// Parses all incoming req.body from JSON to JavaScript Object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* ==============================================
// ROUTES
============================================== */

// Users router
app.use("/users", usersRouter);

// Categories router
app.use("/categories", categoriesRouter);

// Income router
app.use("/income", incomeRouter);

// Expenses router
app.use("/expense", expenseRouter);

// Budget router
app.use("/budget", budgetRouter);

// Admin router
app.use("/admin", adminRouter);

// Catch all
app.get("/", (req, res) => {
	console.log("connected!");
	res.send("Express server is up!");
});

/* ==============================================
// CONNECTIONS
============================================== */

// Express server
app.listen(process.env.PORT);
