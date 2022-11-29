/** @format */

require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	// If "Bearer " is not found in authHeader, return unauthorised status
	if (!authHeader?.startsWith("Bearer ")) {
		console.log("no bearer found");

		return res.status(401).send({
			status: "error",
			message: "unauthorised",
		});
	}

	const token = authHeader.split(" ")[1];

	try {
		// Check if access token is valid
		const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

		// If access token is the same, save decoded id & username to request
		req.id = decoded.id;
		req.username = decoded.username;
		console.log("access token verified");

		next();
	} catch (err) {
		// If access token is invalid
		console.log("access token provided is invalid");
		return res.status(403).json({
			status: "error",
			message: "missing token",
		});
	}
};

module.exports = verifyAccessToken;
