import React, { createContext, useContext, useState, useEffect } from 'react';

// Update BACKEND_SERVICE_HOST to point to the Ingress
const BACKEND_SERVICE_HOST = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Fetch cart items when user logs in
        if (isLoggedIn && userId) {
            const fetchCart = async () => {
                const response = await fetch(`http://buyhive.tech/api/cart/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                } else {
                    console.error('Failed to fetch cart:', response.statusText);
                }
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
            }).catch((error) => console.error('Error adding to cart:', error));
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
            }).catch((error) => console.error('Error updating cart:', error));
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
