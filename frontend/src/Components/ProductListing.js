import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { Card, CardContent, Button, Typography, Grid, CircularProgress } from '@mui/material';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/products`); // Use backticks here
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);
    

    const handleViewDetails = (id) => {
        navigate(`/product/${id}`);
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{product.name}</Typography>
                            <Typography variant="body2">{product.description}</Typography>
                            <Typography variant="h6">Price: ${product.price}</Typography>
                            <Button variant="contained" color="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                            <Button variant="outlined" onClick={() => handleViewDetails(product.id)}>View Details</Button>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductListing;
