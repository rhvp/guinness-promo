const express = require('express');
const router = express.Router();
const operator = require('../controllers/operatorController');

router.post('/', operator.create);

router.get('/', operator.getAll)

module.exports = router;