const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ds1_ava5', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
