import React, { useState, useEffect, useRef } from 'react';
import { Box, VStack, Container, Heading, Text, SimpleGrid, Center, IconButton, Flex, useColorMode } from '@chakra-ui/react';
import { FaExpand } from 'react-icons/fa';
import { VideoCard } from '../components/video/VideoCard';
import { useVideo } from '../context/VideoContext';

export const SavedVideos: React.FC = () => {
  const { videos, savedVideos } = useVideo();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { colorMode } = useColorMode();

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
          <Box>
            <Heading size="lg">Saved Videos</Heading>
            <Text color={colorMode === 'dark' ? 'white' : 'gray.600'} mt={2}>
              {savedVideosList.length} videos saved
            </Text>
          </Box>
          
          {savedVideosList.length === 0 ? (
            <Center p={8} bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} borderRadius="md" boxShadow="sm">
              <Text color={colorMode === 'dark' ? 'white' : 'gray.500'}>No saved videos yet</Text>
            </Center>
          ) : (
            <Box width="100%">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} pb={4}>
                {savedVideosList.map((video, index) => (
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