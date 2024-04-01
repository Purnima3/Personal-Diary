
const config = require('./config/config.json');
const {Sequelize} = require('sequelize');

const environment = 'development'


const sequelize = new Sequelize(config[environment]);

module.exports = {sequelize}
