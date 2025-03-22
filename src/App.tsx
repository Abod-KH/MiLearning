import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VideoProvider } from './context/VideoContext';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import { SavedVideos } from './pages/SavedVideos';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <VideoProvider>
        <Router>
          <Box position="relative" height="100vh" overflow="hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/saved" element={<SavedVideos />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Navbar />
          </Box>
        </Router>
      </VideoProvider>
    </ChakraProvider>
  );
}

export default App;
