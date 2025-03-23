import React from 'react';
import { HStack, Tag, TagLabel, TagCloseButton, Box, Text, ScrollMenu, useColorMode } from '@chakra-ui/react';
import { useVideo } from '../../context/VideoContext';
import { businessCategories } from '../../data/business_videos';

export const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useVideo();
  const { colorMode } = useColorMode();

  const handleSelectCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null); // Toggle off if already selected
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <Box mb={3}>
      <Text fontSize="sm" fontWeight="medium" mb={2} color={colorMode === 'dark' ? 'white' : 'gray.600'}>
        Filter by category:
      </Text>
      <Box overflowX="auto" pb={2}>
        <HStack spacing={2}>
          {businessCategories.map((category) => (
            <Tag
              key={category}
              size="md"
              borderRadius="full"
              variant={selectedCategory === category ? "solid" : "outline"}
              colorScheme={selectedCategory === category ? "blue" : "gray"}
              cursor="pointer"
              onClick={() => handleSelectCategory(category)}
              bg={selectedCategory === category 
                ? undefined 
                : colorMode === 'dark' ? 'fbDarkBg.200' : undefined}
              color={selectedCategory === category 
                ? undefined 
                : colorMode === 'dark' ? 'white' : undefined}
              borderColor={colorMode === 'dark' && selectedCategory !== category ? 'fbDarkBg.50' : undefined}
            >
              <TagLabel>{category}</TagLabel>
              {selectedCategory === category && (
                <TagCloseButton onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategory(null);
                }} />
              )}
            </Tag>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}; 