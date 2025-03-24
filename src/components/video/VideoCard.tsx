import React, { useState, useRef, useEffect } from 'react';
import { Box, Text, IconButton, VStack, Spinner, useBreakpointValue, Center, HStack } from '@chakra-ui/react';
import { FaHeart, FaBookmark, FaShare, FaComment, FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaCompress } from 'react-icons/fa';
import { MdOutlineRectangle } from 'react-icons/md';
// import { Video } from '../../types';
import { useVideo } from '../../context/VideoContext';

// Define local Video interface that matches the data structure
interface VideoAuthor {
  id: string;
  username: string;
  name: string;
  avatar: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: string;
  thumbnailUrl?: string;
  author: VideoAuthor;
  likes?: number;
  views?: number;
  createdAt?: string;
  tags?: string[];
}

export interface VideoCardProps {
  video: Video;
  isFirstVideo?: boolean;
  isVisible?: boolean;
  isSearchOrSaved?: boolean;
  isFeedView?: boolean;
  hasSound?: boolean;
  shouldUnmuteOnLoad?: boolean;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isFirstVideo = false,
  isVisible = false,
  isSearchOrSaved = false,
  isFeedView = false,
  hasSound = true,
  shouldUnmuteOnLoad = false
}) => {
  const { savedVideos, toggleSaveVideo, updateVideoProgress, likedVideos, toggleLikeVideo, isVideoLiked } = useVideo();
  const [likesCount, setLikesCount] = useState(video.likes || 0);
  const isSaved = savedVideos.includes(video.id);
  const isLiked = isVideoLiked(video.id);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(!isFirstVideo);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Detect if we're in the feed or in a list view
  const currentIsFeedView = useBreakpointValue({ 
    base: ["/", "/search", "/saved"].includes(window.location.pathname), 
    md: ["/", "/search", "/saved"].includes(window.location.pathname) 
  });

  // Detect if we're in search or saved pages specifically
  const currentIsSearchOrSaved = window.location.pathname === "/search" || window.location.pathname === "/saved";

  // Responsive values - adjust sizes based on whether we're in feed, search, or saved pages
  const iconSize = useBreakpointValue({ 
    base: currentIsSearchOrSaved ? 14 : 24, 
    md: currentIsSearchOrSaved ? 16 : 28 
  });
  const buttonSpacing = useBreakpointValue({ 
    base: currentIsSearchOrSaved ? 1 : 3, 
    md: currentIsSearchOrSaved ? 2 : 4 
  });
  const infoBoxPadding = useBreakpointValue({ base: 3, md: 4 });
  const rightOffset = useBreakpointValue({ 
    base: currentIsSearchOrSaved ? 1 : 2, 
    md: currentIsSearchOrSaved ? 2 : 4 
  });
  
  // Adjust bottom offset based on view type - this is critical for button visibility
  const bottomOffset = useBreakpointValue({ 
    base: currentIsFeedView ? "100px" : "40px", 
    md: currentIsFeedView ? "120px" : "45px" 
  });

  // Video height based on view mode
  const videoHeight = currentIsFeedView ? "100%" : "350px";
  
  // Control visibility of play/pause button
  const showPlayPauseButton = useBreakpointValue({ 
    base: true, 
    md: true 
  });

  // Check if the video is a YouTube video
  const isYouTubeVideo = video.videoUrl.includes('youtube.com');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // YouTube URL parameters
  const youtubeEmbedUrl = React.useMemo(() => {
    if (!isYouTubeVideo) return '';
    const params = new URLSearchParams({
      autoplay: isVisible && isFirstVideo ? '1' : '0',
      mute: isMuted ? '1' : '0',
      enablejsapi: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      controls: '1'
    });
    return `${video.videoUrl}?${params.toString()}`;
  }, [video.videoUrl, isYouTubeVideo, isVisible, isFirstVideo, isMuted]);

  // Video event listeners
  useEffect(() => {
    if (isYouTubeVideo || !videoRef.current) return;
    
    const videoElement = videoRef.current;

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      
      // Set initial muted state
      videoElement.muted = !(isFirstVideo && shouldUnmuteOnLoad);
      setIsMuted(!(isFirstVideo && shouldUnmuteOnLoad));
      
      // Autoplay logic
      if (isVisible && ((currentIsFeedView && window.location.pathname === "/") || isFirstVideo)) {
        videoElement.play()
          .then(() => {
            setIsPlaying(true);
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
            videoElement.muted = true;
            setIsMuted(true);
            videoElement.play()
              .then(() => setIsPlaying(true))
              .catch((err) => console.error("Failed even with mute:", err));
          });
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      videoElement.pause();
    };
  }, [isVisible, currentIsFeedView, isFirstVideo, shouldUnmuteOnLoad, isYouTubeVideo]);

  // Volume change listener
  useEffect(() => {
    if (isYouTubeVideo || !videoRef.current) return;
    
    const videoElement = videoRef.current;

    const handleMuteChange = () => {
      setIsMuted(videoElement.muted);
    };

    videoElement.addEventListener('volumechange', handleMuteChange);

    return () => {
      videoElement.removeEventListener('volumechange', handleMuteChange);
    };
  }, [isVisible, isMuted, isYouTubeVideo]);

  // Toggle mute function
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  // Handle like button click
  const handleLike = () => {
    toggleLikeVideo(video.id);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Format number for display (e.g., 1K, 1M)
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

  // Handle video click
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => {
            console.error("Error playing video:", error);
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

  // Update playback when visibility changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isVisible) {
      if (currentIsSearchOrSaved && !isFirstVideo) {
        videoElement.pause();
        setIsPlaying(false);
        return;
      }
      
      if (isFirstVideo || currentIsFeedView) {
        videoElement.play()
          .then(() => {
            setIsPlaying(true);
            if (isFirstVideo && shouldUnmuteOnLoad) {
              videoElement.muted = false;
              setIsMuted(false);
            }
          })
          .catch(error => {
            console.error("Error auto-playing video:", error);
            videoElement.muted = true;
            setIsMuted(true);
            videoElement.play()
              .then(() => setIsPlaying(true))
              .catch(err => console.error("Failed even with mute:", err));
          });
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  }, [isVisible, isFirstVideo, currentIsSearchOrSaved, currentIsFeedView, shouldUnmuteOnLoad]);

  // Track progress for non-YouTube videos
  useEffect(() => {
    if (isYouTubeVideo || !videoRef.current) return;
    
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (!videoElement || videoElement.duration === 0) return;
      
      const currentProgress = videoElement.currentTime / videoElement.duration;
      setProgress(currentProgress);
      
      if (videoElement.duration > 0) {
        updateVideoProgress(video.id, currentProgress);
      }
    };
    
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [video.id, updateVideoProgress, isYouTubeVideo]);

  // Toggle YouTube playback
  const toggleYoutubePlayback = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isPlaying) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        setIsPlaying(false);
      } else {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        setIsPlaying(true);
      }
    }
  };

  // Lazy load YouTube iframes
  const [shouldLoadYouTube, setShouldLoadYouTube] = useState(isVisible);
  
  useEffect(() => {
    if (isYouTubeVideo && isVisible && !shouldLoadYouTube) {
      setShouldLoadYouTube(true);
    }
  }, [isVisible, isYouTubeVideo, shouldLoadYouTube]);

  // Share video function
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href
      }).catch(err => console.error('Error sharing:', err));
    } else {
      // Fallback for browsers that don't support navigator.share
      alert(`Share this video: ${video.title}\n${window.location.href}`);
    }
  };

  // Toggle fullscreen function
  const toggleFullscreen = () => {
    const videoContainer = document.getElementById(`video-container-${video.id}`);
    
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
      document.exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch(err => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
    }
  };

  return (
    <Box
      id={`video-container-${video.id}`}
      position="relative"
      width="100%"
      height={videoHeight}
      bg="black"
      overflow="hidden"
      borderRadius={!currentIsFeedView ? "md" : "none"}
      boxShadow={!currentIsFeedView ? "md" : "none"}
    >
      {/* First Video Indicator */}
      {!currentIsFeedView && isFirstVideo && (
        <Box
          position="absolute"
          top={2}
          left={2}
          bg="transparent"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          px={2}
          py={1}
          borderRadius="md"
          zIndex={4}
          opacity={0.9}
          border="1px solid"
          borderColor="blue.500"
        >
          Now Playing
        </Box>
      )}
      
      {/* Loading Spinner */}
      {isLoading && !isYouTubeVideo && (
        <Center position="absolute" top="0" left="0" right="0" bottom="0" zIndex="1">
          <Spinner size="xl" color="white" />
        </Center>
      )}

      {/* Error Message */}
      {hasError && !isYouTubeVideo && (
        <Center position="absolute" top="0" left="0" right="0" bottom="0" bg="blackAlpha.700" zIndex="1">
          <Text color="white">Video could not be loaded</Text>
        </Center>
      )}

      {/* Render YouTube iframe or regular video element */}
      {isYouTubeVideo ? (
        shouldLoadYouTube ? (
          <iframe
            ref={iframeRef}
            width="100%"
            height="100%"
            src={youtubeEmbedUrl}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        ) : (
          <Center position="absolute" top="0" left="0" right="0" bottom="0" zIndex="1" bg="black">
            <Spinner size="xl" color="white" />
          </Center>
        )
      ) : (
        <video
          ref={videoRef}
          src={video.videoUrl}
          controls={false}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          style={{
            objectFit: 'cover', 
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
          onClick={handleVideoClick}
        />
      )}

      {/* Play/Pause overlay button */}
      {showPlayPauseButton && !isYouTubeVideo && (
        <IconButton
          aria-label={isPlaying ? "Pause" : "Play"}
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          size="lg"
          variant="ghost"
          colorScheme="whiteAlpha"
          opacity={0.7}
          _hover={{ opacity: 1 }}
          onClick={handleVideoClick}
          zIndex={2}
        />
      )}

      {/* Video controls */}
      {!isYouTubeVideo && (
        <HStack 
          position="absolute" 
          bottom={4} 
          left={4} 
          spacing={2} 
          zIndex={2}
          opacity={0.8}
          _hover={{ opacity: 1 }}
        >
          {hasSound && (
            <IconButton
              aria-label={isMuted ? "Unmute" : "Mute"}
              icon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              size="sm"
              variant="ghost"
              colorScheme="whiteAlpha"
              onClick={toggleMute}
            />
          )}
        </HStack>
      )}

      {/* Video info section */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg="blackAlpha.700"
        color="white"
        p={infoBoxPadding}
        zIndex={1}
      >
        <Text fontWeight="bold" fontSize={currentIsSearchOrSaved ? "md" : "lg"} noOfLines={1}>
          {video.title}
        </Text>
        <Text fontSize={currentIsSearchOrSaved ? "sm" : "md"} noOfLines={currentIsSearchOrSaved ? 1 : 2} opacity={0.9}>
          {video.description}
        </Text>
        <HStack mt={1} spacing={1}>
          <Text fontSize="xs">@{video.author.username}</Text>
          <Text fontSize="xs" opacity={0.7}>•</Text>
          <Text fontSize="xs" opacity={0.7}>
            {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : "Recent"}
          </Text>
        </HStack>
      </Box>

      {/* Video interaction buttons */}
      <VStack
        position="absolute"
        right={rightOffset}
        bottom={bottomOffset}
        spacing={buttonSpacing}
        zIndex={3}
        align="center"
        bg="transparent"
      >
        <Box
          bg="transparent"
          borderRadius="full"
          p={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            aria-label="Like"
            icon={<FaHeart color={isLiked ? "#ff2d55" : "white"} size={22} />}
            onClick={handleLike}
            size="sm"
            variant="unstyled"
            minW="0"
            h="auto"
          />
        </Box>
        <Text fontSize="xs" color="white" fontWeight="bold">{formatNumber(likesCount)}</Text>
        
        <Box
          bg="transparent"
          borderRadius="full"
          p={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            aria-label={isSaved ? "Unsave" : "Save"}
            icon={<FaBookmark color={isSaved ? "#2d88ff" : "white"} size={22} />}
            onClick={() => toggleSaveVideo(video.id)}
            size="sm"
            variant="unstyled"
            minW="0"
            h="auto"
          />
        </Box>
        <Text fontSize="xs" color="white" fontWeight="bold">Save</Text>
        
        <Box
          bg="transparent"
          borderRadius="full"
          p={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            aria-label="Share"
            icon={<FaShare color="white" size={22} />}
            onClick={handleShare}
            size="sm"
            variant="unstyled"
            minW="0"
            h="auto"
          />
        </Box>
        <Text fontSize="xs" color="white" fontWeight="bold">Share</Text>
        
        <Box
          bg="transparent"
          borderRadius="full"
          p={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <IconButton
            aria-label="Toggle Fullscreen"
            icon={isFullscreen ? <FaCompress color="white" size={22} /> : <FaExpand color="white" size={22} />}
            onClick={toggleFullscreen}
            size="sm"
            variant="unstyled"
            minW="0"
            h="auto"
          />
        </Box>
        <Text fontSize="xs" color="white" fontWeight="bold">Fullscreen</Text>
      </VStack>
    </Box>
  );
}; 