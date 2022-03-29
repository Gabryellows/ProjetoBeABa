const express = require('express');
const shopcartController = require('../app/controller/shopcartController');

const router = express.Router();

router.get('/', shopcartController.index);
router.get('/porusuario/:id', shopcartController.getShopCart);
router.get('/:id', shopcartController.show);
// router.post('/', shopcartController.store);
router.put('/:id', shopcartController.update);
router.delete('/:id', shopcartController.delete);

module.exports = router;
