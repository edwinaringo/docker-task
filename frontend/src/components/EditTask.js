import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Card, CardContent, Grid, LinearProgress, MenuItem, Select, InputLabel, FormControl, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; 
import API from '../api';
import moment from 'moment';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending',
    recurring: 'None',
    attachments: '',
    progress: 0,
    category: { name: '' },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTask();
  }, []);

  // Fetch task details from API
  const fetchTask = async () => {
    try {
      const response = await API.get(`/tasks/${id}`);
      setTaskData(response.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/tasks/${id}`, taskData);
      alert('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task.');
    }
  };

  // Handle task deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/tasks/${id}`);
        alert('Task deleted successfully!');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task.');
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      {loading ? (
        <Typography>Loading task details...</Typography>
      ) : (
        <Box>
          {/* Task Details Heading */}
          <Typography variant="h4" gutterBottom sx={{ color: '#7A4BFF', fontWeight: '600' }}>
            Task Details
          </Typography>

          {/* Big Card for Task Details */}
          <Paper sx={{ mb: 4, p: 3, borderRadius: '20px', backgroundColor: '#F4F5FC', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: '#7A4BFF', fontWeight: '600' }}>{taskData.title}</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>{taskData.description}</Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#7A7A7A' }}>Priority: {taskData.priority}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#7A7A7A' }}>Status: {taskData.status}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#7A7A7A' }}>Category: {taskData.category?.name || 'No category'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#7A7A7A' }}>Recurring: {taskData.recurring}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#7A7A7A' }}>
                    Due Date: {taskData.dueDate ? moment(taskData.dueDate).format('MMM D, YYYY') : 'No due date'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#7A7A7A' }}>
                    Progress: {taskData.progress}%
                  </Typography>
                  <LinearProgress variant="determinate" value={taskData.progress} sx={{ mt: 1, backgroundColor: '#ECECEC' }} />
                </Grid>
              </Grid>

              {taskData.attachments && (
                <Typography variant="body2" sx={{ mt: 2, color: '#7A7A7A' }}>
                  Attachments: <a href={taskData.attachments} target="_blank" rel="noopener noreferrer">{taskData.attachments}</a>
                </Typography>
              )}
            </CardContent>
          </Paper>

          {/* Edit Form */}
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom sx={{ color: '#7A4BFF', fontWeight: '600' }}>Edit Task</Typography>

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

            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={taskData.dueDate ? moment(taskData.dueDate).format('YYYY-MM-DD') : ''}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: '#fff', borderRadius: '10px' }}
            />

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
              Update Task
            </Button>
          </form>

          {/* Delete Task Button */}
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            fullWidth
            sx={{ mt: 3, py: 2, fontSize: '16px', borderRadius: '10px' }}
          >
            Delete Task
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EditTask;
