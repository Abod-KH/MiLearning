import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Video, VideoProgress } from '../types';
import { videos as initialVideos, mockUser } from '../data/videos';
import { businessVideos, businessUsers, businessCategories } from '../data/business_videos';
import { useAuth } from './AuthContext';

interface VideoContextType {
  videos: Video[];
  currentUser: any;
  videoProgress: Record<string, VideoProgress>;
  savedVideos: string[];
  searchQuery: string;
  selectedCategory: string | null;
  filteredVideos: Video[];
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  toggleSaveVideo: (videoId: string) => void;
  updateVideoProgress: (videoId: string, progress: number) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser: authUser, isAuthenticated } = useAuth();
  
  // Default state values
  const [videos] = useState<Video[]>(businessVideos);
  const [videoProgress, setVideoProgress] = useState<Record<string, VideoProgress>>({});
  const [savedVideos, setSavedVideos] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Update saved videos whenever the authenticated user changes
  useEffect(() => {
    if (authUser && authUser.savedVideos) {
      setSavedVideos(authUser.savedVideos);
    } else {
      setSavedVideos([]);
    }
  }, [authUser]);

  const toggleSaveVideo = useCallback((videoId: string) => {
    setSavedVideos(currentSaved => {
      if (currentSaved.includes(videoId)) {
        return currentSaved.filter(id => id !== videoId);
      } else {
        return [...currentSaved, videoId];
      }
    });
  }, []);

  const updateVideoProgress = useCallback((videoId: string, progress: number) => {
    setVideoProgress(prev => {
      const newProgress: Record<string, VideoProgress> = { ...prev };
      
      newProgress[videoId] = {
        lastPosition: progress,
        timestamp: new Date().toISOString(),
        completed: progress >= 0.95
      };
      
      return newProgress;
    });
  }, []);

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        video.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <VideoContext.Provider
      value={{
        videos,
        currentUser: authUser || businessUsers[0], // Use auth user or fallback
        videoProgress,
        savedVideos,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        toggleSaveVideo,
        updateVideoProgress,
        filteredVideos
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}; 