import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box, Spinner, Center, Text, useColorMode } from '@chakra-ui/react';
import { useAuth } from './context/AuthContext';

// Import pages
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import { SavedVideos } from './pages/SavedVideos';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';

// Import layout
import AppLayout from './components/layout/AppLayout';
import { Navbar } from './components/layout/Navbar';

// ProtectedRoute component to guard routes that require authentication
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { colorMode } = useColorMode();

  if (isLoading) {
    return (
      <Center h="100vh" bg={colorMode === 'dark' ? 'black' : 'white'}>
        <Box textAlign="center">
          <Spinner size="xl" color="brand.500" mb={4} />
          <Text color={colorMode === 'dark' ? 'white' : 'gray.800'}>Loading...</Text>
        </Box>
      </Center>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

// Auth route - redirect to home if already authenticated
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { colorMode } = useColorMode();

  if (isLoading) {
    return (
      <Center h="100vh" bg={colorMode === 'dark' ? 'black' : 'white'}>
        <Box textAlign="center">
          <Spinner size="xl" color="brand.500" mb={4} />
          <Text color={colorMode === 'dark' ? 'white' : 'gray.800'}>Loading...</Text>
        </Box>
      </Center>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// Basic layout with navbar regardless of auth state (for debugging)
const SimpleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Box 
      height="100vh" 
      display="flex" 
      flexDirection="column" 
      bg={colorMode === 'dark' ? 'black' : 'white'}
      color={colorMode === 'dark' ? 'white' : 'gray.800'}
      position="relative"
      overflow="hidden"
    >
      {/* Main content area */}
      <Box 
        flex="1" 
        overflowY="auto" 
        overflowX="hidden"
        pb="60px" // Space for the navbar
        bg={colorMode === 'dark' ? 'black' : 'white'}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: colorMode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colorMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '2px',
          },
        }}
      >
        {children}
      </Box>
      
      {/* Fixed navbar */}
      <Navbar />
    </Box>
  );
};

// Main App component
function App() {
  return (
    <Routes>
      {/* Auth route */}
      <Route 
        path="/auth" 
        element={
          <AuthRoute>
            <Auth />
          </AuthRoute>
        } 
      />
      
      {/* Direct home route without auth check (for debugging) */}
      <Route path="/" element={
        <SimpleLayout>
          <Home />
        </SimpleLayout>
      } />
      
      {/* Protected routes with AppLayout */}
      <Route element={<AppLayout />}>
        <Route 
          path="/search" 
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/saved" 
          element={
            <ProtectedRoute>
              <SavedVideos />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Catch all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
