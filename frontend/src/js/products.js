// Products Module
const Products = {
    // Load all products with filters
    async loadProducts(filters = {}) {
        const container = document.getElementById('products-container');
        
        try {
            // Show loading state
            container.innerHTML = '<div class="loading"><div class="loading-spinner"></div><p>Loading products...</p></div>';
            
            // Test API connection first
            await this.testConnection();
            
            // Build query string
            const queryParams = new URLSearchParams();
            Object.keys(filters).forEach(key => {
                if (filters[key] && filters[key] !== '') {
                    queryParams.append(key, filters[key]);
                }
            });
            
            const queryString = queryParams.toString();
            const url = `/products${queryString ? '?' + queryString : ''}`;
            
            console.log('Fetching products from:', url);
            const response = await axios.get(url);
            console.log('Products received:', response.data);
            
            this.displayProducts(response.data);
        } catch (error) {
            console.error('Error loading products:', error);
            
            let errorMessage = 'Failed to load products. ';
            if (error.response) {
                errorMessage += `Server responded with status ${error.response.status}`;
                if (error.response.data && error.response.data.message) {
                    errorMessage += `: ${error.response.data.message}`;
                }
            } else if (error.request) {
                errorMessage += 'Could not connect to the server. Please check if the backend is running.';
            } else {
                errorMessage += error.message;
            }
            
            // Clear container first
            container.innerHTML = '';
            
            // Show error message
            container.innerHTML = `<div class="alert alert-error">${errorMessage}</div>`;
            
            // Display sample products as fallback
            this.displaySampleProducts();
        }
    },

    // Test API connection
    async testConnection() {
        try {
            const response = await axios.get('/test');
            console.log('API connection test successful:', response.data);
            return true;
        } catch (error) {
            console.log('API connection test failed, using fallback data');
            return false;
        }
    },

    // Display sample products (fallback)
    displaySampleProducts() {
        const container = document.getElementById('products-container');
        
        // Check if sample products are already displayed
        if (container.querySelector('.sample-products-note')) {
            return; // Already displaying sample products
        }
        
        const sampleProducts = [
            {
                _id: '1',
                name: 'Wireless Headphones',
                description: 'High-quality wireless headphones with noise cancellation',
                price: 99.99,
                category: 'Electronics',
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
                stock: 50
            },
            {
                _id: '2',
                name: 'Cotton T-Shirt',
                description: 'Comfortable 100% cotton t-shirt',
                price: 24.99,
                category: 'Clothing',
                imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300',
                stock: 100
            },
            {
                _id: '3',
                name: 'JavaScript: The Good Parts',
                description: 'A must-read for JavaScript developers',
                price: 29.99,
                category: 'Books',
                imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300',
                stock: 30
            },
            {
                _id: '4',
                name: 'Coffee Maker',
                description: 'Programmable coffee maker with thermal carafe',
                price: 79.99,
                category: 'Home',
                imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300',
                stock: 25
            }
        ];
        
        this.displayProducts(sampleProducts);
        
        // Add a note that these are sample products
        const note = document.createElement('div');
        note.className = 'alert alert-warning sample-products-note';
        note.textContent = 'Using sample products - Backend connection failed';
        container.insertAdjacentElement('afterbegin', note);
    },

    // Display products in grid
    displayProducts(products) {
        const container = document.getElementById('products-container');
        
        if (!products || products.length === 0) {
            container.innerHTML = '<div class="alert alert-info">No products found</div>';
            return;
        }

        // Clear only the products, keep any alert messages
        const existingAlerts = container.querySelectorAll('.alert');
        container.innerHTML = '';
        
        // Re-add alerts
        existingAlerts.forEach(alert => {
            container.appendChild(alert);
        });

        let html = '';
        products.forEach(product => {
            html += `
                <div class="product-card">
                    <img src="${product.imageUrl}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300?text=Product'">
                    <div class="product-info">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-description">${product.description.substring(0, 100)}...</p>
                        <span class="product-category">${product.category}</span>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button onclick="Cart.addItem('${product._id}', 1)" class="btn btn-primary add-to-cart-btn">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
        });

        // Append products after alerts
        container.insertAdjacentHTML('beforeend', html);
    },

    // Initialize filters (same as before)
    initFilters() {
        const searchInput = document.getElementById('search');
        const categoryFilter = document.getElementById('category-filter');
        const sortFilter = document.getElementById('sort-filter');
        const minPrice = document.getElementById('min-price');
        const maxPrice = document.getElementById('max-price');

        let debounceTimeout;

        const applyFilters = () => {
            const filters = {
                search: searchInput.value,
                category: categoryFilter.value,
                sort: sortFilter.value,
                minPrice: minPrice.value,
                maxPrice: maxPrice.value
            };
            this.loadProducts(filters);
        };

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(applyFilters, 500);
            });
        }

        if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
        if (sortFilter) sortFilter.addEventListener('change', applyFilters);
        if (minPrice) minPrice.addEventListener('change', applyFilters);
        if (maxPrice) maxPrice.addEventListener('change', applyFilters);
    }
};