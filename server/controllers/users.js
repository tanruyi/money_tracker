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

// Import express validator
const { validationResult } = require("express-validator");

/* =========================================
// ROUTES
========================================= */

// New user creation
const createUser = async (req, res) => {
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		// Username must start with an alphabet and end with any combination of alphabets, numbers, hyphens & underscores between 3 to 19 characters.
		// Username can have min 4 characters & max 20 characters
		const userRegex = /^[A-Za-z][a-zA-Z0-9-_]{3,19}$/;
		// Username can be a combination of alphabets, numbers & special characters, and must be min 8 & max 24 characters
		const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,24}$/;

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
				roleId: req.body.roleId,
			},
		});

		console.log(`New user created: ${newUser.username}`);
		res.json({ status: "success", message: "new user created", userId: newUser.id });
	} catch (err) {
		console.error("PUT /users/create", err);
		res.status(400).json({ status: "error", message: "an error has occurred" });
	}
};

// Log in
const logIn = async (req, res) => {
	// validation - check for errors
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(400).json({ errors: errors.array() });
	}

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
			roleId: user.roleId,
		};

		// Create JWT access token
		const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
			expiresIn: "20m",
			jwtid: uuidv4(),
		});

		// Create JWT refresh token
		const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
			expiresIn: "24h",
			jwtid: uuidv4(),
		});

		// Save refresh token in db
		const updatedUser = await prisma.users.update({
			where: {
				id: user.id,
			},
			data: {
				refreshToken: refresh,
			},
		});

		// Create secure cookie containing refresh token to be sent back to client, expires in 24 hours
		res.cookie("jwt", refresh, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });

		// Send back the JWT access & refresh tokens
		const response = {
			access,
			id: user.id,
			username: user.username,
			roleId: user.roleId,
		};

		console.log(`login success for ${user.username} id: ${user.id}`);
		res.json(response);
	} catch (err) {
		console.error("POST /users/login", err);
		res.status(400).json({ status: "error", message: "login failed" });
	}
};

// Refresh JWT access token
const refreshAccessToken = async (req, res) => {
	// Checks whether refresh token is provided, if not throw error
	if (!req.cookies?.jwt) {
		return res.status(401).json({ status: "error", message: "no refresh token in cookies" });
	}

	// Find user in db with same refresh token
	const user = await prisma.users.findFirst({
		where: {
			refreshToken: req.cookies.jwt,
		},
	});

	if (!user) {
		res.status(403).json({ status: "error", message: "refresh token invalid" });
	}

	try {
		// Check that refresh token is correct
		const decoded = jwt.verify(req.cookies.jwt, process.env.REFRESH_SECRET);

		// If username in decoded JWT payload does not match username of user found in db, throw error
		if (user.username !== decoded.username) {
			res.status(403).json({
				status: "error",
				message: "unauthorised",
			});
		}

		// Create payload for new access token
		const payload = {
			id: decoded.id,
			username: decoded.username,
			roleId: decoded.roleId,
		};

		// Create new access token
		const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
			expiresIn: "20m",
			jwtid: uuidv4(),
		});

		// Send back the new JWT access token
		const response = {
			access,
			id: decoded.id,
			username: decoded.username,
			roleId: decoded.roleId,
		};

		console.log(`refresh success for ${payload.username}`);
		res.json(response);
	} catch (err) {
		console.error("POST /users/refresh", err);
		res.status(401).json({
			status: "error",
			message: "unauthorised",
		});
	}
};

/* =========================================
// EXPORTS
========================================= */

module.exports = {
	createUser,
	logIn,
	refreshAccessToken,
};
