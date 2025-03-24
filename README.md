# MiLearning - Educational TikTok Clone

MiLearning is a modern web application inspired by TikTok, designed specifically for educational content. The platform offers a vertical-scrolling video feed that allows users to discover and engage with short educational videos across various subjects.

![MiLearning App Screenshot](tiktok_app/public/app-screenshot.png)

## 🌟 Key Features

- **TikTok-style Video Feed**: Vertical scrolling interface for seamless video consumption
- **Video Categories**: Browse videos by educational categories
- **Search Functionality**: Find educational content by keyword or topic
- **User Authentication**: Create accounts, log in, and maintain personalized profiles
- **Video Interactions**: Like, save, and share educational videos
- **User Profiles**: Track liked, saved, and watched videos
- **YouTube Integration**: Seamless playback of YouTube educational content
- **Responsive Design**: Optimized experience across desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Chakra UI
- **State Management**: React Context API
- **Authentication**: Custom authentication system
- **Styling**: CSS-in-JS with Chakra UI

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## 🚀 Installation

Follow these steps to get the application running locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/milearning.git
   cd milearning
   ```

2. **Install dependencies**
   ```bash
   cd tiktok_app
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`

## 🎮 Usage

### Home Feed
- Scroll vertically to navigate between videos
- Like, save, or share videos using the interaction buttons
- Toggle sound with the volume button
- Switch to fullscreen mode with the rectangle icon (desktop only)

### Search
- Navigate to the Search tab
- Enter keywords in the search bar
- Filter videos by category using the category chips
- Sort results by recent, popular, or most viewed

### Authentication
- Create a new account or log in to an existing one
- Edit your profile information in the settings section

### Profile
- View your liked, saved, and watched videos
- Adjust preferences in the settings

## 📁 Project Structure

```
milearning/
├── tiktok_app/                # Main application directory
│   ├── public/                # Static files
│   ├── src/                   # Source code
│   │   ├── components/        # Reusable UI components
│   │   ├── context/           # React Context providers
│   │   ├── data/              # Application data
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Application pages
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Utility functions
│   │   ├── App.tsx            # Main App component
│   │   └── main.tsx           # Application entry point
│   ├── index.html             # HTML template
│   ├── package.json           # Dependencies and scripts
│   └── tsconfig.json          # TypeScript configuration
└── README.md                  # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or feedback, please reach out via GitHub issues or contact:
- [Your Name](https://github.com/yourusername)

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- All educational content providers featured in the app 