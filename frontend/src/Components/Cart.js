import React from 'react';
import { useCart } from './CartContext';
import { Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress } from '@mui/material';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    const handleCheckout = () => {
        alert('Proceeding to checkout');
    };

    if (cartItems.length === 0) {
        return <Typography>Your cart is empty.</Typography>;
    }

    return (
        <div>
            <Typography variant="h4">Shopping Cart</Typography>
            <List>
                {cartItems.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item.name} secondary={`Price: $${item.price}`} />
                        <ListItemSecondaryAction>
                            <Button color="secondary" onClick={() => removeFromCart(item.id)}>Remove</Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
        </div>
    );
};

export default Cart;
