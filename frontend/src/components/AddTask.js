import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, InputLabel, Select, FormControl, Grid, Paper } from '@mui/material';
import API from '../api'; 

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending',
    recurring: 'None',
    attachments: '',
    progress: 0,  
    categoryId: '', 
  });

  const [categories, setCategories] = useState([]); 

  // Fetch available categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/categories'); 
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,  
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/tasks', taskData);
      console.log('Task created:', response.data);
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task.');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#7A4BFF', textAlign: 'center', fontWeight: '600' }}>
        Create a New Task
      </Typography>

      <Paper sx={{ p: 4, backgroundColor: '#F4F5FC', borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Task Title */}
            <Grid item xs={12}>
              <TextField
                label="Task Title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
              />
            </Grid>

            {/* Task Description */}
            <Grid item xs={12}>
              <TextField
                label="Task Description"
                name="description"
                value={taskData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
                sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
              />
            </Grid>

            {/* Task Priority */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Task Due Date */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Due Date"
                name="dueDate"
                type="date"
                value={taskData.dueDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
                sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
              />
            </Grid>

            {/* Task Status */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Overdue">Overdue</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Recurring Task */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="recurring-label">Recurring</InputLabel>
                <Select
                  labelId="recurring-label"
                  name="recurring"
                  value={taskData.recurring}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Attachments */}
            <Grid item xs={12}>
              <TextField
                label="Attachments (URL)"
                name="attachments"
                value={taskData.attachments}
                onChange={handleChange}
                fullWidth
                margin="normal"
                sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
              />
            </Grid>

            {/* Task Progress */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Progress (%)"
                name="progress"
                type="number"
                value={taskData.progress}
                onChange={handleChange} 
                fullWidth
                margin="normal"
                required
                inputProps={{ min: 0, max: 100 }}
                sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
              />
            </Grid>

            {/* Category Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="categoryId"
                  value={taskData.categoryId}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
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
                Add Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddTask;
