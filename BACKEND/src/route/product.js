const express = require('express');
const productsController = require('../app/controller/productsController');

const router = express.Router();

router.get('/', productsController.index);
router.get('/productsCategories/:id', productsController.productCategories);
router.get('/:nameId', productsController.show);
router.post('/', productsController.store);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

module.exports = router;
