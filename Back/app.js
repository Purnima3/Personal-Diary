const fs = require("fs");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Add JWT module
const bcrypt = require("bcrypt"); // Add bcrypt module
const User = require("./models/User_data.js");

const bodyParser = require("body-parser");
const csvParser = require("csv-parser");
const { createObjectCsvWriter } = require("csv-writer");

// Enable CORS
const app = express();
const port = 4000;
app.use(cors());
const { pool } = require("./db");
// Parse JSON bodies
app.use(bodyParser.json());

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

const UserPost = require("./models/userpost");

// app.get("/api/fetchDiary", async (req, res) => {
// 	const user = req.body;
// 	try {
// 		const fetchedData = await pool.query(
// 			"SELECT * FROM UserPost WHERE userid = $1 ",
// 			[user]
// 		);
// 	} catch (err) {
// 		console.error("Error fetching data:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });
app.post("/api/notes", async (req, res) => {
	const { notes, user } = req.body;

	if (notes.length === 0) {
		return res.status(400).send("No notes provided");
	}

	// Log the latest note for debugging
	const Rnotes = notes.reverse();
	const latestNote = notes[Rnotes.length - 1];

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

		// Check if the noteId already exists in the UserPost table
		const existingNoteQuery = "SELECT * FROM UserPost WHERE noteid = $1";
		const existingNote = await pool.query(existingNoteQuery, [latestNote.id]);

		const noteDate = new Date(latestNote.date);
		// Format the date to include the time component in ISO format
		const formattedDate = noteDate.toISOString();

		if (existingNote.rowCount === 0 && user != -1) {
			// If the noteId doesn't exist, insert the new note
			const result = await pool.query(
				'INSERT INTO UserPost (noteid, userid, text, date, emotion, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
				[
					latestNote.id,
					user,
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
			// If the noteId already exists, skip insertion
			console.log(
				"Note with the given noteId already exists, skipping insertion",
				latestNote
			);
			res
				.status(200)
				.send("Note with the given noteId already exists, skipping insertion");
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
app.post("/api/emotions", async (req, res) => {
	let { noteId, emotion } = req.body;

	console.log("noteId: ", noteId, "  emot ", emotion);
	try {
		// Check if a record with the given noteId already exists
		const existingRecord = await pool.query(
			"SELECT * FROM UserPost WHERE noteid = $1",
			[noteId]
		);

		if (existingRecord.rowCount > 0) {
			// If record exists, update the emotion column
			if (emotion == 1) {
				emotion = "Elated";
			} else if (emotion == 2) {
				emotion = "Happy";
			} else if (emotion == 3) {
				emotion = "Neutral";
			} else if (emotion == 4) {
				emotion = "Sad";
			} else if (emotion == 5) {
				emotion = "Depressed";
			}
			const result = await pool.query(
				'UPDATE UserPost SET emotion = $2, "updatedAt" = $3 WHERE noteid = $1 RETURNING *',
				[noteId, emotion, new Date()]
			);

			console.log("Updated emotion: ", result.rows[0]);
			res.status(200).json(result.rows[0]);
		} else {
			// If no record exists, insert a new one
			// const result = await pool.query(
			// 	'INSERT INTO UserPost (noteid, emotion, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4) RETURNING *',
			// 	[noteId, emotion, new Date(), new Date()]
			// );

			console.log(" NO Inserted emotion: ");
			res.status(201).json();
		}
	} catch (error) {
		console.error(
			"Error inserting or updating emotion data in the database:",
			error
		);
		res
			.status(500)
			.send("Error inserting or updating emotion data in the database");
	}
});

app.delete("/api/delNotes/:id", async (req, res) => {
	const { id } = req.params; // Extract the ID from the URL path
	console.log("Indifr daelete api ");
	try {
		// Attempt to find the data by its ID and delete it
		// const deletedData = await UserPost.destroy({ where: { id: id } });
		const deletedData = await pool.query(
			"DELETE FROM UserPost WHERE noteid = $1 ",
			[id]
		);
		if (deletedData) {
			// If data was deleted successfully
			res.status(200).json({ message: "Data deleted successfully" });
		} else {
			// If no data was found with the provided ID
			res.status(404).json({ error: "Data not found" });
		}
	} catch (error) {
		// If an error occurred during the deletion process
		console.error("Error deleting data:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/api/users", async (req, res) => {
	try {
		console.log("hi");

		const users = await User.findAll();

		res.json(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: "An error occurred while fetching users." });
	}
});

app.get("/api/user/:id/emotions", async (req, res) => {
	
	const userId = req.params.id;
	console.log(userId)

	try {
		const userEmotions = await pool.query(
			"SELECT * FROM UserPost WHERE userId = $1",
			[userId]
		);
		const emotions = userEmotions.rows.map((row) => row.emotion);

		console.log("User:", userId, "Emotions:", emotions);
		res.json(emotions);
	} catch (error) {
		console.error("Error fetching emotions:", error);
		res
			.status(500)
			.json({ error: "An error occurred while fetching emotions." });
	}
});

module.exports = router;
