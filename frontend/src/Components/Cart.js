import React from 'react';
import { useCart } from './CartContext';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart(); // Use cart context

    const handleCheckout = () => {
        alert('Proceeding to checkout');
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price}
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default Cart;
