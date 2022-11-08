/**
 * /* ==============================================
 * // DEPENDENCIES
 * ==============================================
 *
 * @format
 */

// For .env files
require("dotenv").config();

// Import Prisma Client
const { PrismaClient } = require("@prisma/client");

// Instantiate PrismaClient
const prisma = new PrismaClient();

// Import bcrypt
const bcrypt = require("bcrypt");

// Import JWT
const jwt = require("jsonwebtoken");

// Import UUID
const { v4: uuidv4 } = require("uuid");

/* =========================================
// ROUTES
========================================= */

// New user creation
const createUser = async (req, res) => {
	try {
		// check if the username already exists
		const userExists = await prisma.users.findUnique({
			where: {
				username: req.body.username,
			},
		});

		// Returns error message if the username already exists
		if (userExists) {
			return res.status(400).json({ status: "error", message: "this username is already taken!" });
		}

		// Hash the password 12 times
		const hashedPW = await bcrypt.hash(req.body.password, 12);

		const newUser = await prisma.users.create({
			data: {
				username: req.body.username,
				password: hashedPW,
			},
		});

		console.log(`New user created: ${newUser.username}`);
		res.json({ status: "success", message: "new user created" });
	} catch (err) {
		console.log(`PUT /users/create ${err}`);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Log in
const logIn = async (req, res) => {
	try {
		// check if the username already exists, and returns null if none found
		const user = await prisma.users.findUnique({
			where: {
				username: req.body.username,
			},
		});

		// Returns error message if the username does not exist
		if (!user) {
			return res.status(401).json({ status: "error", message: "no such username exists" });
		}

		// Check whether password is correct
		const result = await bcrypt.compare(req.body.password, user.password);

		// Returns error message if password is incorrect
		if (!result) {
			console.log("username or password error");

			return res.status(401).json({ status: "error", message: "username or password incorrect" });
		}

		// Create payload for JWT
		const payload = {
			id: user.id,
			username: user.username,
		};

		// Create JWT access token
		const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
			expiresIn: "20m",
			jwtid: uuidv4(),
		});

		// Create JWT refresh token
		const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
			expiresIn: "20m",
			jwtid: uuidv4(),
		});

		// Send back the JWT access & refresh tokens
		const response = {
			access,
			refresh,
		};

		console.log("login success");
		res.json(response);
	} catch (err) {
		console.log("POST /users/login", err);
		res.status(400).json({ status: "error", message: "login failed" });
	}
};

// Refresh JWT access token
const refreshAccessToken = (req, res) => {
	try {
		// Check that refresh token is correct
		const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

		// Create payload for new access token
		const payload = {
			id: decoded.id,
			username: decoded.username,
		};

		// Create new access token
		const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
			expiresIn: "20m",
			jwtid: uuidv4(),
		});

		// Send back the new JWT access tokens
		const response = {
			access,
		};

		console.log("refresh success");
		res.json(response);
	} catch (err) {
		console.log("POST /users/refresh", err);
		res.status(401).json({
			status: "error",
			message: "unauthorised",
		});
	}
};

// async function main() {
// 	const allUsers = await prisma.users.findMany();
// 	console.log(allUsers);
// }

// main()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});

/* =========================================
// EXPORTS
========================================= */

module.exports = {
	createUser,
	logIn,
	refreshAccessToken,
};
