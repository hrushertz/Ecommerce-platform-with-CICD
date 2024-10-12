import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';
import { Card, CardContent, Button, Typography, CircularProgress } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    if (!product) {
        return <Typography>Product not found!</Typography>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="body1">{product.description}</Typography>
                <Typography variant="h5">Price: ${product.price}</Typography>
                <Button variant="contained" color="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardContent>
        </Card>
    );
};

export default ProductDetails;
