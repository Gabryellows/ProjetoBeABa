const express = require('express');
const adressesController = require('../app/controller/adressesController');

const router = express.Router();

router.get('/', adressesController.index);
router.get('/:nameId', adressesController.show);
router.get('/findByPerson/:id', adressesController.FindByIdPerson);
router.post('/', adressesController.store);
router.put('/:id', adressesController.update);
router.delete('/:id', adressesController.delete);

module.exports = router;
