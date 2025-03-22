export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  category: string;
  thumbnailUrl?: string;
  duration?: number;
  likes?: number;
  views?: number;
  user?: {
    id: string;
    username: string;
    avatar: string;
  };
  createdAt?: string;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  videosWatched: number;
  badges: Badge[];
  savedVideos: string[]; // Array of video IDs
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
}

export interface VideoProgress {
  lastPosition: number;
  timestamp: string;
  completed: boolean;
} 