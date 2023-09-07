const express = require('express');
const { check } = require('express-validator');
const myController = require('../controllers/myController');

const createUserChain = () => {
    return [
        check('firstName').trim().notEmpty().withMessage('O campo "Primeiro nome" é orbigatório.').isLength({ max: 255 }),
        check('lastName').trim().notEmpty().withMessage('O campo "Último nome" é obrigatório.').isLength({ max: 255 })
    ]
}

const router = express.Router();

router.get('/', myController.add);
router.post('/', createUserChain(), myController.create);
router.get('/show', myController.show);

module.exports = router;
