import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart(); // Use cart context

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
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
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found!</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;
