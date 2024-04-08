"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.createTable("notes_data", {
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
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("notes_data");
	},
};
