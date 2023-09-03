const express = require('express');
const myController = require('../controllers/myController');

const router = express.Router();

router.get('/', myController.add);
router.post('/', myController.create);
router.get('/show', myController.show);

module.exports = router;
