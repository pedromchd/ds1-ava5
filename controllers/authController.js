const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.login = (req, res) => {
    return res.render('auth/login', { title: 'Login' });
};

exports.auth = async (req, res) => {
    const { email, senha } = req.body;
    const { id, nome, senha: hash } = await User.findOne({ where: { email } });
    const auth = await bcrypt.compare(senha, hash);
    if (!auth) {
        req.flash('errors', 'Houve um erro na autenticação');
        return res.redirect('back');
    }
    req.session.regenerate(() => {
        req.session.user = { id, nome };
        return res.redirect('/');
    });
};

exports.cadastro = (req, res) => {
    return res.render('auth/cadastro', { title: 'Cadastro' });
};

exports.create = async (req, res) => {
    const result = validationResult(req).formatWith(err => err.msg);
    if (!result.isEmpty()) {
        req.flash('errors', result.array());
        return res.redirect('back');
    }
    const { nome, email, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    await User.create({ nome, email, senha: hash });
    req.flash('success', 'Usuário cadastrado com sucesso!');
    return res.redirect('/');
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/login');
    });
}
