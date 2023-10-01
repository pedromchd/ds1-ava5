const express = require('express');
const livroController = require('../controllers/livroController');

const router = express.Router();

router.get('/', livroController.home);
router.get('/new', livroController.new);
router.post('/new', livroController.create);
router.get('/edit/:id', livroController.edit)
router.post('/edit/:id', livroController.update);
router.get('/delete/:id', livroController.delete);

module.exports = router;
