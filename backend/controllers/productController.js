const Product = require('../models/Product');

exports.getProducts = async (req, res) => 
{
    try 
    {
        console.log('Fetching products...');
        const { search, category, minPrice, maxPrice, sort } = req.query;
        
        let query = {};

        // Search by name or description
        if (search) 
        {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by category
        if (category && category !== '') 
        {
            query.category = category;
        }

        // Filter by price range
        if (minPrice || maxPrice) 
        {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Sorting
        let sortOption = {};
        if (sort) 
        {
            switch(sort) 
            {
                case 'price-asc':
                    sortOption.price = 1;
                    break;
                case 'price-desc':
                    sortOption.price = -1;
                    break;
                case 'newest':
                    sortOption.createdAt = -1;
                    break;
                default:
                    sortOption.createdAt = -1;
            }
        }

        const products = await Product.find(query).sort(sortOption);
        console.log(`Found ${products.length} products`);
        
        if (products.length === 0) 
        {
            // If no products found, seed some default products
            await seedDefaultProducts();
            const seededProducts = await Product.find(query).sort(sortOption);
            return res.json(seededProducts);
        }
        
        res.json(products);
    } 
    
    catch (error) 
    {
        console.error('Error in getProducts:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Helper function to seed default products
async function seedDefaultProducts() 
{
    const products = 
    [
        {
            name: 'Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 99.99,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
            stock: 50
        },
        {
            name: 'Cotton T-Shirt',
            description: 'Comfortable 100% cotton t-shirt',
            price: 24.99,
            category: 'Clothing',
            imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
            stock: 100
        },
        {
            name: 'JavaScript: The Good Parts',
            description: 'A must-read for JavaScript developers',
            price: 29.99,
            category: 'Books',
            imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300',
            stock: 30
        },
        {
            name: 'Coffee Maker',
            description: 'Programmable coffee maker with thermal carafe',
            price: 79.99,
            category: 'Home',
            imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300',
            stock: 25
        },
        {
            name: 'Yoga Mat',
            description: 'Non-slip exercise yoga mat',
            price: 34.99,
            category: 'Sports',
            imageUrl: 'https://images.unsplash.com/photo-1518615267842-d7521b7a01e0?w=300',
            stock: 60
        },
        {
            name: 'Smart Watch',
            description: 'Fitness tracker and smartwatch',
            price: 199.99,
            category: 'Electronics',
            imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300',
            stock: 40
        }
    ];

    try 
    {
        await Product.insertMany(products);
        console.log('Default products seeded successfully');
    } 
    
    catch (error) 
    {
        console.error('Error seeding products:', error);
    }
}


exports.getProductById = async (req, res) => 
{
    try 
    {
        const product = await Product.findById(req.params.id);
        if (!product) 
        {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } 
    
    catch (error) 
    {
        console.error('Error in getProductById:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create product (for seeding)
// @route   POST /api/products
exports.createProduct = async (req, res) => 
{
    try 
    {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } 
    
    catch (error) 
    {
        console.error('Error in createProduct:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};