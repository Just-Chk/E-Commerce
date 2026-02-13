// API Configuration
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'  // Local development
    : 'https://e-commerce-cgg1.onrender.com/api';  // Production

console.log('🌐 API URL:', API_URL);

// Axios default configuration
axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

// Request interceptor
axios.interceptors.request.use(
    (config) => {
        console.log(`🚀 Request: ${config.method.toUpperCase()} ${config.url}`);
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
    (response) => {
        console.log(`✅ Response: ${response.status}`);
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(`❌ Error ${error.response.status}:`, error.response.data);
        } else if (error.request) {
            console.error('❌ No response from server. Make sure backend is running on', API_URL);
        } else {
            console.error('❌ Error:', error.message);
        }
        return Promise.reject(error);
    }
);
