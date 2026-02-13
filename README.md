E-Shop - Full Stack E-Commerce Application
A modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React-style frontend with vanilla JavaScript) featuring user authentication, product browsing, shopping cart functionality, and order management.

🚀 Live Demo
Frontend: https://chk0225-ecommerce.netlify.app

Backend API: https://e-commerce-cgg1.onrender.com

📋 Features
User Features
User Authentication: Secure signup/login with JWT tokens

Product Browsing: Browse products with filtering and search capabilities

Shopping Cart: Add/remove items, update quantities

Order Management: Place orders and view order history

Responsive Design: Works seamlessly on desktop and mobile devices

Product Features
Advanced Filtering: Filter by category, price range

Search Functionality: Search products by name or description

Sorting Options: Sort by price (low-high, high-low) and newest arrivals

Product Details: View detailed product information

Technical Features
JWT Authentication: Secure token-based authentication

Password Encryption: BCrypt password hashing

RESTful API: Well-structured API endpoints

MongoDB Integration: Efficient data storage with Mongoose ODM

Environment Configuration: Secure environment variable management

🛠️ Technology Stack
Backend
Node.js - JavaScript runtime

Express.js - Web application framework

MongoDB - NoSQL database

Mongoose - MongoDB object modeling

JWT - JSON Web Tokens for authentication

BCrypt - Password hashing

CORS - Cross-origin resource sharing

Frontend
HTML5/CSS3 - Structure and styling

Vanilla JavaScript - Core functionality

Axios - HTTP client for API requests

CSS Grid/Flexbox - Responsive layouts

📁 Project Structure
text
e-commerce-project/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── utils/
│   │   └── seedProduct.js
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── auth.js
│       ├── cart.js
│       ├── config.js
│       ├── main.js
│       └── products.js
├── .env
├── .gitignore
├── package.json
└── README.md

🚦 API Endpoints
Authentication Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register a new user
POST	/api/auth/login	Login user
Product Routes
Method	Endpoint	Description
GET	/api/products	Get all products (with filters)
GET	/api/products/:id	Get single product
POST	/api/products	Create product (admin/seeding)
Cart Routes (Protected)
Method	Endpoint	Description
GET	/api/cart	Get user's cart
POST	/api/cart/add	Add item to cart
PUT	/api/cart/update/:itemId	Update cart item quantity
DELETE	/api/cart/remove/:itemId	Remove item from cart
Order Routes (Protected)
Method	Endpoint	Description
POST	/api/orders	Create new order
GET	/api/orders	Get user's orders

🏁 Getting Started
Prerequisites
Node.js (v14 or higher)

MongoDB (local or Atlas)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/yourusername/e-shop.git
cd e-shop
Install backend dependencies

bash
npm install
Create environment variables
Create a .env file in the root directory:

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
Seed the database with products

bash
node utils/seedProduct.js
Start the backend server

bash
npm run dev
Serve the frontend
Open frontend/index.html in your browser or use a live server extension.

🔧 Configuration
Backend Configuration
Port: Default 5000 (configurable via PORT env)

Database: MongoDB connection string required

JWT Secret: Required for token generation

Frontend Configuration
The frontend automatically detects the environment:

Local Development: http://localhost:5000/api

Production: https://e-commerce-mtzn.onrender.com

🌟 Key Features Implementation
Authentication Flow
User registers with name, email, password

Password is hashed using BCrypt before storage

On login, JWT token is generated and returned

Token is stored in localStorage and sent with subsequent requests

Shopping Cart Logic
Cart is user-specific and persists across sessions

Real-time quantity updates

Stock validation during checkout

Automatic cart clearing after order placement

Product Filtering
Full-text search on name and description

Category-based filtering

Price range filtering

Multiple sorting options

Made with ❤️ using the MERN stack
