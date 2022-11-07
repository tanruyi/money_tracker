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

// Import Prisma Client
const { PrismaClient } = require("@prisma/client");

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Import Express
const express = require("express");
const { response } = require("express");

// Instantiates a express server
const app = express();

/* ==============================================
// MIDDLEWARE
============================================== */

// Enables all CORS requests
app.use(cors());

// Parses all incoming req.body from JSON to JavaScript Object
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* ==============================================
// ROUTES
============================================== */

async function main() {
	const allUsers = await prisma.users.findMany();
	console.log(allUsers);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

/* ==============================================
// CONNECTIONS
============================================== */

// Express server
app.listen(process.env.PORT);
