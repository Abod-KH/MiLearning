import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Switch,
  Button,
  useToast,
  Divider,
  Flex,
  IconButton,
  Text,
  Avatar,
  useColorMode,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Settings: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Clone the user preferences to avoid direct mutation
  const [preferences, setPreferences] = useState({
    darkMode: colorMode === 'dark',
    autoplay: currentUser?.preferences?.autoplay || true,
    notifications: currentUser?.preferences?.notifications || true,
  });
  
  // Sync colorMode with preferences
  useEffect(() => {
    setPreferences(prev => ({
      ...prev,
      darkMode: colorMode === 'dark'
    }));
  }, [colorMode]);
  
  const handleSaveSettings = async () => {
    // Update user preferences in context/localStorage
    const success = await updateProfile({
      preferences: preferences
    });
    
    if (success) {
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated.",
        status: "success",
        duration: 3000,
      });
      
      // Navigate back to profile
      navigate('/profile');
    } else {
      toast({
        title: "Error",
        description: "Failed to save preferences.",
        status: "error",
        duration: 3000,
      });
    }
  };
  
  const handleToggle = (setting: keyof typeof preferences) => {
    if (setting === 'darkMode') {
      toggleColorMode();
    } else {
      setPreferences(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };
  
  if (!currentUser) {
    return <Box p={5}>Loading settings...</Box>;
  }
  
  return (
    <Box height="100vh" display="flex" flexDirection="column">
      {/* Header */}
      <Box 
        bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} 
        boxShadow="sm" 
        py={2} 
        px={4} 
        position="sticky" 
        top={0} 
        zIndex={10}
      >
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <IconButton
              aria-label="Go back"
              icon={<FaArrowLeft />}
              variant="ghost"
              mr={3}
              onClick={() => navigate('/profile')}
            />
            <Heading size="md">Settings</Heading>
          </Flex>
          <Box>{/* Empty box to maintain space-between layout */}</Box>
        </Flex>
      </Box>
      
      {/* Main content with scroll */}
      <Box 
        flex="1" 
        overflowY="auto" 
        bg={colorMode === 'dark' ? 'fbDarkBg.300' : 'white'} 
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200',
            borderRadius: '24px',
          },
        }}
      >
        <Container maxW="container.md" py={6}>
          <VStack spacing={6} align="stretch">
            {/* User Info */}
            <Flex 
              align="center" 
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} 
              p={4} 
              borderRadius="md" 
              boxShadow="sm"
            >
              <Avatar 
                size="md" 
                src={currentUser.avatarUrl} 
                name={currentUser.name} 
                mr={4} 
              />
              <Box>
                <Text fontWeight="bold">{currentUser.name}</Text>
                <Text fontSize="sm" color={colorMode === 'dark' ? 'white' : 'gray.600'}>@{currentUser.username}</Text>
              </Box>
            </Flex>
            
            {/* App Preferences */}
            <Box 
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} 
              p={6} 
              borderRadius="md" 
              boxShadow="sm"
            >
              <Heading size="md" mb={4}>App Preferences</Heading>
              
              <VStack spacing={4} align="stretch">
                {/* Dark Mode Toggle with Facebook-like appearance */}
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <HStack>
                    <Icon 
                      as={colorMode === 'dark' ? FaMoon : FaSun} 
                      color={colorMode === 'dark' ? 'blue.300' : 'yellow.500'} 
                      boxSize={5} 
                      mr={2}
                    />
                    <FormLabel htmlFor="dark-mode" mb="0">
                      Dark Mode
                    </FormLabel>
                  </HStack>
                  <Switch 
                    id="dark-mode" 
                    isChecked={preferences.darkMode}
                    onChange={() => handleToggle('darkMode')}
                    colorScheme="blue"
                    size="md"
                  />
                </FormControl>
                
                <Divider borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'} />
                
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel htmlFor="autoplay" mb="0">
                    Autoplay Videos
                  </FormLabel>
                  <Switch 
                    id="autoplay" 
                    isChecked={preferences.autoplay}
                    onChange={() => handleToggle('autoplay')}
                    colorScheme="blue"
                  />
                </FormControl>
                
                <Divider borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'} />
                
                <FormControl display="flex" alignItems="center" justifyContent="space-between">
                  <FormLabel htmlFor="notifications" mb="0">
                    Enable Notifications
                  </FormLabel>
                  <Switch 
                    id="notifications" 
                    isChecked={preferences.notifications}
                    onChange={() => handleToggle('notifications')}
                    colorScheme="blue"
                  />
                </FormControl>
              </VStack>
            </Box>
            
            {/* Account Settings */}
            <Box 
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} 
              p={6} 
              borderRadius="md" 
              boxShadow="sm"
            >
              <Heading size="md" mb={4}>Account Settings</Heading>
              
              <VStack spacing={4} align="stretch">
                <Button 
                  variant="outline"
                  onClick={() => toast({
                    title: "Change Password",
                    description: "This would open a dialog to change your password.",
                    status: "info",
                    duration: 3000,
                  })}
                >
                  Change Password
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => toast({
                    title: "Update Email",
                    description: "This would open a dialog to update your email.",
                    status: "info",
                    duration: 3000,
                  })}
                >
                  Update Email
                </Button>
                
                <Button 
                  colorScheme="red" 
                  variant="outline"
                  onClick={() => toast({
                    title: "Delete Account",
                    description: "This would open a confirmation dialog to delete your account.",
                    status: "warning",
                    duration: 3000,
                  })}
                >
                  Delete Account
                </Button>
              </VStack>
            </Box>
            
            {/* Save Button */}
            <Box 
              position="sticky" 
              bottom={4} 
              textAlign="center" 
              mt={8}
            >
              <Button 
                colorScheme="blue" 
                size="lg" 
                onClick={handleSaveSettings}
                px={10}
              >
                Save Settings
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}; 