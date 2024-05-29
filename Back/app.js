const fs = require("fs");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Add JWT module
const bcrypt = require("bcrypt"); // Add bcrypt module

const bodyParser = require("body-parser");
const csvParser = require("csv-parser");
const { createObjectCsvWriter } = require("csv-writer");
const User = require("./models/User_data.js");

// Enable CORS
const app = express();
const port = 4000;
app.use(cors());
const { pool } = require("./db");
// Parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());

// const {Server} = require('socket.io');
const { sequelize } = require("./db.js");

const hash = (pass) => {
	return bcrypt.hash(pass, 10);
};

const { Op, where } = require("sequelize");


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

//users
app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


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

const UserPost = require("./models/userpost");

app.post("/api/notes", async (req, res) => {
	const notes = req.body;

	if (notes.length === 0) {
		return res.status(400).send("No notes provided");
	}

	// Log the latest note for debugging
	Rnotes = notes.reverse();
	const latestNote = notes[Rnotes.length - 1];
	console.log(notes.length);
	console.log("Latest note to be processed: ", latestNote);

	// Define the CSV writer and specify the file path and CSV header
	const csvWriter = createObjectCsvWriter({
		path: "data.csv",
		header: [
			{ id: "tweets", title: "Texts" },
			{ id: "date", title: "Date" },
		],
	});

	// Extract 'content' and 'date' from the latest note and format it for CSV
	const date = new Date(latestNote.date).toISOString().split("T")[0];
	const record = { tweets: latestNote.content, date: date };

	// Write the record to the CSV file
	try {
		await csvWriter.writeRecords([record]);
		console.log("Data written to CSV file successfully");

		// Check if the latest note already exists in the database with the same createdAt time
		// Check if the latest note already exists in the database with the same createdAt time
		const existingNote = await pool.query(
			'SELECT * FROM UserPost WHERE userid = $1 OR "createdAt" = $2',
			[latestNote.id, latestNote.createdAt]
		);

		const noteDate = new Date(latestNote.date);

		// Format the date to include the time component in ISO format
		const formattedDate = noteDate.toISOString();

		console.log("dateee ", formattedDate);
		if (existingNote.rowCount === 0) {
			const result = await pool.query(
				'INSERT INTO UserPost (userid, text, date, emotion, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
				[
					latestNote.id,
					latestNote.content,
					formattedDate,
					latestNote.emotion,
					new Date(),
					new Date(),
				]
			);

			console.log("Inserted note: ", result.rows[0]);
			res.status(201).json(result.rows[0]);
		} else {
			console.log("Exist: ", existingNote);
			console.log("Note already exists, skipping insertion");
			res.status(200).send("Note already exists, skipping insertion");
		}
	} catch (err) {
		console.error(
			"Error writing CSV file or inserting data into the database:",
			err
		);
		res
			.status(500)
			.send("Error writing CSV file or inserting data into the database");
	}
});

module.exports = router;
