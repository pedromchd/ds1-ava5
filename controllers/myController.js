const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.add = (req, res) => {
    res.render('pages/create', { title: 'Adicionar' });
}

exports.create = async (req, res) => {
    const result = validationResult(req).formatWith(err => err.msg);
    if (!result.isEmpty()) {
        req.flash('errors', result.array());
        res.redirect('back');
        return;
    }
    const { firstName, lastName } = req.body;
    await User.create({ firstName, lastName });
    req.flash('success', 'Usuário adicionado com sucesso!');
    res.redirect('/');
}

exports.show = async (req, res) => {
    const results = await User.findAll();
    res.render('pages/read', { title: 'Mostrar', results });
};
