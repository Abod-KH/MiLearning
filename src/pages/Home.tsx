/**
 * Home Page Component
 * 
 * This is the main page of the MiLearning application, displaying the
 * video feed where users can browse and watch educational content.
 */

import React from 'react';
import { Box, Flex, Text, Image, useColorMode } from '@chakra-ui/react';
import { VideoFeed } from '../components/VideoFeed';

/**
 * Home Component
 * 
 * Renders the main page with the app header and video feed.
 * The page is designed with a clean, light interface to showcase
 * educational content in a distraction-free environment.
 */
export const Home: React.FC = () => {
  // We keep useColorMode for compatibility with the rest of the app
  // but defaults to light mode throughout
  const { colorMode } = useColorMode();
  
  return (
    <Box 
      height="100%"
      width="100%" 
      bg="white" // Always use light background
      overflow="hidden"
      position="relative"
      pt="48px" // Add padding for the header
    >
      {/* Header with Logo */}
      <Flex 
        py={1} 
        px={4} 
        alignItems="center" 
        position="absolute"
        top={0}
        left={0}
        right={0}
        zIndex={1500}
        bg="#E3F2FD" // Light blue background for header
        backdropFilter="blur(10px)"
        boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
      >
        <Image 
          src="/logo1.png" // Updated logo for MiLearning
          alt="MiLearning logo" 
          boxSize="32px" 
          mr={2}
        />
        <Text 
          fontWeight="bold" 
          fontSize="lg"
          color="gray.800" // Dark text for contrast
        >
          MiLearning
        </Text>
      </Flex>
      
      {/* Main content - Video feed */}
      <VideoFeed />
    </Box>
  );
}; 