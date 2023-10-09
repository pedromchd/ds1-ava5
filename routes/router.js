const express = require('express');
const { checkSchema } = require('express-validator');
const authController = require('../controllers/authController');
const livroController = require('../controllers/livroController');
const userController = require('../controllers/userController');
const libController = require('../controllers/libController');

const router = express.Router();

// Biblioteca homepage
router.get('/', (req, res, next) => {
    if (!req.session.user) { return res.status(401).redirect('/auth/login'); }
    next();
}, libController.home);
router.get('/alugar/:id-:qnt', libController.alugar);
router.get('/search', libController.search);

// Login and register
router.get('/auth/login', authController.login);
router.post('/auth/login', checkSchema({
    email: { trim: true, isEmail: { errorMessage: 'Insira um email válido.' } },
    senha: { notEmpty: { errorMessage: 'Insira uma senha válida.' } }
}), authController.auth);
router.get('/auth/cadastro', authController.cadastro);
router.post('/auth/cadastro', checkSchema({
    nome: { trim: true, notEmpty: { errorMessage: 'Insira um nome válido.' } },
    email: { trim: true, isEmail: { errorMessage: 'Insira um email válido.' } },
    senha: { notEmpty: { errorMessage: 'Insira uma senha válida.' } }
}), authController.register);
router.get('/auth/logout', authController.logout);

// Admin homepage
router.all('/admin(/*)?', (req, res, next) => {
    if (!req.session.user) { return res.status(401).redirect('/auth/login'); }
    if (req.session.user.id !== 1) { return res.status(403).redirect('/'); }
    next();
});
router.get('/admin(/)?', (req, res) => res.render('admin/home'));

// Admin livro CRUD
router.get('/admin/livros(/)?', livroController.home);
router.get('/admin/livros/new', livroController.new);
router.post('/admin/livros/new', checkSchema({
    titulo: { trim: true, notEmpty: { errorMessage: 'Insira um título válido.' } },
    ano: { trim: true, notEmpty: { errorMessage: 'Insira um ano válido.' } },
    autor: { trim: true, notEmpty: { errorMessage: 'Insira um autor válido.' } },
    editora: { trim: true, notEmpty: { errorMessage: 'Insira uma editora válida.' } },
    quantidade: { trim: true, notEmpty: { errorMessage: 'Insira uma quantidade válida.' } }
}), livroController.create);
router.get('/admin/livros/edit/:id', livroController.edit)
router.post('/admin/livros/edit/:id', checkSchema({
    titulo: { trim: true, notEmpty: { errorMessage: 'Insira um título válido.' } },
    ano: { trim: true, notEmpty: { errorMessage: 'Insira um ano válido.' } },
    autor: { trim: true, notEmpty: { errorMessage: 'Insira um autor válido.' } },
    editora: { trim: true, notEmpty: { errorMessage: 'Insira uma editora válida.' } },
    quantidade: { trim: true, notEmpty: { errorMessage: 'Insira uma quantidade válida.' } }
}), livroController.update);
router.get('/admin/livros/delete/:id', livroController.delete);

// Admin user CRUD
router.get('/admin/users(/)?', userController.home);
router.get('/admin/users/new', userController.new);
router.post('/admin/users/new', checkSchema({
    nome: { trim: true, notEmpty: { errorMessage: 'Insira um nome válido.' } },
    email: { trim: true, isEmail: { errorMessage: 'Insira um email válido.' } },
    senha: { notEmpty: { errorMessage: 'Insira uma senha válida.' } }
}), userController.create);
router.get('/admin/users/edit/:id', userController.edit)
router.post('/admin/users/edit/:id', checkSchema({
    nome: { trim: true, notEmpty: { errorMessage: 'Insira um nome válido.' } },
    email: { trim: true, isEmail: { errorMessage: 'Insira um email válido.' } },
    senha: { notEmpty: { errorMessage: 'Insira uma senha válida.' } }
}), userController.update);
router.get('/admin/users/delete/:id', userController.delete);

module.exports = router;
