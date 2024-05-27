const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const UserPost = sequelize.define("userpost", {
	userid: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		allowNull: false,
	},
	emotion: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = UserPost;
