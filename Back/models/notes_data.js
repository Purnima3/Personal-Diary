const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const Notes = sequelize.define("notes_data", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	},

	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	createdAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
	},
	deletedAt: {
		type: DataTypes.DATE,
		allowNull: true,
	},
});

module.exports = Notes;
