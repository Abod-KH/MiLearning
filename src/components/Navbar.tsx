import React from 'react';
import { Box } from '@chakra-ui/react';

const Navbar: React.FC = () => {
  return (
    <Box 
      className="nav-container"
      position="fixed" 
      bottom="0"
      left="0"
      right="0"
      bg={colorMode === 'dark' ? '#121212' : '#E3F2FD'}
      boxShadow="0 -1px 3px rgba(0,0,0,0.1)"
      zIndex={2000}
      py={1.5}
    >
    </Box>
  );
};

export default Navbar; 