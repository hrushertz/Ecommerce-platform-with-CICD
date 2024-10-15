// AdminSignup.js
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';

const AdminSignup = () => {
    const [formData, setFormData] = useState({ username: '', password: '' }); // Initialize with empty strings
    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://buyhive.tech/api/admin/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json(); // Parse the response to JSON

            if (response.ok) { // Check if response was successful
                alert('Admin account created!');
                navigate('/admin/login'); // Navigate to Admin Login page immediately
            } else {
                alert(data.message || 'Signup failed.'); // Show error message if signup failed
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred while signing up.'); // Handle network errors
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
            <Typography variant="h4" gutterBottom>Admin Signup</Typography>
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
                Sign Up
            </Button>
        </Box>
    );
};

export default AdminSignup;
