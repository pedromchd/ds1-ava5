const express = require('express');
const { body, checkSchema } = require('express-validator');
const authController = require('../controllers/authController');
const livroController = require('../controllers/livroController');
const User = require('../models/User');

const router = express.Router();

router.get('/login', authController.login);
router.post('/login', authController.auth);
router.get('/cadastro', authController.cadastro);
router.post('/cadastro', body('email').custom(
    async (email) => {
        const user = await User.findOne({ where: { email } });
        if (user) {
            throw new Error('Email já cadastrado no sistema.');
        }
    }
), authController.create);
router.get('/logout', authController.logout);

router.get('/', livroController.home);
router.get('/new', livroController.new);
router.post('/new', livroController.create);
router.get('/edit/:id', livroController.edit)
router.post('/edit/:id', livroController.update);
router.get('/delete/:id', livroController.delete);

module.exports = router;
