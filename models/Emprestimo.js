const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = require('./User');
const Livro = require('./Livro');

const Emprestimo = sequelize.define('Emprestimo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    LivroId: {
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: Livro,
            key: 'id'
        }
    }
});

User.belongsToMany(Livro, { through: Emprestimo });
Livro.belongsToMany(User, { through: Emprestimo });

module.exports = Emprestimo;
