const express = require('express');
const router = express.Router();

const sale_controller = require('../controllers/sale.controller');

router.get('/test', sale_controller.test);
router.get('/', sale_controller.sales_get_all);
router.get('/date', sale_controller.sales_by_date);
router.post('/create', sale_controller.sale_create);
router.post('/betacreate', sale_controller.sale_products_create);
router.get('/:id', sale_controller.sale_details);
router.put('/:id/update', sale_controller.sale_update);
router.delete('/:id/delete', sale_controller.sale_delete);

module.exports = router;