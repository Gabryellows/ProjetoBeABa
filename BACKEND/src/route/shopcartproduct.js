const express = require('express');
const shopcartproductController = require('../app/controller/shopcartproductController');

const router = express.Router();

router.get('/', shopcartproductController.index);
router.get('/all/:id', shopcartproductController.findByShopCartId);
router.get('/:nameId', shopcartproductController.show);
router.post('/', shopcartproductController.store);
router.put('/:id', shopcartproductController.update);
router.delete('/:id', shopcartproductController.delete);

module.exports = router;
