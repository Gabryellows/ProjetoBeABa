const express = require('express');
const personsController = require('../app/controller/personsController');

const router = express.Router();

router.get('/', personsController.index);
router.get('/:nameId', personsController.show);
router.post('/', personsController.store);
router.put('/:id', personsController.update);
router.delete('/:id', personsController.delete);

module.exports = router;
