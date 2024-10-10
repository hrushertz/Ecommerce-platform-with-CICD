import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductListing from './Components/ProductListing';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import Signup from './Components/Signup';
import Login from './Components/Login';
import { CartProvider, useCart } from './Components/CartContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const AppBarWithLogout = () => {
    const { isLoggedIn, logout } = useCart();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My E-commerce Store
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/cart">View Cart</Button>
                {isLoggedIn ? (
                    <>
                        <Button color="inherit" onClick={() => { logout(); window.location.reload(); }}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

const App = () => {
    return (
        <CartProvider>
            <Router>
                <div>
                    <AppBarWithLogout />
                    <Routes>
                        <Route path="/" element={<ProductListing />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
