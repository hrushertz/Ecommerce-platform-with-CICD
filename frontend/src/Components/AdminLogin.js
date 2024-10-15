// AdminLogin.js
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { adminLogin } = useCart(); // Get the admin login function
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://buyhive.tech/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            adminLogin(); // Set admin login state to true
            navigate('/admin/dashboard'); // Redirect to the admin dashboard
        } else {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth: '400px',
                margin: 'auto',
                padding: '20px',
                mt: 3,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography variant="h4" gutterBottom>Admin Login</Typography>
            <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username} // Ensure value is defined
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password} // Ensure value is defined
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
                Login
            </Button>
        </Box>
    );
};

export default AdminLogin;
