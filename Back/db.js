const { Pool } = require("pg");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const config = require("./config/config.json");

const environment = "development";
const sequelize = new Sequelize(config[environment]);

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

module.exports = { sequelize, pool };
