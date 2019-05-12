const express = require('express');
const router = express.Router();

const sale_controller = require('../controllers/client.controller');

router.get('/test', client_controller.test);
router.post('/create', client_controller.client_create);
router.get('/:id', client_controller.client_details);
router.put('/:id/update', client_controller.client_update);
router.delete('/:id/delete', client_controller.client_delete);

module.exports = router;