import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 200,
        height: '100vh',
        backgroundColor: '#F5F0FF',
        color: '#7A4BFF',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 2,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#7A4BFF' }} /> 
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: '#7A4BFF' }} />
        </ListItem>

        <ListItem button component={Link} to="/add-task">
          <ListItemIcon>
            <AddIcon sx={{ color: '#7A4BFF' }} />
          </ListItemIcon>
          <ListItemText primary="Add Task" sx={{ color: '#7A4BFF' }} />
        </ListItem>

        <ListItem button component={Link} to="/add-category">
          <ListItemIcon>
            <AddIcon sx={{ color: '#7A4BFF' }} />
          </ListItemIcon>
          <ListItemText primary="Add Category" sx={{ color: '#7A4BFF' }} />
        </ListItem>

        <ListItem button component={Link} to="/completed-tasks">
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#7A4BFF' }} />
          </ListItemIcon>
          <ListItemText primary="Completed Tasks" sx={{ color: '#7A4BFF' }} />
        </ListItem>

      </List>
    </Box>
  );
};

export default Sidebar;
