const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Livro = require('./Livro')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

User.belongsToMany(Livro, { through: 'Emprestimo' });
Livro.belongsToMany(User, { through: 'Emprestimo' });

module.exports = User;
