const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');

router.get('/test', product_controller.test);

router.get('/', product_controller.product_get);
router.get('/details/:id', product_controller.product_details);
router.get('/find',product_controller.product_find);

router.post('/create', product_controller.product_create);
router.put('/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);

module.exports = router;