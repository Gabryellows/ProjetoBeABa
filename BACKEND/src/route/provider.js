const express = require('express');
const providersController = require('../app/controller/providersController');

const router = express.Router();

router.get('/', providersController.index);
router.get('/:nameId', providersController.show);
router.post('/', providersController.store);
router.delete('/:id', providersController.delete);

module.exports = router;
