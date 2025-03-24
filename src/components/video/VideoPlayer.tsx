import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactPlayer from 'react-player';
import { Box, IconButton, Progress, Spinner, Center } from '@chakra-ui/react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Video } from '../../types';
import { useVideo } from '../../context/VideoContext';

interface VideoPlayerProps {
  video: Video;
  onProgress?: (progress: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onProgress }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);
  const { updateVideoProgress } = useVideo();
  const isYouTubeVideo = video.videoUrl.includes('youtube.com');

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state: { played: number }) => {
    const newProgress = state.played;
    setProgress(newProgress);
    if (onProgress) {
      onProgress(newProgress);
    }
    // Throttle the updates to the global state to improve performance
    if (newProgress % 0.05 < 0.01) { // Update roughly every 5% of progress
      updateVideoProgress(video.id, newProgress);
    }
  };

  const handleReady = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      // Save progress when component unmounts
      updateVideoProgress(video.id, progress);
    };
  }, [video.id, progress, updateVideoProgress]);

  const getYouTubeUrl = useMemo(() => {
    // Ensure it's in embed format
    if (!isYouTubeVideo) return video.videoUrl;
    
    if (video.videoUrl.includes('youtube.com/embed')) {
      return video.videoUrl;
    } 
    // Extract video ID if it's a normal youtube URL
    else if (video.videoUrl.includes('youtube.com/watch?v=')) {
      const videoId = new URL(video.videoUrl).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return video.videoUrl;
  }, [video.videoUrl, isYouTubeVideo]);

  // Configure ReactPlayer based on video type
  const playerConfig = useMemo(() => {
    if (isYouTubeVideo) {
      return {
        youtube: {
          playerVars: {
            controls: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3, // Hide annotations
            playsinline: 1
          }
        }
      };
    }
    return {};
  }, [isYouTubeVideo]);

  return (
    <Box position="relative" width="100%" height="100%">
      {isLoading && (
        <Center position="absolute" top="0" left="0" right="0" bottom="0" bg="black" zIndex={1}>
          <Spinner size="xl" color="white" />
        </Center>
      )}
      
      <ReactPlayer
        ref={playerRef}
        url={getYouTubeUrl}
        playing={isPlaying}
        onProgress={handleProgress}
        onReady={handleReady}
        width="100%"
        height="100%"
        style={{ 
          objectFit: 'cover',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease'
        }}
        config={playerConfig}
        playsinline
        pip={false}
        stopOnUnmount={true}
        onBuffer={() => setIsLoading(true)}
        onBufferEnd={() => setIsLoading(false)}
      />
      
      {/* Only show custom controls for non-YouTube videos, since YouTube has its own controls */}
      {!isYouTubeVideo && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={4}
          bg="rgba(0, 0, 0, 0.5)"
          display="flex"
          alignItems="center"
          gap={2}
          zIndex={2}
        >
          <IconButton
            aria-label={isPlaying ? 'Pause' : 'Play'}
            icon={isPlaying ? <FaPause /> : <FaPlay />}
            onClick={handlePlayPause}
            colorScheme="whiteAlpha"
            variant="ghost"
            size="sm"
          />
          <Progress
            value={progress * 100}
            size="sm"
            colorScheme="whiteAlpha"
            flex={1}
            borderRadius="full"
          />
        </Box>
      )}
    </Box>
  );
}; 