// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Track admin login
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch cart items when user logs in
        if (isLoggedIn && userId) {
            const fetchCart = async () => {
                const response = await fetch(`http://buyhive.tech/api/cart/${userId}`);
                const data = await response.json();
                setCartItems(data);
            };
            fetchCart();
        }
    }, [isLoggedIn, userId]);

    const addToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
        // Save cart to the backend
        if (userId) {
            fetch(`http://buyhive.tech/api/cart/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ product }),
            });
        }
    };

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        // Update cart in the backend
        if (userId) {
            fetch(`http://buyhive.tech/api/cart/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart: updatedCart }),
            });
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setIsAdminLoggedIn(false); // Reset admin login state
        setUserId(null);
        setCartItems([]); // Optionally clear local state
    };

    const login = (id) => {
        setIsLoggedIn(true);
        setUserId(id);
    };

    const adminLogin = () => {
        setIsAdminLoggedIn(true); // Set admin login state
    };

    const adminLogout = () => {
        setIsAdminLoggedIn(false); // Reset admin login state
    };

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart, 
            removeFromCart, 
            logout, 
            login, 
            isLoggedIn, 
            isAdminLoggedIn, // Provide admin login state
            adminLogin,      // Provide admin login function
            adminLogout      // Provide admin logout function
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
