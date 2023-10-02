const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User')
const Livro = require('./Livro')

const Emprestimo = sequelize.define('Emprestimo', {
    user: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: id
        }
    },
    livro: {
        type: DataTypes.INTEGER,
        references: {
            model: Livro,
            key: id
        }
    }
});

User.belongsToMany(Livro, { through: Emprestimo });
Livro.belongsToMany(User, { through: Emprestimo });

module.exports = Emprestimo;
