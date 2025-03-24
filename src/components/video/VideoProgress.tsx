import React, { useMemo } from 'react';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { useVideo } from '../../context/VideoContext';

export const VideoProgressBar: React.FC = () => {
  const { videos, filteredVideos, videoProgress } = useVideo();
  const currentPath = window.location.pathname;
  
  // Determine which videos to display progress for
  const displayVideos = useMemo(() => {
    if (currentPath === '/search') {
      return filteredVideos;
    } else if (currentPath === '/saved') {
      return filteredVideos;
    } else {
      return videos;
    }
  }, [videos, filteredVideos, currentPath]);
  
  // Calculate overall progress across all videos
  const overallProgress = useMemo(() => {
    if (!displayVideos.length) return 0;
    
    let watchedCount = 0;
    let totalCount = displayVideos.length;
    
    // Count videos that have been watched (progress > 0)
    displayVideos.forEach(video => {
      if (videoProgress[video.id]?.lastPosition > 0) {
        watchedCount += videoProgress[video.id]?.lastPosition || 0;
      }
    });
    
    // Calculate overall percentage (0-1)
    return watchedCount / totalCount;
  }, [displayVideos, videoProgress]);
  
  const height = useBreakpointValue({ base: '3px', md: '4px' });
  
  if (!displayVideos.length) return null;
  
  return (
    <Box 
      position="fixed"
      top="0"
      left="0"
      right="0"
      height={height}
      bg="gray.600"
      zIndex="9999"
    >
      <Box 
        height="100%" 
        width={`${overallProgress * 100}%`}
        bg="red.400"
        transition="width 0.3s ease-out"
      />
    </Box>
  );
};

export default VideoProgressBar; 