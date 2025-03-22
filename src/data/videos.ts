import { Video, User, Badge } from '../types';

export const videos: Video[] = [
  {
    id: "1",
    title: "Sunset Beach Waves",
    description: "Relaxing waves at sunset 🌊",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    user: {
      id: "1",
      username: "oceanvibes",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    likes: 15000,
    views: 50000,
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Mountain Adventure",
    description: "Epic mountain biking trail 🚵‍♂️",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    user: {
      id: "2",
      username: "adventureseeker",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    likes: 23000,
    views: 80000,
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "City Lights",
    description: "Night drive through the city 🌃",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    user: {
      id: "3",
      username: "urbanexplorer",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    likes: 34000,
    views: 120000,
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Forest Walk",
    description: "Peaceful walk in the forest 🌲",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    user: {
      id: "4",
      username: "naturelover",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    likes: 18000,
    views: 60000,
    createdAt: new Date().toISOString()
  },
  {
    id: "5",
    title: "Sintel Adventure",
    description: "Epic fantasy adventure ⚔️",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    user: {
      id: "5",
      username: "fantasyfan",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    likes: 45000,
    views: 150000,
    createdAt: new Date().toISOString()
  },
  {
    id: "6",
    title: "Subaru Outback",
    description: "Adventure in motion 🚗",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    user: {
      id: "6",
      username: "carfanatic",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    likes: 28000,
    views: 95000,
    createdAt: new Date().toISOString()
  },
  {
    id: "7",
    title: "Underwater World",
    description: "Exploring ocean depths 🌊",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    user: {
      id: "7",
      username: "oceanexplorer",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    likes: 32000,
    views: 110000,
    createdAt: new Date().toISOString()
  },
  {
    id: "8",
    title: "What Car?",
    description: "Luxury car showcase 🚘",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    user: {
      id: "8",
      username: "carlover",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    likes: 29000,
    views: 98000,
    createdAt: new Date().toISOString()
  },
  {
    id: "9",
    title: "Volcanic Peaks",
    description: "Stunning mountain views 🗻",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
    user: {
      id: "9",
      username: "mountaineer",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    likes: 38000,
    views: 125000,
    createdAt: new Date().toISOString()
  },
  {
    id: "10",
    title: "Tech Review",
    description: "Latest gadget review 📱",
    videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    user: {
      id: "10",
      username: "techreview",
      avatar: "https://i.pravatar.cc/150?img=10"
    },
    likes: 42000,
    views: 140000,
    createdAt: new Date().toISOString()
  }
];

export const mockUser: User = {
  id: "1",
  name: "John Doe",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  videosWatched: 25,
  badges: [
    {
      id: "1",
      name: "Early Learner",
      description: "Watched 10 videos",
      iconUrl: "https://picsum.photos/50"
    },
    {
      id: "2",
      name: "Knowledge Seeker",
      description: "Completed 5 different categories",
      iconUrl: "https://picsum.photos/50"
    }
  ],
  savedVideos: ["1", "3"]
};

export const categories = [
  "Leadership",
  "Productivity",
  "Marketing",
  "Technology",
  "Personal Development",
  "Business"
]; 