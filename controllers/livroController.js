const { validationResult } = require('express-validator');
const Livro = require('../models/Livro');

exports.home = async (req, res) => {
    const results = await Livro.findAll();
    return res.render('admin/livros/home', { title: 'Página inicial', results });
};

exports.new = (req, res) => {
    return res.render('admin/livros/new', { title: 'Adicionar livro' })
};

exports.create = async (req, res) => {
    const result = validationResult(req).formatWith(err => err.msg);
    if (!result.isEmpty()) {
        req.flash('errors', result.array());
        return res.redirect('back');
    }
    const { titulo, ano, autor, editora, quantidade } = req.body;
    const { id } = await Livro.create({ titulo, ano, autor, editora, quantidade });
    req.flash('success', 'Livro adicionado com sucesso!');
    return res.redirect(`/admin/livros#${id}`);
};

exports.edit = async (req, res) => {
    const id = req.params.id;
    const result = await Livro.findByPk(id);
    return res.render('admin/livros/edit', { title: 'Editar livro', result });
};

exports.update = async (req, res) => {
    const result = validationResult(req).formatWith(err => err.msg);
    if (!result.isEmpty()) {
        req.flash('errors', result.array());
        return res.redirect('back');
    }
    const id = req.params.id;
    const { titulo, ano, autor, editora, quantidade } = req.body;
    await Livro.update({ titulo, ano, autor, editora, quantidade }, { where: { id } });
    req.flash('success', 'Livro atualizado com sucesso!');
    return res.redirect(`/admin/livros#${id}`);
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    await Livro.destroy({ where: { id } });
    req.flash('success', 'Livro deletado com sucesso!');
    return res.redirect('/admin/livros');
};
