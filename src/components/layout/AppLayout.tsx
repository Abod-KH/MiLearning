import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useColorMode } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { colorMode } = useColorMode();
  
  // Don't show navbar on auth page
  const showNavbar = isAuthenticated && location.pathname !== '/auth';
  
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      height="100vh" 
      width="100%" 
      position="relative"
      bg={colorMode === 'dark' ? 'black' : 'gray.50'}
      color={colorMode === 'dark' ? 'darkText.200' : 'gray.800'}
    >
      {/* Main content area with scroll */}
      <Box 
        flex="1" 
        overflowY="auto" 
        overflowX="hidden"
        pb={showNavbar ? "60px" : "0"} // Space for the navbar if shown
        bg={colorMode === 'dark' ? 'black' : 'gray.50'}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: colorMode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '2px',
          },
        }}
      >
        <Outlet />
      </Box>
      
      {/* Fixed navbar at the bottom if authenticated */}
      {showNavbar && <Navbar />}
    </Box>
  );
};

export default AppLayout; 