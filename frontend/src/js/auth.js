// Auth Module
const Auth = {
    // Check if user is authenticated
    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    // Get current user
    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Sign up
    async signup(userData) {
        try {
            const response = await axios.post('/auth/signup', userData);
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            return { success: true, user };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Signup failed'
            };
        }
    },

    // Login
    async login(credentials) {
        try {
            const response = await axios.post('/auth/login', credentials);
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            return { success: true, user };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    },

    // Logout
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    },

    // Update UI based on auth state
    updateUI() {
        const authButtons = document.getElementById('auth-buttons');
        const userInfo = document.getElementById('user-info');
        const userName = document.getElementById('user-name');
        
        if (this.isAuthenticated()) {
            const user = this.getCurrentUser();
            authButtons.style.display = 'none';
            userInfo.style.display = 'flex';
            userName.textContent = `Hello, ${user.name}`;
        } else {
            authButtons.style.display = 'flex';
            userInfo.style.display = 'none';
        }
    }
};