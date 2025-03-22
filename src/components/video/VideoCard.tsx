import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, IconButton, VStack, Spinner, useBreakpointValue, Center, HStack } from '@chakra-ui/react';
import { FaHeart, FaBookmark, FaShare, FaComment, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import { MdOutlineRectangle } from 'react-icons/md';
import { Video } from '../../types';
import { useVideo } from '../../context/VideoContext';

interface VideoCardProps {
  video: Video;
  isVisible?: boolean;
  isFirstVideo?: boolean;
  shouldUnmuteOnLoad?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isVisible = true, isFirstVideo = false, shouldUnmuteOnLoad = true }) => {
  const { toggleSaveVideo, savedVideos } = useVideo();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likes);
  const isSaved = savedVideos.includes(video.id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(!isFirstVideo);

  // Detect if we're in the feed or in a list view
  const isFeedView = useBreakpointValue({ 
    base: ["/", "/search", "/saved"].includes(window.location.pathname), 
    md: ["/", "/search", "/saved"].includes(window.location.pathname) 
  });

  // Detect if we're in search or saved pages specifically
  const isSearchOrSaved = window.location.pathname === "/search" || window.location.pathname === "/saved";

  // Responsive values - adjust sizes based on whether we're in feed, search, or saved pages
  const iconSize = useBreakpointValue({ 
    base: isSearchOrSaved ? 14 : 24, 
    md: isSearchOrSaved ? 16 : 28 
  });
  const buttonSpacing = useBreakpointValue({ 
    base: isSearchOrSaved ? 1 : 3, 
    md: isSearchOrSaved ? 2 : 4 
  });
  const infoBoxPadding = useBreakpointValue({ base: 3, md: 4 });
  const rightOffset = useBreakpointValue({ 
    base: isSearchOrSaved ? 1 : 2, 
    md: isSearchOrSaved ? 2 : 4 
  });
  
  // Adjust bottom offset based on view type - this is critical for button visibility
  const bottomOffset = useBreakpointValue({ 
    base: isFeedView ? "100px" : "40px", 
    md: isFeedView ? "120px" : "45px" 
  });

  // Video height based on view mode
  const videoHeight = isFeedView ? "100%" : "350px";
  
  // Control visibility of play/pause button
  const showPlayPauseButton = useBreakpointValue({ 
    base: true, 
    md: true 
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      
      // Set initial muted state - first video should be unmuted if shouldUnmuteOnLoad is true
      videoElement.muted = !(isFirstVideo && shouldUnmuteOnLoad);
      setIsMuted(!(isFirstVideo && shouldUnmuteOnLoad));
      
      // Only autoplay first video or in feed view when visible
      if (isVisible && ((isFeedView && window.location.pathname === "/") || isFirstVideo)) {
        videoElement.play()
          .then(() => {
            setIsPlaying(true);
            // Try to unmute after a short delay if this is the first video
            if (isFirstVideo && shouldUnmuteOnLoad) {
              setTimeout(() => {
                try {
                  videoElement.muted = false;
                  setIsMuted(false);
                } catch (err) {
                  console.error("Could not unmute first video:", err);
                }
              }, 300);
            }
          })
          .catch((error) => {
            console.error("Error playing video:", error);
            // If autoplay fails, try with mute (browser policy)
            videoElement.muted = true;
            setIsMuted(true);
            videoElement.play()
              .then(() => setIsPlaying(true))
              .catch((err) => console.error("Failed even with mute:", err));
          });
      } else {
        // Ensure non-first videos are paused
        videoElement.pause();
        setIsPlaying(false);
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    // Add event listeners
    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);

    // Clean up
    return () => {
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      videoElement.pause();
    };
  }, [isVisible, isFeedView, isFirstVideo, shouldUnmuteOnLoad]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleMuteChange = () => {
      setIsMuted(videoElement.muted);
    };

    // Add event listener for mute change
    videoElement.addEventListener('volumechange', handleMuteChange);

    // Clean up
    return () => {
      videoElement.removeEventListener('volumechange', handleMuteChange);
    };
  }, [isVisible, isMuted]);

  // Toggle mute function
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => prev !== undefined ? (isLiked ? prev - 1 : prev + 1) : (video.likes || 0));
  };

  const formatNumber = (num: number | undefined): string => {
    if (!num) return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // For video click, automatically unmute when playing
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // When user clicks to play video, always unmute
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error("Error playing video:", error);
            // If play fails, try with mute
            videoRef.current!.muted = true;
            setIsMuted(true);
            videoRef.current!.play()
              .then(() => setIsPlaying(true))
              .catch(err => console.error("Failed even with mute:", err));
          });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Update videoRef when isVisible changes to handle autoplay
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // If the video becomes visible
    if (isVisible) {
      // For search/saved pages, only play first video
      if (isSearchOrSaved && !isFirstVideo) {
        videoElement.pause();
        setIsPlaying(false);
        return;
      }
      
      // Only play if it's the first visible video or in feed view
      if (isFirstVideo || isFeedView) {
        // Try to play the video
        videoElement.play()
          .then(() => {
            setIsPlaying(true);
            // Try to unmute the video (especially if it's first)
            if (isFirstVideo && shouldUnmuteOnLoad) {
              videoElement.muted = false;
              setIsMuted(false);
            }
          })
          .catch(error => {
            console.error("Error auto-playing video:", error);
            // If play fails, try with mute (browser policy)
            videoElement.muted = true;
            setIsMuted(true);
            videoElement.play()
              .then(() => setIsPlaying(true))
              .catch(err => console.error("Failed even with mute:", err));
          });
      } else {
        // Not first video - ensure it's paused
        videoElement.pause();
        setIsPlaying(false);
      }
    } else {
      // Pause the video when not visible
      videoElement.pause();
      setIsPlaying(false);
    }
  }, [isVisible, isFirstVideo, isSearchOrSaved, isFeedView, shouldUnmuteOnLoad]);

  return (
    <Box
      position="relative"
      width="100%"
      height={videoHeight}
      bg="black"
      overflow="hidden"
      borderRadius={!isFeedView ? "md" : "none"}
      boxShadow={!isFeedView ? "md" : "none"}
    >
      {/* First Video Indicator */}
      {!isFeedView && isFirstVideo && (
        <Box
          position="absolute"
          top={2}
          left={2}
          bg="blue.500"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          px={2}
          py={1}
          borderRadius="md"
          zIndex={4}
          opacity={0.9}
        >
          Now Playing
        </Box>
      )}
      
      {/* Loading Spinner */}
      {isLoading && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1}
        >
          <Spinner color="white" size="xl" />
        </Box>
      )}

      {/* Error Message */}
      {hasError && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
          zIndex={1}
        >
          <Text>Failed to load video</Text>
        </Box>
      )}

      {/* Video Player */}
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={handleVideoClick}
        position="relative"
      >
        <video
          ref={videoRef}
          src={video.videoUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            opacity: isLoading || hasError ? 0 : 1,
            transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: 'black'
          }}
          loop
          playsInline
          preload="auto"
          autoPlay={isVisible && (isFeedView || isFirstVideo)}
        />
        
        {/* Play/Pause Button Overlay */}
        {showPlayPauseButton && (
          <Center
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            opacity={isPlaying ? 0 : 0.7}
            _hover={{ opacity: 0.9 }}
            transition="opacity 0.3s"
            bg={isPlaying ? "transparent" : "rgba(0, 0, 0, 0.2)"}
            pointerEvents={isPlaying ? "none" : "auto"}
          >
            <IconButton
              aria-label={isPlaying ? "Pause" : "Play"}
              icon={isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
              variant="unstyled"
              bg="rgba(0, 0, 0, 0.4)"
              color="white"
              borderRadius="full"
              width={isFeedView ? "60px" : "50px"}
              height={isFeedView ? "60px" : "50px"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              _hover={{ transform: 'scale(1.1)', bg: "rgba(0, 0, 0, 0.6)" }}
              _active={{ transform: 'scale(0.9)' }}
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current) {
                  if (videoRef.current.paused) {
                    videoRef.current.play();
                    setIsPlaying(true);
                  } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                  }
                }
              }}
            />
          </Center>
        )}
        
        {/* Volume Control */}
        <Box
          position="absolute"
          left={4}
          bottom={4}
          zIndex={3}
          opacity={0.7}
          _hover={{ opacity: 1 }}
          transition="opacity 0.2s"
        >
          <IconButton
            aria-label={isMuted ? "Unmute" : "Mute"}
            icon={isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
            size="sm"
            variant="solid"
            colorScheme="blackAlpha"
            onClick={toggleMute}
          />
        </Box>
      </Box>

      {/* Action Buttons */}
      {isVisible && (
        <VStack
          position="absolute"
          right={rightOffset}
          bottom={bottomOffset}
          spacing={buttonSpacing}
          align="center"
          zIndex={5}
          bg={!isFeedView && isSearchOrSaved ? "rgba(0,0,0,0.7)" : ((!isFeedView) ? "rgba(0,0,0,0.4)" : "transparent")}
          p={!isFeedView ? (isSearchOrSaved ? 2 : 2) : 0}
          pb={isSearchOrSaved ? 4 : 2}
          borderRadius={!isFeedView ? "md" : "none"}
          maxHeight={isSearchOrSaved ? "180px" : "unset"}
        >
          {/* Like Button */}
          <VStack spacing={isSearchOrSaved ? 0 : 1} align="center">
            <IconButton
              aria-label="Like"
              icon={<FaHeart size={iconSize} />}
              variant="unstyled"
              color={isLiked ? "red.500" : "white"}
              onClick={handleLike}
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.1)' }}
              _active={{ transform: 'scale(0.9)' }}
            />
            <Text color="white" fontSize={isSearchOrSaved ? "2xs" : "xs"} fontWeight="bold">
              {formatNumber(likesCount || 0)}
            </Text>
          </VStack>

          {/* Comment Button */}
          <VStack spacing={isSearchOrSaved ? 0 : 1} align="center">
            <IconButton
              aria-label="Comment"
              icon={<FaComment size={iconSize} />}
              variant="unstyled"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.1)' }}
              _active={{ transform: 'scale(0.9)' }}
            />
            <Text color="white" fontSize={isSearchOrSaved ? "2xs" : "xs"} fontWeight="bold">
              {formatNumber(video.views || 0)}
            </Text>
          </VStack>

          {/* Save Button */}
          <VStack spacing={isSearchOrSaved ? 0 : 1} align="center">
            <IconButton
              aria-label="Save"
              icon={<FaBookmark size={iconSize} />}
              variant="unstyled"
              color={isSaved ? "yellow.400" : "white"}
              onClick={() => toggleSaveVideo(video.id)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.1)' }}
              _active={{ transform: 'scale(0.9)' }}
            />
            <Text color="white" fontSize={isSearchOrSaved ? "2xs" : "xs"} fontWeight="bold">
              Save
            </Text>
          </VStack>

          {/* Share Button */}
          <VStack spacing={isSearchOrSaved ? 0 : 1} align="center">
            <IconButton
              aria-label="Share"
              icon={<FaShare size={iconSize} />}
              variant="unstyled"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.1)' }}
              _active={{ transform: 'scale(0.9)' }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: video.title || 'Check out this video',
                    text: video.description || 'Watch this amazing video',
                    url: window.location.href,
                  })
                  .then(() => console.log('Successfully shared'))
                  .catch((error) => console.log('Error sharing:', error));
                } else {
                  // Fallback for browsers that don't support the Web Share API
                  navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                      console.log("Link copied to clipboard");
                      // You could add a toast notification here
                    })
                    .catch((error) => console.error("Could not copy text: ", error));
                }
              }}
            />
            <Text color="white" fontSize={isSearchOrSaved ? "2xs" : "xs"} fontWeight="bold">
              Share
            </Text>
          </VStack>

          {/* Fullscreen Button */}
          <VStack spacing={isSearchOrSaved ? 0 : 1} align="center">
            <IconButton
              aria-label="Fullscreen"
              icon={<FaExpand size={iconSize} />}
              variant="unstyled"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.1)' }}
              _active={{ transform: 'scale(0.9)' }}
              onClick={() => {
                const videoContainer = videoRef.current?.parentElement;
                if (!videoContainer) return;
                
                if (!document.fullscreenElement) {
                  videoContainer.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                  });
                } else {
                  document.exitFullscreen();
                }
              }}
            />
            <Text color="white" fontSize={isSearchOrSaved ? "2xs" : "xs"} fontWeight="bold">
              Expand
            </Text>
          </VStack>
        </VStack>
      )}

      {/* Video Info */}
      {isVisible && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={infoBoxPadding}
          pb={isFeedView ? "70px" : (isSearchOrSaved ? "200px" : "60px")}
          background={isFeedView 
            ? "linear-gradient(transparent, rgba(0,0,0,0.8))" 
            : "rgba(0,0,0,0.7)"}
          color="white"
        >
          <Text fontWeight="bold" mb={1} fontSize={{ base: 'sm', md: 'md' }}>
            @{video.user?.username || 'user'}
          </Text>
          <Text fontSize={{ base: 'xs', md: 'sm' }} mb={2} noOfLines={isFeedView ? 2 : 1}>
            {video.description}
          </Text>
        </Box>
      )}
    </Box>
  );
}; 