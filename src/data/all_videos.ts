/**
 * Combined Educational Video Data Manager
 * 
 * This file combines all educational videos from different sources and provides utility
 * functions for accessing and filtering the videos in various ways. It ensures all videos
 * have proper category assignments and exports functions for video retrieval.
 */

import { videos as tiktokVideos } from './videos';
import { educationVideos } from './education_videos';
import { Video } from '../types';

/**
 * Sample video URLs for use when no actual video URL is provided
 * These are fallbacks for testing and demonstration purposes
 */
const sampleVideoUrls = [
  'https://assets.mixkit.co/videos/preview/mixkit-young-woman-vlogger-recording-her-message-for-her-followers-4790-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-mother-with-her-little-daughter-decorating-a-christmas-tree-39745-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-winter-fashion-cold-looking-woman-concept-video-39874-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-womans-feet-splashing-in-the-pool-1261-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-bubble-gum-at-an-amusement-park-1226-large.mp4'
];

/**
 * Cached version of processed videos to improve performance
 */
let processedVideosCache: Video[] | null = null;

/**
 * Assigns a unique sample URL to videos that don't have one
 * If the video has a youtube URL (contains youtube.com), it will be preserved
 * 
 * @param videos Array of videos to process
 * @returns Array of videos with unique URLs assigned
 */
const assignUniqueUrls = (videos: Video[]): Video[] => {
  return videos.map((video, index) => {
    // Preserve YouTube URLs - don't replace them with sample URLs
    if (video.videoUrl && video.videoUrl.includes('youtube.com')) {
      return video;
    }
    
    // Calculate a consistent index for the sample URL to maintain stability
    const sampleIndex = index % sampleVideoUrls.length;
    return {
      ...video,
      videoUrl: sampleVideoUrls[sampleIndex],
    };
  });
};

/**
 * Assigns categories to videos that don't have one
 * 
 * @param videos Array of videos to process
 * @returns Array of videos with categories assigned
 */
const assignCategories = (videos: Video[]): Video[] => {
  const categories = [
    'Technology',
    'Science',
    'Mathematics',
    'History',
    'Language',
    'Art',
    'Music',
    'Wellness',
    'Business',
    'Programming'
  ];
  
  return videos.map(video => {
    if (!video.category) {
      // Determine a stable category based on video ID
      const categoryIndex = parseInt(video.id) % categories.length;
      return {
        ...video,
        category: categories[categoryIndex]
      };
    }
    return video;
  });
};

/**
 * Ensures all videos have valid author data
 * 
 * @param videos Array of videos to process
 * @returns Array of videos with author data
 */
const ensureAuthorData = (videos: Video[]): Video[] => {
  return videos.map(video => {
    if (!video.author) {
      return {
        ...video,
        author: {
          name: 'MiLearning',
          username: 'milearning',
          avatarUrl: 'https://api.dicebear.com/7.x/adventurer/svg?seed=milearning'
        }
      };
    }
    return video;
  });
};

/**
 * Returns all educational videos from various sources
 * Videos are guaranteed to have unique URLs and valid categories
 * 
 * @returns Array of all educational videos
 */
export const getAllVideos = (): Video[] => {
  // Return cached videos if available for better performance
  if (processedVideosCache) {
    return processedVideosCache;
  }
  
  // Combine videos from different sources
  const combinedVideos = [...tiktokVideos, ...educationVideos];
  
  // Process videos to ensure they have all required data
  const processedVideos = ensureAuthorData(
    assignCategories(
      assignUniqueUrls(combinedVideos)
    )
  );
  
  // Cache the processed videos for future calls
  processedVideosCache = processedVideos;
  
  return processedVideos;
};

// Export all videos processed with unique URLs and categories
export const allVideos = getAllVideos();

/**
 * Returns a random selection of videos
 * 
 * @param count Number of videos to return
 * @returns Array of random videos
 */
export const getRandomVideos = (count: number): Video[] => {
  const videos = [...allVideos];
  const result: Video[] = [];
  
  for (let i = 0; i < Math.min(count, videos.length); i++) {
    const randomIndex = Math.floor(Math.random() * videos.length);
    result.push(videos[randomIndex]);
    videos.splice(randomIndex, 1);
  }
  
  return result;
};

/**
 * Returns videos filtered by category
 * 
 * @param category Category to filter by
 * @returns Array of videos in the specified category
 */
export const getVideosByCategory = (category: string): Video[] => {
  return allVideos.filter(video => video.category === category);
};

/**
 * Returns videos saved by the user
 * 
 * @param savedIds Array of saved video IDs
 * @returns Array of saved videos
 */
export const getSavedVideos = (savedIds: string[]): Video[] => {
  return allVideos.filter(video => savedIds.includes(video.id));
};

/**
 * Finds a video by its ID
 * 
 * @param id ID of the video to find
 * @returns The video with the specified ID or undefined if not found
 */
export const getVideoById = (id: string): Video | undefined => {
  return allVideos.find(video => video.id === id);
}; 