import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import API from '../api'; 

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch categories from the backend when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get('/categories'); 
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send category name to the API
      const response = await API.post('/categories', { name: categoryName });
      console.log('Category created:', response.data);
      alert('Category created successfully!');
      setCategoryName(''); 
      fetchCategories(); 
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category.');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 600, color: '#7A4BFF' }}>
        Manage Categories
      </Typography>

      <Paper sx={{ p: 4, backgroundColor: '#F4F5FC', borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
        {/* Form to add a new category */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Category Name"
            name="categoryName"
            value={categoryName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
          />

          <Button 
            variant="contained" 
            type="submit" 
            fullWidth 
            sx={{
              mt: 3, 
              py: 2, 
              backgroundColor: '#7A4BFF',
              fontSize: '16px', 
              fontWeight: '600',
              borderRadius: '10px',
            }}
          >
            Add Category
          </Button>
        </form>
      </Paper>

      {/* Display the list of categories */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#7A4BFF', fontWeight: 600 }}>
          All Categories
        </Typography>
        {categories.length > 0 ? (
          <Paper sx={{ p: 2, backgroundColor: '#F4F5FC', borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
            <List>
              {categories.map((category) => (
                <ListItem key={category.id} sx={{ backgroundColor: '#fff', borderRadius: '10px', my: 1 }}>
                  <ListItemText primary={category.name} sx={{ color: '#7A4BFF', fontWeight: 500 }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          <Typography>No categories available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AddCategory;
