const Sequelize = require('sequelize');

const db = new Sequelize('codegig', 'postgres', 'Yonatan123', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = db;
