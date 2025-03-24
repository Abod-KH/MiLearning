/**
 * Video Context Provider
 * 
 * This file implements the React Context API for managing video-related state and functionality
 * throughout the MiLearning application. It centralizes video data access, filtering, and user
 * interactions with videos.
 */

import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { Video, VideoProgress } from '../types';
import { mockUser } from '../data/videos';
import { categories } from '../data/videos';
import { allVideos, getRandomVideos } from '../data/all_videos';
import { useAuth } from './AuthContext';

/**
 * Interface defining the shape of the VideoContext
 * Contains all state variables and functions related to video functionality
 */
interface VideoContextType {
  videos: Video[];                                        // All available videos
  currentUser: any;                                       // Current user data
  videoProgress: Record<string, VideoProgress>;          // Tracks user progress for each video
  savedVideos: string[];                                  // IDs of videos saved by the user
  likedVideos: string[];                                  // IDs of videos liked by the user
  searchQuery: string;                                    // Current search query
  selectedCategory: string | null;                        // Currently selected category filter
  filteredVideos: Video[];                                // Videos filtered by search/category
  watchedVideos: string[];                                // IDs of videos watched by the user
  setSearchQuery: (query: string) => void;                // Updates search query
  setSelectedCategory: (category: string | null) => void; // Updates category filter
  toggleSaveVideo: (videoId: string) => void;             // Toggles saved status for a video
  toggleLikeVideo: (videoId: string) => void;             // Toggles liked status for a video
  updateVideoProgress: (videoId: string, progress: number) => void; // Updates viewing progress
  isCategoryActive: (category: string) => boolean;        // Check if a category is active
  isVideoLiked: (videoId: string) => boolean;             // Check if a video is liked
}

// Create a context with undefined default value
const VideoContext = createContext<VideoContextType | undefined>(undefined);

// Create a throttle function to limit update frequency
function throttle<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Video Provider Component
 * 
 * Manages the state and provides video-related functionality to all child components
 * through React Context API.
 * 
 * @param children - Child components that will have access to the context
 */
export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser: authUser, isAuthenticated } = useAuth();
  
  // Initialize state with educational videos from all_videos.ts
  const [videos] = useState<Video[]>(() => {
    // Sort videos by createdAt date to show newest first
    return [...allVideos].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  });
  
  const [videoProgress, setVideoProgress] = useState<Record<string, VideoProgress>>({});
  const [savedVideos, setSavedVideos] = useState<string[]>([]);
  const [likedVideos, setLikedVideos] = useState<string[]>([]);
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastProgressUpdate, setLastProgressUpdate] = useState<number>(0);

  /**
   * Sync saved videos from authenticated user data when available
   */
  useEffect(() => {
    if (authUser && authUser.savedVideos) {
      setSavedVideos(authUser.savedVideos);
    } else {
      setSavedVideos([]);
    }
    
    // Initialize liked videos (in a real app, this would come from user data)
    if (authUser && authUser.likedVideos) {
      setLikedVideos(authUser.likedVideos);
    } else {
      setLikedVideos([]);
    }
  }, [authUser]);

  /**
   * Toggle saved status for a video
   * If the video is already saved, it will be removed; otherwise, it will be added
   * 
   * @param videoId - ID of the video to toggle
   */
  const toggleSaveVideo = useCallback((videoId: string) => {
    setSavedVideos(currentSaved => {
      if (currentSaved.includes(videoId)) {
        return currentSaved.filter(id => id !== videoId);
      } else {
        return [...currentSaved, videoId];
      }
    });
  }, []);

  /**
   * Toggle liked status for a video
   * If the video is already liked, it will be removed; otherwise, it will be added
   * 
   * @param videoId - ID of the video to toggle
   */
  const toggleLikeVideo = useCallback((videoId: string) => {
    setLikedVideos(currentLiked => {
      if (currentLiked.includes(videoId)) {
        return currentLiked.filter(id => id !== videoId);
      } else {
        return [...currentLiked, videoId];
      }
    });
  }, []);

  /**
   * Check if a video is liked by the user
   * 
   * @param videoId - ID of the video to check
   * @returns boolean indicating if the video is liked
   */
  const isVideoLiked = useCallback((videoId: string) => {
    return likedVideos.includes(videoId);
  }, [likedVideos]);

  /**
   * Check if a category is active
   */
  const isCategoryActive = useCallback((category: string) => {
    return selectedCategory === category;
  }, [selectedCategory]);

  /**
   * Update user's progress for a specific video
   * Records the current position, timestamp, and completion status
   * Uses throttling to reduce state updates
   * 
   * @param videoId - ID of the video being watched
   * @param progress - Current progress value (0-1) representing percentage watched
   */
  const updateVideoProgress = useCallback((videoId: string, progress: number) => {
    const now = Date.now();
    // Throttle updates to once per second
    if (now - lastProgressUpdate < 1000) {
      return;
    }
    
    setLastProgressUpdate(now);
    setVideoProgress(prev => {
      const newProgress: Record<string, VideoProgress> = { ...prev };
      
      newProgress[videoId] = {
        lastPosition: progress,
        timestamp: new Date().toISOString(),
        completed: progress >= 0.95 // Mark as completed if 95% watched
      };
      
      return newProgress;
    });

    // Add to watched videos list if not already there
    setWatchedVideos(current => {
      if (!current.includes(videoId)) {
        return [...current, videoId];
      }
      return current;
    });
  }, [lastProgressUpdate]);

  /**
   * Filter videos based on search query and selected category
   * A video matches if its title or description contains the search query
   * AND it belongs to the selected category (if any)
   * 
   * This is now a memoized value that only recalculates when dependencies change
   */
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      // Search matching (case insensitive)
      const matchesSearch = searchQuery.trim() === '' || 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.author?.name && video.author.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category matching
      const matchesCategory = !selectedCategory || video.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [videos, searchQuery, selectedCategory]);

  // Provide the context value to children
  const contextValue = useMemo(() => ({
    videos,
    currentUser: authUser || mockUser, // Use auth user or fallback to mockUser
    videoProgress,
    savedVideos,
    likedVideos,
    watchedVideos,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    toggleSaveVideo,
    toggleLikeVideo,
    updateVideoProgress,
    filteredVideos,
    isCategoryActive,
    isVideoLiked
  }), [
    videos, 
    authUser, 
    videoProgress, 
    savedVideos, 
    likedVideos,
    watchedVideos,
    searchQuery, 
    selectedCategory, 
    toggleSaveVideo, 
    toggleLikeVideo,
    updateVideoProgress, 
    filteredVideos,
    isCategoryActive,
    isVideoLiked
  ]);

  return (
    <VideoContext.Provider value={contextValue}>
      {children}
    </VideoContext.Provider>
  );
};

/**
 * Custom hook to use the VideoContext
 * Ensures the context is used within a VideoProvider
 * 
 * @returns VideoContext containing video state and functions
 * @throws Error if used outside of a VideoProvider
 */
export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}; 