const express = require('express');
const authController = require('../controllers/authController');
const livroController = require('../controllers/livroController');

const router = express.Router();

router.get('/login', authController.login);
router.post('/login', authController.auth);
router.get('/cadastro', authController.cadastro);
router.post('/cadastro', authController.create);
router.get('/logout', authController.logout);

router.get('/', livroController.home);
router.get('/new', livroController.new);
router.post('/new', livroController.create);
router.get('/edit/:id', livroController.edit)
router.post('/edit/:id', livroController.update);
router.get('/delete/:id', livroController.delete);

module.exports = router;
