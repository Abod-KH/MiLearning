# MiLearning - Educational TikTok Clone

![MiLearning Logo](tiktok_app/public/logo192.png)

## 📚 Project Overview

MiLearning is an educational video platform inspired by TikTok's engaging UI/UX. It provides a seamless browsing experience for educational content with short, focused videos across multiple subjects. The application allows users to explore educational videos in a familiar, swipeable interface while offering features like saving, liking, and searching for content.

## 🌟 Key Features

- **TikTok-style Video Feed**: Scroll through educational videos with smooth transitions
- **Video Categories**: Filter videos by educational categories including Science, Technology, Mathematics, History, and more
- **Search Functionality**: Find specific videos or topics quickly with robust search capabilities
- **User Authentication**: Create accounts, log in, and maintain your personal profile
- **Video Interactions**: Like, save, and share educational content
- **User Profiles**: Track watched videos, liked content, and saved videos
- **YouTube Integration**: Seamless playback of YouTube educational content
- **Responsive Design**: Works on all device sizes, from mobile to desktop
- **Dark Mode Support**: Choose between light and dark interface themes

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Chakra UI for responsive, accessible components
- **State Management**: React Context API for global state
- **Video Playback**: Custom video players with YouTube integration
- **Routing**: React Router for navigation
- **Authentication**: Custom authentication system (with mock backend)

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/milearning.git
   cd milearning
   ```

2. Install dependencies:
   ```bash
   cd tiktok_app
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 📱 Usage Guide

### Home Feed
- Swipe up/down to navigate between videos
- Tap on video to play/pause
- Use the right sidebar for interactions (like, save, share, fullscreen)

### Search
- Click on the search icon in the navigation bar
- Enter keywords to find videos
- Filter results by category using the category tabs

### User Authentication
- Create a new account with email, username, and password
- Log in with existing credentials
- Edit your profile by visiting the profile page

### Profile Management
- View your watched, liked, and saved videos
- Check your learning progress and achievements
- Edit your profile information and avatar

## 📁 Project Structure

```
tiktok_app/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── auth/        # Authentication related components
│   │   ├── layout/      # Layout components
│   │   ├── profile/     # User profile components
│   │   └── video/       # Video player components
│   ├── context/         # React Context providers
│   ├── data/            # Mock data for videos and users
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Main application pages
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
└── package.json         # Dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

If you have any questions or feedback, please reach out to:
- [your.email@example.com](mailto:your.email@example.com)
- [Your GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- Educational content providers 