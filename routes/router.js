const express = require('express');
const myController = require('../controllers/myController');

const router = express.Router();

router.get('/', myController.home);
router.get('/new', myController.new);
router.post('/new', myController.create);
router.get('/edit/:id', myController.edit)
router.post('/edit/:id', myController.update);
router.get('/delete/:id', myController.delete);

module.exports = router;
