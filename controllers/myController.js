const User = require('../models/User');

exports.add = (req, res) => {
    res.render('pages/create', { title: 'Adicionar' });
}

exports.create = async (req, res) => {
    const { firstName, lastName } = req.body;
    await User.create({ firstName, lastName });
    req.flash('success', 'Adicionado com sucesso!');
    res.redirect('/');
}

exports.show = async (req, res) => {
    const results = await User.findAll();
    res.render('pages/read', { title: 'Mostrar', results });
};
