import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, Container, Heading, Text, SimpleGrid, Center, IconButton, Flex } from '@chakra-ui/react';
import { FaExpand } from 'react-icons/fa';
import { VideoCard } from '../components/video/VideoCard';
import { useVideo } from '../context/VideoContext';

export const SavedVideos: React.FC = () => {
  const { videos, savedVideos } = useVideo();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const savedVideosList = videos.filter((video) =>
    savedVideos.includes(video.id)
  );

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
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading size="lg">Saved Videos</Heading>
            <Text color="gray.600" mt={2}>
              {savedVideosList.length} videos saved
            </Text>
          </Box>

          {savedVideosList.length === 0 ? (
            <Center p={8}>
              <Text fontSize="lg" color="gray.500">No saved videos yet</Text>
            </Center>
          ) : (
            <Box width="100%">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} pb={4}>
                {savedVideosList.map((video, index) => (
                  <Box
                    key={video.id}
                    borderRadius="md"
                    overflow="hidden"
                    boxShadow="md"
                    bg="white"
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