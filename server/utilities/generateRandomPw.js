/** @format */

function generateRandomPw(length) {
	let result = "";

	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 1; i <= length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);

		result += characters.charAt(randomIndex);
	}

	return result;
}

module.exports = { generateRandomPw };
