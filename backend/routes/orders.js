const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.use(auth); // All order routes require authentication

router.post('/', createOrder);
router.get('/', getOrders);

module.exports = router;