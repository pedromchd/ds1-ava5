const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ds1_ava5', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = sequelize;
