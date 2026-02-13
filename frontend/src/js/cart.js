// Cart Module
const Cart = {
    // Get cart
    async getCart() {
        try {
            const response = await axios.get('/cart');
            return response.data;
        } catch (error) {
            console.error('Failed to get cart:', error);
            return null;
        }
    },

    // Add item to cart
    async addItem(productId, quantity = 1) {
        if (!Auth.isAuthenticated()) {
            alert('Please login to add items to cart');
            document.getElementById('login-btn').click();
            return;
        }

        try {
            const response = await axios.post('/cart/add', { productId, quantity });
            this.updateCartCount(response.data);
            this.showCart();
            this.showAlert('Item added to cart', 'success');
        } catch (error) {
            this.showAlert(error.response?.data?.message || 'Failed to add item', 'error');
        }
    },

    // Update cart item quantity
    async updateItem(itemId, quantity) {
        try {
            if (quantity <= 0) {
                await this.removeItem(itemId);
                return;
            }

            const response = await axios.put(`/cart/update/${itemId}`, { quantity });
            this.updateCartCount(response.data);
            this.displayCartItems(response.data);
            this.showAlert('Cart updated', 'success');
        } catch (error) {
            this.showAlert('Failed to update cart', 'error');
        }
    },

    // Remove item from cart
    async removeItem(itemId) {
        try {
            const response = await axios.delete(`/cart/remove/${itemId}`);
            this.updateCartCount(response.data);
            this.displayCartItems(response.data);
            this.showAlert('Item removed from cart', 'success');
        } catch (error) {
            this.showAlert('Failed to remove item', 'error');
        }
    },

    // Update cart count in header
    updateCartCount(cart) {
        const count = cart.items.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    },

    // Display cart items
    async displayCartItems(cart) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (!cart.items || cart.items.length === 0) {
            cartItemsContainer.innerHTML = '<div class="alert alert-info">Your cart is empty</div>';
            cartTotal.textContent = '0.00';
            return;
        }

        let html = '<div class="cart-items">';
        let total = 0;

        cart.items.forEach(item => {
            const product = item.productId;
            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            html += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${product.name}</div>
                        <div class="cart-item-price">$${product.price.toFixed(2)} each</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="Cart.updateItem('${item._id}', ${item.quantity - 1})" 
                                class="quantity-btn">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="Cart.updateItem('${item._id}', ${item.quantity + 1})" 
                                class="quantity-btn">+</button>
                        <button onclick="Cart.removeItem('${item._id}')" 
                                class="btn btn-danger" style="margin-left: 10px;">Remove</button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        cartItemsContainer.innerHTML = html;
        cartTotal.textContent = total.toFixed(2);
    },

    // Show cart modal
    async showCart() {
        if (!Auth.isAuthenticated()) {
            alert('Please login to view cart');
            return;
        }

        const cart = await this.getCart();
        if (cart) {
            this.displayCartItems(cart);
            document.getElementById('cart-modal').style.display = 'block';
        }
    },

    // Checkout
    async checkout(shippingAddress) {
        try {
            const response = await axios.post('/orders', { shippingAddress });
            this.showAlert('Order placed successfully!', 'success');
            this.getCart(); // Refresh cart
            return { success: true, order: response.data };
        } catch (error) {
            this.showAlert(error.response?.data?.message || 'Checkout failed', 'error');
            return { success: false };
        }
    },

    // Show alert message
    showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
};