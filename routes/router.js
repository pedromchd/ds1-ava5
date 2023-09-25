const express = require('express');
const myController = require('../controllers/myController');

const router = express.Router();

router.get('/', myController.home);
router.post('/', myController.create);
router.put('/:id', myController.update);
router.delete('/:id', myController.delete);

module.exports = router;
