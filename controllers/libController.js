const Livro = require('../models/Livro');

exports.home = async (req, res) => {
    const results = await Livro.findAll();
    return res.render('pages/home', { title: 'Página inicial', results });
};
