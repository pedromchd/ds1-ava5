const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.home = async (req, res) => {
    const results = await User.findAll();
    return res.render('admin/user/home', { title: 'Página inicial', results });
};

exports.new = (req, res) => {
    return res.render('admin/user/new', { title: 'Adicionar user' })
};

exports.create = async (req, res) => {
    const result = validationResult(req).formatWith(err => err.msg);
    if (!result.isEmpty()) {
        req.flash('errors', result.array());
        return res.redirect('back');
    }
    const { nome, email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
        req.flash('errors', 'O email informado já existe.');
        return res.redirect('back');
    }
    const hash = await bcrypt.hash(senha, 10);
    const { id } = await User.create({ nome, email, senha: hash });
    req.flash('success', 'User adicionado com sucesso!');
    return res.redirect(`/admin/user#${id}`);
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    const result = await User.findByPk(id);
    return res.render('admin/user/edit', { title: 'Editar user', result });
};

exports.update = async (req, res) => {
    const result = validationResult(req).formatWith(err => err.msg);
    if (!result.isEmpty()) {
        req.flash('errors', result.array());
        return res.redirect('back');
    }
    const id = req.params.id;
    const { nome, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    await User.update({ nome, email, senha: hash }, { where: { id } });
    req.flash('success', 'User atualizado com sucesso!');
    return res.redirect(`/admin/user#${id}`);
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    await User.destroy({ where: { id } });
    req.flash('success', 'User deletado com sucesso!');
    return res.redirect('/admin/user');
};
