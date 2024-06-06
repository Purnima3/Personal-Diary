const { DataTypes } = require("sequelize");
const { sequelize } = require("../db.js");

const UserPost = sequelize.define("userpost", {
	noteid: {
		type: DataTypes.INTEGER,
		unique: true,
		allowNull: false,
	},
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
