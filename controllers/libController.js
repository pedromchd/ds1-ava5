const { Sequelize } = require('sequelize');
const Livro = require('../models/Livro');
const Emprestimo = require('../models/Emprestimo');

exports.home = async (req, res) => {
    const results = await Livro.findAll();
    return res.render('pages/home', { title: 'Página inicial', results });
};

exports.alugar = async (req, res) => {
    const { id: UserId } = req.session.user;
    const { id: LivroId } = req.params;
    try {
        await Emprestimo.create({ UserId, LivroId });
        let qnt = parseInt(req.params.qnt)-1;
        await Livro.update({ quantidade: qnt }, { where: { id: LivroId } });
        req.flash('success', 'Livro alugado com sucesso!');
        return res.redirect('back');
    } catch {
        req.flash('errors', 'Você só pode alugar o livro uma vez');    
    }
    return res.redirect('back');
};

exports.search = async (req, res) => {
    const query = req.query.q ?? '';
    const results = await Livro.findAll({
        where: { titulo: { [Sequelize.Op.substring]: query } }
    });
    res.render('pages/home', { query, results });
};
