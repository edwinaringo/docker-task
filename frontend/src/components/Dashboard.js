import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, TextField, LinearProgress, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './Sidebar'; 
import API from '../api'; 
import moment from 'moment'; 
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  const navigate = useNavigate(); 

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get('/tasks'); 
      const incompleteTasks = response.data.filter(task => task.status !== 'Completed');
      setTasks(incompleteTasks); 
      setFilteredTasks(incompleteTasks); 
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter tasks by category
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter(task => 
        task.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  // Calculate days left for a task
  const calculateDaysLeft = (dueDate) => {
    const currentDate = moment();
    const due = moment(dueDate);
    const daysLeft = due.diff(currentDate, 'days');
    return daysLeft >= 0 ? `${daysLeft} days left` : 'Overdue';
  };

  // Filter tasks that are due today
  const today = moment().format('YYYY-MM-DD');
  const todayTasks = tasks.filter((task) => moment(task.dueDate).format('YYYY-MM-DD') === today);

  // Navigate to Today's Tasks page
  const goToTodaysTasks = () => {
    navigate('/todays-tasks', { state: { tasks: todayTasks } });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#F4F5FC' }}>
        {/* Search bar */}
        <Box sx={{ display: 'flex', marginBottom: 4 }}>
          <TextField
            placeholder="Search by Category"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} sx={{ color: '#7A4BFF' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading ? (
          <Typography>Loading tasks...</Typography>
        ) : filteredTasks.length > 0 ? (
          <Grid container spacing={2}> 
            {/* Today's Task Section */}
            <Grid item xs={12}>
              <Card sx={{ backgroundColor: '#FFFFFF', p: 2, borderRadius: '20px', height: 200 }}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography variant="h5" gutterBottom>
                      Today Task
                    </Typography>
                    <Typography variant="body1">
                      Check your daily tasks and schedules
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, backgroundColor: '#7A4BFF' }}
                      onClick={goToTodaysTasks}
                    >
                      Today's Schedule
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <img
                      src="/images/task.jpg"
                      alt="Task illustration"
                      style={{ width: '50%' }} 
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* Task Cards Section */}
            {filteredTasks.map((task) => (
              <Grid item xs={6} sm={4} md={3} key={task.id}>
                <Link to={`/edit-task/${task.id}`} style={{ textDecoration: 'none' }}>
                  <Card 
                    sx={{ 
                      width: '100%', 
                      paddingTop: '60%',
                      position: 'relative', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between', 
                      cursor: 'pointer', 
                      backgroundColor: '#FFFFFF', 
                      borderRadius: '20px',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <CardContent sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                      <Typography variant="h6" sx={{ color: '#7A4BFF', fontWeight: 600 }}>{task.title}</Typography>
                      <Typography variant="body2" sx={{ color: '#7A7A7A' }}>Priority: {task.priority}</Typography>                       
                      <Typography variant="body2" sx={{ color: '#7A7A7A' }}>
                        Due Date: {task.dueDate ? moment(task.dueDate).format('MMM D, YYYY') : 'No due date'}
                      </Typography> 
                      <Typography variant="body2" sx={{ mt: 1, color: '#7A4BFF' }}>
                        {calculateDaysLeft(task.dueDate)}
                      </Typography>
                      <Typography variant="body2">Progress: {task.progress}%</Typography>
                      <LinearProgress variant="determinate" value={task.progress} sx={{ mt: 1, backgroundColor: '#ECECEC' }} />
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))
            }
          </Grid>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <img src="/images/dashboard.png" alt="No tasks" style={{ width: '500px', marginBottom: '20px' }} />
            <Typography variant="h5" sx={{ color: '#7A4BFF' }}>No Tasks Available</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
