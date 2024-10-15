// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import ProductListing from './Components/ProductListing';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import Signup from './Components/Signup';
import Login from './Components/Login';
import AdminLogin from './Components/AdminLogin';
import AdminSignup from './Components/AdminSignup';
import AdminDashboard from './Components/AdminDashboard';
import { CartProvider, useCart } from './Components/CartContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const AppBarWithLogout = () => {
    const { isLoggedIn = false, isAdminLoggedIn = false, logout, adminLogout } = useCart() || {}; // Add fallbacks for destructured values
    const navigate = useNavigate();

    const handleAdminLogout = () => {
        adminLogout();
        navigate('/admin/login');
        window.location.reload();
    };

    const handleUserLogout = () => {
        logout();
        navigate('/login');
        window.location.reload();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    BUY HIVE
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/cart">View Cart</Button>
                {isAdminLoggedIn ? (
                    <Button color="inherit" onClick={handleAdminLogout}>Admin Logout</Button>
                ) : isLoggedIn ? (
                    <Button color="inherit" onClick={handleUserLogout}>Logout</Button>
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
    const { isAdminLoggedIn = false } = useCart() || {}; // Add fallback

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

                        {!isAdminLoggedIn ? (
                            <>
                                <Route path="/admin/login" element={<AdminLogin />} />
                                <Route path="/admin/signup" element={<AdminSignup />} />
                            </>
                        ) : (
                            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                        )}

                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;





//put this before Admindashboard in above return block.
//<Route path="/admin/login" element={<AdminLogin />} />
//<Route path="/admin/signup" element={<AdminSignup />} />


/* import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import ProductListing from './Components/ProductListing';
import ProductDetails from './Components/ProductDetails';
import Cart from './Components/Cart';
import Signup from './Components/Signup';
import Login from './Components/Login';
import AdminLogin from './Components/AdminLogin'; // Import AdminLogin
import AdminSignup from './Components/AdminSignup'; // Import AdminSignup
import AdminDashboard from './Components/AdminDashboard'; // Import AdminDashboard
import { CartProvider, useCart } from './Components/CartContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const AppBarWithLogout = () => {
    const { isLoggedIn, isAdminLoggedIn, logout, adminLogout } = useCart(); // Get login state and logout functions
    const navigate = useNavigate(); // Initialize useNavigate

    const handleAdminLogout = () => {
        adminLogout(); // Reset admin login state
        navigate('/admin/login'); // Redirect to admin login
        window.location.reload(); // Optionally reload the page
    };

    const handleUserLogout = () => {
        logout(); // Reset user login state
        navigate('/login'); // Redirect to user login
        window.location.reload(); // Optionally reload the page
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    BUY HIVE
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/cart">View Cart</Button>
                {isAdminLoggedIn ? (
                    <Button color="inherit" onClick={handleAdminLogout}>Admin Logout</Button>
                ) : isLoggedIn ? (
                    <Button color="inherit" onClick={handleUserLogout}>Logout</Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        <Button color="inherit" component={Link} to="/admin/login">Admin Login</Button>
                        <Button color="inherit" component={Link} to="/admin/signup">Admin Signup</Button>
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
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/signup" element={<AdminSignup />} />  
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </Router>
        </CartProvider>
    );
};

export default App; */