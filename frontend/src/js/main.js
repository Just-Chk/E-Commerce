// Main Application
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Debug log
    
    // Initialize auth UI
    Auth.updateUI();

    // Wait a bit for everything to be ready
    setTimeout(() => {
        // Load products
        if (typeof Products !== 'undefined' && Products.loadProducts) {
            console.log('Loading products...');
            Products.loadProducts();
            Products.initFilters();
        } else {
            console.error('Products module not loaded properly');
        }
    }, 100);

    // Setup event listeners
    setupEventListeners();
    
    // Load cart if user is authenticated
    if (Auth.isAuthenticated()) {
        setTimeout(() => {
            Cart.getCart().then(cart => {
                if (cart) Cart.updateCartCount(cart);
            }).catch(err => console.error('Failed to load cart:', err));
        }, 200);
    }
});

function setupEventListeners() {
    // Auth modals
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const cartBtn = document.querySelector('.cart-icon');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close');
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        const result = await Auth.login({ email, password });
        if (result.success) {
            closeModal('login-modal');
            Auth.updateUI();
            Cart.getCart(); // Refresh cart count
            Cart.showAlert('Login successful!', 'success');
        } else {
            Cart.showAlert(result.message, 'error');
        }
    });

    // Signup form
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        const result = await Auth.signup({ name, email, password });
        if (result.success) {
            closeModal('signup-modal');
            Auth.updateUI();
            Cart.getCart(); // Refresh cart count
            Cart.showAlert('Account created successfully!', 'success');
        } else {
            Cart.showAlert(result.message, 'error');
        }
    });

    // Checkout form
    document.getElementById('checkout-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const shippingAddress = {
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zip').value,
            country: document.getElementById('country').value
        };

        const result = await Cart.checkout(shippingAddress);
        if (result.success) {
            closeModal('checkout-modal');
            closeModal('cart-modal');
        }
    });

    // Modal triggers
    if (loginBtn) loginBtn.addEventListener('click', () => openModal('login-modal'));
    if (signupBtn) signupBtn.addEventListener('click', () => openModal('signup-modal'));
    if (logoutBtn) logoutBtn.addEventListener('click', () => Auth.logout());
    if (cartBtn) cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        Cart.showCart();
    });
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        closeModal('cart-modal');
        openModal('checkout-modal');
    });

    // Close modal buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

window.Cart = Cart;