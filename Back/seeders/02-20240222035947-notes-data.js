"use strict";
const bcrypt = require("bcrypt");
const hashu = async (pass) => {
	return bcrypt.hash(pass, 10);
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"notes_data",
			[
				{
					text: "Hello Shubham , This side ",
				},
				{
					text: "I love to play cricket",
				},
				{
					text: "I hate watching reels",
				},

				{
					text: "Chennai is my favourite place to visit.",
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
