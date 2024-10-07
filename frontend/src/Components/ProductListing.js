import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Use cart context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/products');
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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                        <button onClick={() => handleViewDetails(product.id)}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductListing;
