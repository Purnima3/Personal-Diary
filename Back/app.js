const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Add JWT module
const bcrypt = require("bcrypt"); // Add bcrypt module

// const {Server} = require('socket.io');
const { sequelize } = require("./db.js");

const hash = (pass) => {
	return bcrypt.hash(pass, 10);
};

const app = express();
const port = 4000;

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

module.exports = router;
