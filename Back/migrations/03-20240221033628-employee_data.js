"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		queryInterface.createTable("user_data", {
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
				references: {
					model: "roles",
					key: "roleid",
				},
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
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("user_data");
	},
};
