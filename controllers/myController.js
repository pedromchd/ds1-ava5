const Livro = require('../models/Livro');

exports.home = async (req, res) => {
    const results = await Livro.findAll();
    return res.render('pages/home', { title: 'Página inicial', results });
};

exports.new = (req, res) => {
    return res.render('pages/new', { title: 'Adicionar livro' })
};

exports.create = async (req, res) => {
    const { titulo, ano, autor, editora, quantidade } = req.body;
    await Livro.create({ titulo, ano, autor, editora, quantidade });
    req.flash('success', 'Livro adicionado com sucesso!');
    return res.redirect('/');
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    const result = await Livro.findByPk(id);
    return res.render('pages/edit', { title: 'Editar livro', result });
};

exports.update = async (req, res) => {
    const id = req.params.id;
    const { titulo, ano, autor, editora, quantidade } = req.body;
    await Livro.update({ titulo, ano, autor, editora, quantidade }, { where: { id } });
    req.flash('success', 'Livro atualizado com sucesso!');
    return res.redirect('/');
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    await Livro.destroy({ where: { id } });
    req.flash('success', 'Livro deletado com sucesso!');
    return res.redirect('/');
};
