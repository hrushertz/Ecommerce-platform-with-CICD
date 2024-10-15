import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { useCart } from './CartContext'; // Import CartContext for authentication check
import {
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Box,
} from '@mui/material';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
    });

    const { isAdminLoggedIn } = useCart(); // Use admin login state from CartContext
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to admin login if not logged in
        if (!isAdminLoggedIn) {
            navigate('/admin/login'); // Redirect to the admin login page
        } else {
            fetchProducts();
        }
    }, [isAdminLoggedIn, navigate]);

    const fetchProducts = async () => {
        const response = await fetch('http://buyhive.tech/api/products');
        const data = await response.json();
        setProducts(data);
    };

    const handleDeleteProduct = async (id) => {
        await fetch(`http://buyhive.tech/api/products/${id}`, {
            method: 'DELETE',
        });
        fetchProducts(); // Refresh the product list
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        await fetch('http://buyhive.tech/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        setNewProduct({ name: '', description: '', price: '' }); // Reset the form
        fetchProducts(); // Refresh the product list
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    return (
        <div>
            <Typography variant="h4">Admin Dashboard</Typography>

            <Typography variant="h6">Manage Products</Typography>

            <form onSubmit={handleAddProduct}>
                <Box display="flex" flexDirection="column" mb={2}>
                    <TextField
                        label="Product Name"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        required
                    />
                    <TextField
                        label="Price"
                        name="price"
                        type="number"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Add Product
                    </Button>
                </Box>
            </form>

            <List>
                {products.map((product) => (
                    <ListItem key={product.id}>
                        <ListItemText primary={product.name} secondary={`Price: $${product.price}`} />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteProduct(product.id)}
                        >
                            Delete
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default AdminDashboard;
