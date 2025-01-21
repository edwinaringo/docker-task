import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar'; 

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      
      <Sidebar />

      
      <Box component="main" sx={{ flexGrow: 1, ml: '200px', p: 2 }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
