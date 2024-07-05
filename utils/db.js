const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database.js');

//const env = process.env.NODE_ENV || 'development';
const env = 'test';
const config = dbConfig[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

module.exports = sequelize;
