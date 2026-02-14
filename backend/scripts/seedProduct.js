const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');

dotenv.config({ path: path.join(__dirname, '../.env') });

const products = [
    // Electronics
    {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 99.99,
        category: 'Electronics',
        imageUrl: 'https://media.istockphoto.com/id/1412240771/photo/headphones-on-white-background.jpg?s=612x612&w=0&k=20&c=DwpnlOcMzclX8zJDKOMSqcXdc1E7gyGYgfX5Xr753aQ=',
        stock: 50
    },
    {
        name: 'Smart Watch',
        description: 'Fitness tracker and smartwatch',
        price: 199.99,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300',
        stock: 40
    },
    {
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof speaker with 20hr battery life',
        price: 79.99,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300',
        stock: 35
    },
    {
        name: 'Tablet',
        description: '10-inch display with 64GB storage',
        price: 329.99,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
        stock: 20
    },
    {
        name: 'Gaming Mouse',
        description: 'RGB gaming mouse with 6 programmable buttons',
        price: 49.99,
        category: 'Electronics',
        imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300',
        stock: 45
    },

    // Clothing
    {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 24.99,
        category: 'Clothing',
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
        stock: 100
    },
    
    {
        name: 'Hoodie',
        description: 'Warm fleece hoodie with kangaroo pocket',
        price: 49.99,
        category: 'Clothing',
        imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300',
        stock: 60
    },
    {
        name: 'Running Shorts',
        description: 'Lightweight quick-dry running shorts',
        price: 19.99,
        category: 'Clothing',
        imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300',
        stock: 85
    },

    // Books
    {
        name: 'JavaScript: The Good Parts',
        description: 'A must-read for JavaScript developers',
        price: 29.99,
        category: 'Books',
        imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300',
        stock: 30
    },
    {
        name: 'The Great Gatsby',
        description: 'Classic American novel',
        price: 14.99,
        category: 'Books',
        imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
        stock: 50
    },
    {
        name: 'Python Crash Course',
        description: 'Hands-on programming introduction',
        price: 34.99,
        category: 'Books',
        imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300',
        stock: 40
    },
    {
        name: 'The Alchemist',
        description: 'Inspirational fiction novel',
        price: 16.99,
        category: 'Books',
        imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300',
        stock: 45
    },
    {
        name: 'Cookbook Collection',
        description: '500 healthy recipes for beginners',
        price: 24.99,
        category: 'Books',
        imageUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=300',
        stock: 25
    },

    // Home
    {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe',
        price: 79.99,
        category: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300',
        stock: 25
    },
    {
        name: 'Desk Lamp',
        description: 'LED desk lamp with wireless charging',
        price: 45.99,
        category: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300',
        stock: 40
    },
    {
        name: 'Plant Pot',
        description: 'Ceramic pot with drainage',
        price: 15.99,
        category: 'Home',
        imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300',
        stock: 80
    },

    // Sports
    {
        name: 'Water Bottle',
        description: 'Stainless steel insulated 1L',
        price: 24.99,
        category: 'Sports',
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300',
        stock: 90
    },

    // Others
    {
        name: 'Backpack',
        description: 'Water-resistant laptop backpack',
        price: 49.99,
        category: 'Other',
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
        stock: 55
    },
    {
        name: 'Sunglasses',
        description: 'UV400 polarized sunglasses',
        price: 89.99,
        category: 'Other',
        imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300',
        stock: 40
    },
    {
        name: 'Watch',
        description: 'Classic analog watch',
        price: 149.99,
        category: 'Other',
        imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300',
        stock: 25
    },
    {
        name: 'Wallet',
        description: 'RFID blocking leather wallet',
        price: 34.99,
        category: 'Other',
        imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300',
        stock: 50
    },
    {
        name: 'Perfume',
        description: 'Eau de toilette 100ml',
        price: 59.99,
        category: 'Other',
        imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300',
        stock: 35
    },
];

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('✅ MongoDB connected');
        
        await Product.deleteMany({});
        console.log('✅ Products cleared');
        
        await Product.insertMany(products);
        console.log(`✅ ${products.length} products seeded successfully`);
        
        process.exit(0);
    })
    .catch((err) => {
        console.error('❌ Seeding error:', err.message);
        process.exit(1);
    });
