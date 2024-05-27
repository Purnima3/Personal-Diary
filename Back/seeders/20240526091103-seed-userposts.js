("use strict");
const bcrypt = require("bcrypt");
const hashu = async (pass) => {
	return bcrypt.hash(pass, 10);
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"userpost",
			[
				{
					userid: 1,
					text: "im feeling quite sad and sorry for myself but ill snap out of it soon",
					date: "2023-09-09",
					emotion: "sadness",
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					userid: 1,
					text: "i feel like i am still looking at a blank canvas blank pieces of paper",
					date: "2023-07-13",
					emotion: "sadness",
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					userid: 1,
					text: "i feel like a faithful servant",
					date: "2024-04-14",
					emotion: "love",
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					userid: 1,
					text: "i am just feeling cranky and blue",
					date: "2024-01-22",
					emotion: "anger",
					createdAt: new Date(),
					updatedAt: new Date(),
				},

				{
					userid: 2,
					text: "i can have for a treat or if i am feeling festive",
					date: "2023-06-13",
					emotion: "joy",
					createdAt: new Date(),
					updatedAt: new Date(),
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
