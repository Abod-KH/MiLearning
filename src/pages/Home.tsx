import React from 'react';
import { Box } from '@chakra-ui/react';
import { VideoFeed } from '../components/VideoFeed';

export const Home: React.FC = () => {
  return (
    <Box 
      height="100%"
      width="100%" 
      bg="black" 
      overflow="hidden"
      position="relative"
    >
      <VideoFeed />
    </Box>
  );
}; 