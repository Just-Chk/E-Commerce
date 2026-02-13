const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('../controllers/productController');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Products route is working!' });
});

// Main routes
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct); // For seeding

module.exports = router;