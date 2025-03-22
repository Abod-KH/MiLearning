# Microlearning Platform

A TikTok-style microlearning platform built with React, featuring short, interactive learning videos with a modern and engaging user interface.

## Features

- TikTok-style vertical video feed
- Video playback with play/pause functionality
- Progress tracking for watched videos
- Search and filter functionality
- Save videos for later
- User profile with learning statistics and badges
- Responsive design for mobile and desktop
- Modern UI with Chakra UI components

## Tech Stack

- React 18
- TypeScript
- Vite
- Chakra UI
- React Router
- React Player
- Framer Motion

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd microlearning-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.tsx
│   ├── video/
│   │   ├── VideoCard.tsx
│   │   └── VideoPlayer.tsx
│   └── common/
│       ├── SearchBar.tsx
│       └── FilterBar.tsx
├── pages/
│   ├── Home.tsx
│   ├── Search.tsx
│   ├── Profile.tsx
│   └── SavedVideos.tsx
├── context/
│   └── VideoContext.tsx
├── types/
│   └── index.ts
└── data/
    └── videos.ts
```

## Features Implemented

1. **Home Feed**
   - Vertically scrollable video feed
   - Video playback with controls
   - Progress tracking
   - Like, save, and share functionality

2. **Search and Filter**
   - Search by title and description
   - Filter by categories
   - Real-time filtering

3. **User Profile**
   - User information display
   - Learning statistics
   - Badges earned
   - Saved videos list

4. **Navigation**
   - Bottom navigation bar
   - Route-based navigation
   - Active state indicators

## Additional Features

- Lazy loading for video content
- Progress persistence
- Responsive design
- Accessibility compliance
- Modern UI components

## Development

The project uses Vite for fast development and building. Key commands:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
