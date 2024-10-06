import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductListing from './Components/ProductListing';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import { CartProvider } from './Components/CartContext';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <div>
                    <h1>My E-commerce Store</h1>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/cart" style={{ marginLeft: '20px' }}>View Cart</Link>
                    </nav>
                    <Routes>
                        <Route path="/" element={<ProductListing />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
