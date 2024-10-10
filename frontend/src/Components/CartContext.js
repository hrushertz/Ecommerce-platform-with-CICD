import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch cart items when user logs in
        if (isLoggedIn && userId) {
            const fetchCart = async () => {
                const response = await fetch(`http://127.0.0.1:5000/cart/${userId}`);
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
            fetch(`http://127.0.0.1:5000/cart/${userId}`, {
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
            fetch(`http://127.0.0.1:5000/cart/${userId}`, {
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
        setUserId(null);
        setCartItems([]); // Optionally clear local state
    };

    const login = (id) => {
        setIsLoggedIn(true);
        setUserId(id);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, logout, login, isLoggedIn }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
