"use strict";
const bcrypt = require("bcrypt");
const hashu = async (pass) => {
	return bcrypt.hash(pass, 10);
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"user_data",
			[
				{
					name: "Shubham Lingwal",

					email_id: "Shubham@gmail.com",
					roleId: 2,
					address: "kolkata",
					password: await hashu("Shubham"),
				},
				{
					name: "Shubham Lingwal",

					email_id: "Shubham2@gmail.com",
					roleId: 2,
					address: "Kolkata",
					password: await hashu("Shubham"),
				},
				{
					name: "Anshuman",

					email_id: "anshuman@gmail.com",
					roleId: 2,
					address: "kolkata",
					password: await hashu("Shubham"),
				},
				{
					name: "Shubham Lingwal",

					email_id: "Shubham1@gmail.com",
					roleId: 1,
					address: "kolkata",
					password: await hashu("Shubham"),
				},
				{
					name: "Shubham Lingwal",

					email_id: "shubham@gmail.com",
					roleId: 1,
					address: "uttarakhand",
					password: await hashu("Shubham"),
				},
				{
					name: "Nitin Razin",

					email_id: "nitin@gmail.com",
					roleId: 1,
					address: "kerala",
					password: await hashu("Shubham"),
				},
				{
					name: "Purnima",

					email_id: "purnima@gmail.com",
					roleId: 1,
					address: "chennai",
					password: await hashu("Shubham"),
				},
				{
					name: "Abhinav",

					email_id: "abhinav@gmail.com",
					roleId: 1,
					address: "chennai",
					password: await hashu("Shubham"),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
