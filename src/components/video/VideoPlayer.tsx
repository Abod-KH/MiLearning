import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Box, IconButton, Progress } from '@chakra-ui/react';
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
  const playerRef = useRef<ReactPlayer>(null);
  const { updateVideoProgress } = useVideo();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state: { played: number }) => {
    const newProgress = state.played;
    setProgress(newProgress);
    if (onProgress) {
      onProgress(newProgress);
    }
    updateVideoProgress(video.id, newProgress);
  };

  useEffect(() => {
    return () => {
      // Save progress when component unmounts
      updateVideoProgress(video.id, progress);
    };
  }, [video.id, progress, updateVideoProgress]);

  return (
    <Box position="relative" width="100%" height="100%">
      <ReactPlayer
        ref={playerRef}
        url={video.videoUrl}
        playing={isPlaying}
        onProgress={handleProgress}
        width="100%"
        height="100%"
        style={{ objectFit: 'cover' }}
      />
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
    </Box>
  );
}; 