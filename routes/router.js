const express = require('express');
const { checkSchema } = require('express-validator');
const authController = require('../controllers/authController');
const livroController = require('../controllers/livroController');
const libController = require('../controllers/libController');

const router = express.Router();

// Library homepage
router.get('/', (req, res) => res.redirect('/home'));
router.get('/home', libController.home);

// Login and register
router.get('/login', authController.login);
router.post('/login', checkSchema({
    email: { trim: true, isEmail: { errorMessage: 'Insira um email válido.' } },
    senha: { notEmpty: { errorMessage: 'Insira uma senha válida.' } }
}), authController.auth);
router.get('/cadastro', authController.cadastro);
router.post('/cadastro', checkSchema({
    nome: { trim: true, notEmpty: { errorMessage: 'Insira um nome válido.' } },
    email: { trim: true, isEmail: { errorMessage: 'Insira um email válido.' } },
    senha: { notEmpty: { errorMessage: 'Insira uma senha válida.' } }
}), authController.register);
router.get('/logout', authController.logout);

// Admin book CRUD
router.get('/admin', (req, res) => res.redirect('/admin/home'));
router.all('/admin/*', (req, res, next) => {
    if (!req.session.user) { return res.status(401).redirect('/login'); }
    if (req.session.user.id !== 1) { return res.status(403).redirect('/login'); }
    next();
});
router.get('/admin/home', livroController.home);
router.get('/admin/new', livroController.new);
router.post('/admin/new', livroController.create);
router.get('/admin/edit/:id', livroController.edit)
router.post('/admin/edit/:id', livroController.update);
router.get('/admin/delete/:id', livroController.delete);

module.exports = router;
