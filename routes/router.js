const express = require('express');
const myController = require('../controllers/myController');

const router = express.Router();

router.get('/', myController.home);

module.exports = router;
