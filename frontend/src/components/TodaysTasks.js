import React from 'react';
import { Grid, Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; 
import moment from 'moment';

const TodaysTasks = () => {
  const location = useLocation(); 
  const tasks = location.state?.tasks || [];

  return (
    <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Today's Tasks
      </Typography>

      {tasks.length > 0 ? (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Link to={`/edit-task/${task.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">Priority: {task.priority}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Due Date: {task.dueDate ? moment(task.dueDate).format('MMM D, YYYY') : 'No due date'}
                    </Typography>
                    <Typography variant="body2">Progress: {task.progress}%</Typography>
                    <LinearProgress variant="determinate" value={task.progress} sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <img src="/images/notask.jpg" alt="No tasks today" style={{ width: '500px', marginBottom: '20px' }} />
          <Typography variant="h5" sx={{ color: '#7A4BFF' }}>No Tasks Today</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TodaysTasks;
