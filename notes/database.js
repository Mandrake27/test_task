const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const databaseConfig = require('./config.json');
const { host, port, user, password, database } = databaseConfig;

const initialize = async () => {
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
};

const sequelize = new Sequelize(database, user, password, {
  dialect: 'mysql',
});

module.exports.initialize = initialize;
module.exports.sequelize = sequelize;
