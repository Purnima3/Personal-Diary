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
					noteid: 122,
					userid: 1,
					text: "im feeling quite sad and sorry for myself but ill snap out of it soon",
					date: "2023-09-09",
					emotion: "sadness",
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
