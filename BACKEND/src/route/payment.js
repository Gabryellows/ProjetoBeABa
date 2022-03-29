const express = require('express');
const paymentsController = require('../app/controller/paymentsController');

const router = express.Router();

router.get('/', paymentsController.index);
router.post('/', paymentsController.store);


module.exports = router;
