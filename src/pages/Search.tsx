import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, Container, SimpleGrid, Input, InputGroup, InputLeftElement, Text, Center, IconButton, Flex, Badge, HStack, Select, useColorMode } from '@chakra-ui/react';
import { FaSearch, FaExpand, FaFilter, FaTimes } from 'react-icons/fa';
import { VideoCard } from '../components/video/VideoCard';
import { useVideo } from '../context/VideoContext';
import { CategoryFilter } from '../components/common/CategoryFilter';

export const Search: React.FC = () => {
  const { videos, searchQuery, setSearchQuery, selectedCategory, filteredVideos } = useVideo();
  const [userInteracted, setUserInteracted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sortOption, setSortOption] = useState<string>("recent");
  const { colorMode } = useColorMode();

  // Sort videos based on selected option
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    switch (sortOption) {
      case "popular":
        return (b.likes || 0) - (a.likes || 0);
      case "views":
        return (b.views || 0) - (a.views || 0);
      case "recent":
      default:
        // Since createdAt is a string in ISO format, we can compare directly
        return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime();
    }
  });

  const toggleFullscreen = (index: number) => {
    const targetElement = videoRefs.current[index];
    if (!targetElement) return;
    
    try {
      if (!isFullscreen) {
        if (targetElement.requestFullscreen) {
          targetElement.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Box 
      minHeight="calc(100vh - 60px)" 
      bg={colorMode === 'dark' ? 'fbDarkBg.300' : 'white'} 
      pt={4}
      pb="70px"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom="60px"
      overflowY="auto"
    >
      <Container maxW="container.md">
        <VStack spacing={4} align="stretch">
          {/* Enhanced Search Input */}
          <InputGroup size="md">
            <InputLeftElement pointerEvents="none">
              <FaSearch color={colorMode === 'dark' ? 'gray.400' : 'gray.300'} />
            </InputLeftElement>
            <Input
              placeholder="Search videos, creators, or topics"
              value={searchQuery}
              onChange={handleSearchChange}
              borderRadius="full"
              borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.300'}
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'}
              color={colorMode === 'dark' ? 'white' : 'black'}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
              pr={searchQuery ? "3rem" : undefined}
            />
            {searchQuery && (
              <Box position="absolute" right="3" top="50%" transform="translateY(-50%)">
                <IconButton
                  aria-label="Clear search"
                  icon={<FaTimes />}
                  size="sm"
                  variant="ghost"
                  onClick={clearSearch}
                  color={colorMode === 'dark' ? 'white' : undefined}
                />
              </Box>
            )}
          </InputGroup>
          
          {/* Category Filter */}
          <CategoryFilter />
          
          {/* Search Summary and Sort Options */}
          <Flex justify="space-between" align="center" mb={2}>
            <Box>
              {(searchQuery || selectedCategory) && (
                <HStack spacing={2}>
                  {searchQuery && (
                    <Badge colorScheme="blue" borderRadius="full" px={2} py={1} fontSize="sm">
                      Search: {searchQuery}
                    </Badge>
                  )}
                  {selectedCategory && (
                    <Badge colorScheme="green" borderRadius="full" px={2} py={1} fontSize="sm">
                      Category: {selectedCategory}
                    </Badge>
                  )}
                </HStack>
              )}
              <Text fontSize="sm" color={colorMode === 'dark' ? 'white' : 'gray.600'} mt={1}>
                {sortedVideos.length} {sortedVideos.length === 1 ? 'video' : 'videos'} found
              </Text>
            </Box>
            
            {/* Sort Options */}
            <Select 
              size="sm" 
              width="auto" 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              borderRadius="md"
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'}
              color={colorMode === 'dark' ? 'white' : 'black'}
              borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.300'}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="views">Most Viewed</option>
            </Select>
          </Flex>
          
          {sortedVideos.length === 0 ? (
            <Center p={8} bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} borderRadius="md" boxShadow="sm">
              <VStack>
                <Text fontSize="lg" fontWeight="medium" color={colorMode === 'dark' ? 'white' : 'black'}>No videos found</Text>
                <Text color={colorMode === 'dark' ? 'white' : 'gray.600'}>Try adjusting your search or filter criteria</Text>
              </VStack>
            </Center>
          ) : (
            <Box width="100%">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} pb={4}>
                {sortedVideos.map((video, index) => (
                  <Box
                    key={video.id}
                    bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} 
                    borderRadius="md"
                    overflow="hidden"
                    boxShadow="md"
                    position="relative"
                    ref={el => videoRefs.current[index] = el}
                    minHeight="350px"
                  >
                    <VideoCard 
                      video={video}
                      isVisible={true}
                      isFirstVideo={index === 0} 
                      isSearchOrSaved={true}
                      shouldUnmuteOnLoad={userInteracted}
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}; 