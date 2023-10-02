const express = require('express');
const { checkSchema } = require('express-validator');
const authController = require('../controllers/authController');
const livroController = require('../controllers/livroController');

const router = express.Router();

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

router.get('/', livroController.home);
router.get('/new', livroController.new);
router.post('/new', livroController.create);
router.get('/edit/:id', livroController.edit)
router.post('/edit/:id', livroController.update);
router.get('/delete/:id', livroController.delete);

module.exports = router;
