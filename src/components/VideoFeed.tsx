import React, { useState, useRef, useEffect } from 'react';
import { Box, VStack, useBreakpointValue, IconButton } from '@chakra-ui/react';
import { VideoCard } from './video/VideoCard';
import { useVideo } from '../context/VideoContext';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { MdOutlineRectangle } from 'react-icons/md';

export const VideoFeed: React.FC = () => {
  const { videos } = useVideo();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(true); // Start with true to attempt unmuting

  // Responsive width
  const containerWidth = useBreakpointValue({
    base: '100%',    // Mobile
    md: '100%',      // Tablet
    lg: isFullscreen ? '100%' : '40%'  // Desktop
  });

  // Responsive height (full height minus navigation bar)
  const containerHeight = useBreakpointValue({
    base: 'calc(100vh - 60px)',    // Mobile
    md: 'calc(100vh - 60px)',      // Tablet
    lg: 'calc(100vh - 60px)'       // Desktop
  });

  const [containerHeightPx, setContainerHeightPx] = useState(0);
  
  // Calculate container height in pixels
  useEffect(() => {
    const calculateHeight = () => {
      setContainerHeightPx(window.innerHeight - 60);
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
        const videoElements = document.querySelectorAll('video');
        if (videoElements[newIndex]) {
          videoElements[newIndex].play()
            .then(() => {
              videoElements[newIndex].muted = false;
              console.log("Auto-played and unmuted video after navigation");
            })
            .catch(e => console.error("Failed to autoplay video:", e));
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
    };
    
    unmuteCurrentVideo();
  }, [currentVideoIndex]);

  if (!videos.length) {
    return (
      <Box 
        height="100vh" 
        width="100%" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        color="white"
        bg="black"
      >
        Loading videos...
      </Box>
    );
  }

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="black"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom="60px"
      zIndex={1000}
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
        bg="black"
        maxWidth="100%"
        maxHeight="100%"
        transition="width 0.3s ease-in-out"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack
          spacing={0}
          position="absolute"
          top={0}
          left={0}
          right={0}
          height="100%"
          transform={`translateY(-${currentVideoIndex * 100}vh)`}
          transition="transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          {videos.map((video, index) => (
            <Box
              key={video.id}
              height="100vh"
              width="100%"
              position="relative"
              bg="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              flexShrink={0}
              pb="60px"
            >
              <VideoCard 
                video={video} 
                isVisible={index === currentVideoIndex}
                isFirstVideo={index === 0} 
              />
            </Box>
          ))}
        </VStack>

        {/* Fullscreen Toggle Button - Only visible on desktop */}
        <IconButton
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          icon={<MdOutlineRectangle />}
          position="absolute"
          top={4}
          right={4}
          zIndex={10}
          colorScheme="whiteAlpha"
          variant="ghost"
          onClick={toggleFullscreen}
          display={{ base: 'none', lg: 'flex' }}
          _hover={{ transform: 'scale(1.1)' }}
          transition="transform 0.2s"
        />
      </Box>
    </Box>
  );
}; 