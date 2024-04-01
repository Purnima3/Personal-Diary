const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const User = sequelize.define("user_data", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	},

	email_id: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	address: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	roleId: {
		type: DataTypes.INTEGER,
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
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = User;
