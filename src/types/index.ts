/**
 * Type Definitions for MiLearning Application
 * 
 * This file contains TypeScript interfaces that define the data structures
 * used throughout the application.
 */

/**
 * Video Interface
 * 
 * Represents an educational video with all its metadata and associated information.
 * This is the primary content type of the MiLearning platform.
 */
export interface Video {
  id: string;                  // Unique identifier for the video
  title: string;               // Title of the video
  description: string;         // Brief description of the video content
  videoUrl: string;            // URL to the video file
  category: string;            // Educational category the video belongs to
  thumbnailUrl?: string;       // Optional URL to the video thumbnail image
  duration?: number;           // Optional duration of the video in seconds
  likes?: number;              // Optional count of likes the video has received
  views?: number;              // Optional count of views the video has received
  user?: {                     // Optional information about the video uploader/creator
    id: string;                // Uploader's unique identifier
    username: string;          // Uploader's username
    avatar: string;            // URL to the uploader's avatar image
  };
  createdAt?: string;          // Optional timestamp of when the video was created
  author: {                    // Information about the video author
    id: string;                // Author's unique identifier
    username: string;          // Author's username
    name: string;              // Author's display name
    avatar: string;            // URL to the author's avatar image
  };
}

/**
 * User Interface
 * 
 * Represents a user of the MiLearning platform with their profile information
 * and learning-related data.
 */
export interface User {
  id: string;                  // Unique identifier for the user
  name: string;                // User's display name
  avatarUrl: string;           // URL to the user's avatar image
  videosWatched: number;       // Count of videos the user has watched
  badges: Badge[];             // Array of achievement badges earned by the user
  savedVideos: string[];       // Array of video IDs saved by the user for later viewing
}

/**
 * Badge Interface
 * 
 * Represents an achievement badge that users can earn for various
 * accomplishments on the platform.
 */
export interface Badge {
  id: string;                  // Unique identifier for the badge
  name: string;                // Display name of the badge
  description: string;         // Description of how the badge is earned
  iconUrl: string;             // URL to the badge's icon image
}

/**
 * VideoProgress Interface
 * 
 * Tracks a user's progress through a specific video, including
 * position, timestamp, and completion status.
 */
export interface VideoProgress {
  lastPosition: number;        // Last playback position in the video (0-1 range)
  timestamp: string;           // ISO timestamp of when the progress was last updated
  completed: boolean;          // Whether the video has been marked as completed
} 