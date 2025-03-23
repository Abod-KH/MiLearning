import React, { useState, useRef, useEffect } from 'react';
import { Box, VStack, useBreakpointValue, IconButton, Spinner, Center, Text, useColorMode } from '@chakra-ui/react';
import { VideoCard } from './video/VideoCard';
import { useVideo } from '../context/VideoContext';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { MdOutlineRectangle } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

// Define Timeout type since NodeJS namespace is not available
type TimeoutRef = ReturnType<typeof setTimeout>;

export const VideoFeed: React.FC = () => {
  const { videos } = useVideo();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<TimeoutRef>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(true); // Start with true to attempt unmuting
  const { colorMode } = useColorMode();

  // Initialize feed
  useEffect(() => {
    try {
      setIsLoading(true);
      
      // Wait a bit to make sure everything is loaded
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error initializing video feed:", error);
      setHasError(true);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Responsive width
  const containerWidth = useBreakpointValue({
    base: '100%',    // Mobile
    md: '100%',      // Tablet
    lg: isFullscreen ? '100%' : '40%'  // Desktop
  });

  // Responsive height (full height minus navigation bar)
  const containerHeight = useBreakpointValue({
    base: 'calc(100vh - 55px)',    // Mobile
    md: 'calc(100vh - 55px)',      // Tablet
    lg: 'calc(100vh - 55px)'       // Desktop
  });

  const [containerHeightPx, setContainerHeightPx] = useState(0);
  
  // Calculate container height in pixels
  useEffect(() => {
    const calculateHeight = () => {
      setContainerHeightPx(window.innerHeight - 55);
    };
    
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleVideoChange(currentVideoIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleVideoChange(currentVideoIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex, videos.length]);

  const handleVideoChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < videos.length) {
      setCurrentVideoIndex(newIndex);
      setIsScrolling(true);
      
      // Immediately try to play and unmute the new video
      setTimeout(() => {
        try {
          const videoElements = document.querySelectorAll('video');
          if (videoElements[newIndex]) {
            videoElements[newIndex].play()
              .then(() => {
                videoElements[newIndex].muted = false;
                console.log("Auto-played and unmuted video after navigation");
              })
              .catch(e => console.error("Failed to autoplay video:", e));
          }
        } catch (error) {
          console.error("Error during video change:", error);
        }
      }, 100);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    }
  };

  // Handle scroll
  const handleScroll = (e: React.WheelEvent) => {
    if (videos.length <= 1) return;
    
    if (e.deltaY > 0 && currentVideoIndex < videos.length - 1) {
      // Move to next video with autoplay
      handleVideoChange(currentVideoIndex + 1);
    } else if (e.deltaY < 0 && currentVideoIndex > 0) {
      // Move to previous video with autoplay
      handleVideoChange(currentVideoIndex - 1);
    }
  };

  // Handle touch
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        handleVideoChange(currentVideoIndex + 1);
      } else {
        handleVideoChange(currentVideoIndex - 1);
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    // Function to enable sound on first interaction
    const enableSound = () => {
      try {
        // Find all videos and unmute the current one
        const videos = document.querySelectorAll('video');
        const currentVideo = videos[currentVideoIndex];
        
        if (currentVideo) {
          try {
            // Try to unmute the current video
            currentVideo.muted = false;
            
            // If it's paused, try to play it
            if (currentVideo.paused) {
              currentVideo.play().catch(e => console.error("Cannot play after unmute:", e));
            }
            
            console.log("Unmuted video after user interaction");
            setUserInteracted(true);
          } catch (e) {
            console.error("Failed to unmute video:", e);
          }
        }
      } catch (error) {
        console.error("Error in enableSound:", error);
      }
      
      // Remove the event listeners after first interaction
      document.removeEventListener('click', enableSound);
      document.removeEventListener('touchstart', enableSound);
    };
    
    // Set userInteracted to true immediately to provide better experience
    setUserInteracted(true);
    
    // Add event listeners for user interaction to bypass browser restrictions
    document.addEventListener('click', enableSound);
    document.addEventListener('touchstart', enableSound);
    
    // Clean up
    return () => {
      document.removeEventListener('click', enableSound);
      document.removeEventListener('touchstart', enableSound);
    };
  }, [currentVideoIndex]);

  // Auto-unmute videos on change
  useEffect(() => {
    const unmuteCurrentVideo = () => {
      try {
        const videos = document.querySelectorAll('video');
        const currentVideo = videos[currentVideoIndex];
        
        if (currentVideo) {
          try {
            // Always try to unmute the current video
            setTimeout(() => {
              currentVideo.muted = false;
              console.log("Auto-unmuted video after navigation");
            }, 300);
          } catch (e) {
            console.error("Failed to auto-unmute video:", e);
          }
        }
      } catch (error) {
        console.error("Error in unmuteCurrentVideo:", error);
      }
    };
    
    unmuteCurrentVideo();
  }, [currentVideoIndex]);

  if (isLoading) {
    return (
      <Center 
        height="calc(100vh - 48px)" 
        width="100%" 
        color={colorMode === 'dark' ? 'white' : 'gray.800'}
        bg={colorMode === 'dark' ? '#121212' : 'white'}
        mt="48px"
      >
        <Box textAlign="center">
          <Spinner size="xl" color={colorMode === 'dark' ? 'white' : 'blue.500'} mb={4} />
          <Text>Loading videos...</Text>
        </Box>
      </Center>
    );
  }

  if (hasError) {
    return (
      <Center 
        height="calc(100vh - 48px)" 
        width="100%" 
        color={colorMode === 'dark' ? 'white' : 'gray.800'}
        bg={colorMode === 'dark' ? '#121212' : 'white'}
        mt="48px"
      >
        <Box textAlign="center" p={5}>
          <Text fontSize="xl" mb={4}>Something went wrong</Text>
          <Text>Please refresh the page to try again</Text>
        </Box>
      </Center>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <Center 
        height="calc(100vh - 48px)" 
        width="100%" 
        color={colorMode === 'dark' ? 'white' : 'gray.800'}
        bg={colorMode === 'dark' ? '#121212' : 'white'}
        mt="48px"
      >
        <Box textAlign="center">
          <Text>No videos available</Text>
        </Box>
      </Center>
    );
  }

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg={colorMode === 'dark' ? '#121212' : 'white'}
      position="fixed"
      top="48px"
      left={0}
      right={0}
      bottom="55px"
      zIndex={1000}
      pt={1}
    >
      <Box
        ref={containerRef}
        width={containerWidth}
        height="100%"
        overflow="hidden"
        position="relative"
        onWheel={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        boxShadow="dark-lg"
        bg={colorMode === 'dark' ? '#121212' : 'white'}
        maxWidth="100%"
      >
        {/* Fullscreen toggle */}
        <IconButton
          aria-label="Toggle fullscreen"
          icon={isFullscreen ? <MdOutlineRectangle size={20} /> : <FaExpand size={18} />}
          position="absolute"
          top={4}
          right={4}
          zIndex={20}
          variant="ghost"
          color={colorMode === 'dark' ? 'white' : 'gray.800'}
          onClick={toggleFullscreen}
          display={{ base: 'none', lg: 'flex' }}
        />
        
        {/* Video Feed */}
        <VStack
          spacing={0}
          align="center"
          height="100%"
          transform={`translateY(-${currentVideoIndex * 100}%)`}
          transition={isScrolling ? "transform 0.3s ease-out" : "none"}
        >
          {videos.map((video, index) => (
            <Box
              key={video.id}
              height="100%"
              width="100%"
              flexShrink={0}
            >
              <VideoCard
                video={video}
                isVisible={index === currentVideoIndex}
                isFirstVideo={index === 0}
                isFeedView={true}
                shouldUnmuteOnLoad={userInteracted && index === currentVideoIndex}
              />
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}; 