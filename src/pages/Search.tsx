import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, Container, SimpleGrid, Input, InputGroup, InputLeftElement, Text, Center, IconButton, Flex } from '@chakra-ui/react';
import { FaSearch, FaExpand } from 'react-icons/fa';
import { SearchBar } from '../components/common/SearchBar';
import { VideoCard } from '../components/video/VideoCard';
import { useVideo } from '../context/VideoContext';

export const Search: React.FC = () => {
  const { videos } = useVideo();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(
        video => 
          video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (video.user?.username || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchTerm, videos]);

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

  return (
    <Box 
      minHeight="calc(100vh - 60px)" 
      bg="gray.50" 
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
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search videos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderRadius="full"
              borderColor="gray.300"
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
            />
          </InputGroup>
          
          {filteredVideos.length === 0 ? (
            <Center p={8}>
              <Text>No videos found matching your search</Text>
            </Center>
          ) : (
            <Box width="100%">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} pb={4}>
                {filteredVideos.map((video, index) => (
                  <Box
                    key={video.id}
                    bg="white"
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