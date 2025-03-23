import React from 'react';
import { Box, Flex, Text, Image, useColorMode } from '@chakra-ui/react';
import { VideoFeed } from '../components/VideoFeed';

export const Home: React.FC = () => {
  const { colorMode } = useColorMode();
  
  return (
    <Box 
      height="100%"
      width="100%" 
      bg={colorMode === 'dark' ? '#121212' : 'white'} 
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
        bg={colorMode === 'dark' ? 'rgba(18, 18, 18, 0.95)' : '#E3F2FD'}
        backdropFilter="blur(10px)"
        boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
      >
        <Image 
          src="/logo.png" 
          alt="EdgeLearn" 
          boxSize="32px" 
          mr={2}
        />
        <Text 
          fontWeight="bold" 
          fontSize="lg"
          color={colorMode === 'dark' ? 'white' : 'gray.800'}
        >
          MicroLearning
        </Text>
      </Flex>
      
      <VideoFeed />
    </Box>
  );
}; 