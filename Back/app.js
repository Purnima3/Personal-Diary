const fs = require("fs");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Add JWT module
const bcrypt = require("bcrypt"); // Add bcrypt module

const bodyParser = require("body-parser");
const csvParser = require("csv-parser");
const { createObjectCsvWriter } = require("csv-writer");

// Enable CORS
const app = express();
const port = 4000;
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// const {Server} = require('socket.io');
const { sequelize } = require("./db.js");

const hash = (pass) => {
	return bcrypt.hash(pass, 10);
};

const { Op, where } = require("sequelize");
const User = require("./models/User_data.js");

const Role = require("./models/role.js");

User.belongsTo(Role, { targetKey: "roleid", foreignKey: "roleId" });

(async () => {
	await sequelize.sync({ logging: false, force: false });
	console.log("Tables synchronized successfully");
})();

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
	console.log(`Running on port ${port}`);
});

const router = express.Router();

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	console.log(`Attempting login for email: ${email}`);

	// Find user by email
	const user = await User.findOne({
		where: {
			email_id: email,
			deletedAt: null, // Condition to check if deletedAt is null
		},
		attributes: ["id", "roleId", "password", "name"], // Include password in the returned user object
	});

	if (!user) {
		console.log(`Login failed for email: ${email}`);
		return res.status(401).json({ error: "Invalid login" });
	}

	const { id, roleId, password: hashedPassword, name } = user; // Ensure correct assignment

	// Check if hashedPassword is null or undefined
	if (!hashedPassword) {
		console.log(`Login failed for email: ${email}`);
		return res.status(401).json({ error: "Invalid login" });
	}

	// Compare hashed password with the provided password
	const passwordMatch = await bcrypt.compare(password, hashedPassword);

	if (!passwordMatch) {
		console.log(`Login failed for email: ${email}`);
		return res.status(401).json({ error: "Invalid login" });
	}

	// Generate JWT token
	const token = jwt.sign(
		{ userId: id, userRole: roleId, userName: name },
		"your_secret_key_here",
		{ expiresIn: "1h" }
	);

	console.log(
		`Login successful for email: ${email}, user ID: ${id}, roleId: ${roleId}`
	);

	// Send response with user details and token
	res.json({
		message: "Login successful",
		user_id: id,
		user_roleId: roleId,
		token,
	});
});

// app.post("/api/notes", (req, res) => {
// 	const notes = req.body;

// 	// Define the CSV writer and specify the file path and CSV header
// 	const csvWriter = createObjectCsvWriter({
// 		path: "data.csv",
// 		header: [
// 			{ id: "id", title: "ID" },
// 			{ id: "text", title: "Text" },
// 			{ id: "time", title: "Time" },
// 			{ id: "color", title: "Color" },
// 			// Add more headers as needed based on your data structure
// 		],
// 	});

// 	// Write the JSON data to the CSV file
// 	csvWriter
// 		.writeRecords(notes)
// 		.then(() => {
// 			console.log("Data written to CSV file successfully");
// 			res.send("Notes received and stored in CSV file successfully");
// 		})
// 		.catch((err) => {
// 			console.error("Error writing CSV file:", err);
// 			res.status(500).send("Error writing CSV file");
// 		});
// });

app.post("/api/notes", (req, res) => {
	const notes = req.body;

	// Define the CSV writer and specify the file path and CSV header
	const csvWriter = createObjectCsvWriter({
		path: "data.csv",
		header: [
			{ id: "tweets", title: "Texts" }, // Change the header to 'tweets'
		],
	});

	// Extract 'text' from 'notes' and format it for CSV
	const records = notes.map((note) => {
		return { tweets: note.text }; // Map 'text' from 'notes' to 'tweets' column
	});

	// Write the records to the CSV file
	csvWriter
		.writeRecords(records)
		.then(() => {
			console.log("Data written to CSV file successfully");
			res.send("Notes received and stored in CSV file successfully");
		})
		.catch((err) => {
			console.error("Error writing CSV file:", err);
			res.status(500).send("Error writing CSV file");
		});
});

module.exports = router;
