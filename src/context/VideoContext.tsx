import React, { createContext, useContext, useState, useCallback } from 'react';
import { Video, VideoProgress } from '../types';
import { videos as initialVideos, mockUser } from '../data/videos';

interface VideoContextType {
  videos: Video[];
  currentUser: typeof mockUser;
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
  const [videos] = useState<Video[]>(initialVideos);
  const [currentUser] = useState(mockUser);
  const [videoProgress, setVideoProgress] = useState<Record<string, VideoProgress>>({});
  const [savedVideos, setSavedVideos] = useState<string[]>(mockUser.savedVideos);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
        currentUser,
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
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
}; 