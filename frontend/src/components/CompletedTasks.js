import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import API from '../api';
import moment from 'moment';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  // Fetch completed tasks from the API
  const fetchCompletedTasks = async () => {
    try {
      const response = await API.get('/tasks/completed');
      setCompletedTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#F4F5FC' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: '600', color: '#7A4BFF', textAlign: 'center' }}>
        Completed Tasks
      </Typography>

      {loading ? (
        <Typography>Loading completed tasks...</Typography>
      ) : (
        <Grid container spacing={2}>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <Grid item xs={6} sm={4} md={3} key={task.id}>
                <Link to={`/edit-task/${task.id}`} style={{ textDecoration: 'none' }}>
                  <Card 
                    sx={{ 
                      backgroundColor: '#FFFFFF',
                      borderRadius: '20px',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', 
                      paddingTop: '100%', 
                      position: 'relative',
                      cursor: 'pointer',
                    }}>
                    <CardContent sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                      <Typography variant="h6" sx={{ color: '#7A4BFF', fontWeight: 600 }}>{task.title}</Typography>
                      <Typography variant="body2" sx={{ color: '#7A7A7A' }}>Priority: {task.priority}</Typography>
                      <Typography variant="body2" sx={{ color: '#7A7A7A' }}>
                        Completed Date: {task.completionDate ? moment(task.completionDate).format('MMM D, YYYY') : 'No completion date'}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, color: '#7A4BFF' }}>
                        Progress: {task.progress}%
                      </Typography>
                      <LinearProgress variant="determinate" value={task.progress} sx={{ mt: 1, backgroundColor: '#ECECEC' }} />
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', width: '100%' }}>No completed tasks found.</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default CompletedTasks;
