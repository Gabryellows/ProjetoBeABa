const express = require('express');
const categoriesController = require('../app/controller/categoriesController');

const router = express.Router();

router.get('/', categoriesController.index);
router.get('/:nameId', categoriesController.show);
router.post('/', categoriesController.store);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.delete);

module.exports = router;
