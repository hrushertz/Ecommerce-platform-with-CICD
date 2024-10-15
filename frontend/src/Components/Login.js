import React, { useState } from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useCart();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://buyhive.tech/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.message === 'Login successful') {
            login(data.user_id); // Pass the user ID upon login
            navigate('/'); // Redirect to home on successful login
        } else {
            alert(data.message);
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
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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

export default Login;
