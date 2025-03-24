import React from 'react';
import { Box, Heading, Text, Tag, TagLabel, HStack } from '@chakra-ui/react';

const VideoCard = ({ title, description, duration, category, difficulty, difficultyColor }) => {
  const colorMode = 'dark'; // Assuming colorMode is available in the component

  return (
    <Box p={4}>
      <Heading size="md" mb={2} noOfLines={2}>
        {title}
      </Heading>
      <Text color={colorMode === 'dark' ? 'white' : 'gray.600'} mb={3} noOfLines={3}>
        {description}
      </Text>
      <Text fontSize="sm" color={colorMode === 'dark' ? 'white' : 'gray.500'} mb={2}>
        {formatDuration(duration)}
      </Text>
      <HStack spacing={4} mb={3}>
        <Tag size="sm" colorScheme="blue" borderRadius="full">
          <TagLabel color={colorMode === 'dark' ? 'white' : undefined}>{category}</TagLabel>
        </Tag>
        {difficulty && (
          <Tag size="sm" colorScheme={difficultyColor} borderRadius="full">
            <TagLabel color={colorMode === 'dark' ? 'white' : undefined}>{difficulty}</TagLabel>
          </Tag>
        )}
      </HStack>
    </Box>
  );
};

export default VideoCard; 