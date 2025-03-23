import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Text, VStack, Heading, useBreakpointValue, useColorModeValue, Icon, Spinner, Center, useColorMode } from '@chakra-ui/react';
import { FaVideo, FaUsers, FaLightbulb } from 'react-icons/fa';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, redirecting to home');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  const bgGradient = useColorModeValue(
    'linear(to-r, blue.400, purple.500)',
    'linear(to-r, blue.600, purple.700)'
  );
  
  const boxSize = useBreakpointValue({ base: '100%', md: '50%' });

  if (isLoading) {
    return (
      <Center minH="100vh" bg={colorMode === 'dark' ? 'black' : 'gray.50'}>
        <VStack spacing={4}>
          <Spinner size="xl" color="brand.500" thickness="4px" />
          <Text color={colorMode === 'dark' ? 'darkText.200' : 'gray.600'}>Loading authentication...</Text>
        </VStack>
      </Center>
    );
  }
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <Flex 
      minH="100vh" 
      align="center" 
      justify="center" 
      direction={{ base: 'column', md: 'row' }}
      bg={colorMode === 'dark' ? 'black' : 'gray.50'}
    >
      {/* Left side - App Info */}
      <Box 
        w={boxSize} 
        h={{ base: '40vh', md: '100vh' }} 
        bgGradient={bgGradient}
        color="white"
        p={{ base: 8, md: 12 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        position="relative"
        overflow="hidden"
      >
        {/* Decorative bubbles for visual interest */}
        <Box
          position="absolute"
          top="10%"
          right="-5%"
          height="300px"
          width="300px"
          borderRadius="full"
          bg="whiteAlpha.100"
          zIndex={0}
        />
        <Box
          position="absolute"
          bottom="-10%"
          left="-5%"
          height="200px"
          width="200px"
          borderRadius="full"
          bg="whiteAlpha.100"
          zIndex={0}
        />
        
        <VStack align="flex-start" spacing={6} maxW="500px" mx="auto" position="relative" zIndex={1}>
          <Image 
            src="https://seeklogo.com/images/T/tiktok-logo-1F4A5DCD45-seeklogo.com.png" 
            alt="TikTok Business" 
            h="60px"
            mb={4}
          />
          
          <Heading size="2xl" fontWeight="bold" lineHeight="shorter">
            TikTok for Business Learning
          </Heading>
          
          <Text fontSize="xl" opacity={0.9}>
            Watch, learn, and grow with short-form videos tailored for business professionals.
          </Text>
          
          <Box 
            w="100%" 
            bg="whiteAlpha.200" 
            borderRadius="lg" 
            p={6} 
            backdropFilter="blur(10px)"
            position="relative"
            overflow="hidden"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.15)"
          >
            <Box
              position="absolute"
              top="-20px"
              right="-20px"
              h="150px"
              w="150px"
              borderRadius="full"
              bg="whiteAlpha.100"
              zIndex={0}
            />
            
            <VStack align="flex-start" spacing={4} position="relative" zIndex={1}>
              <Flex align="center">
                <Icon as={FaVideo} boxSize={6} mr={3} />
                <Text fontWeight="bold" fontSize="lg">Short-form Videos</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaUsers} boxSize={6} mr={3} />
                <Text fontWeight="bold" fontSize="lg">Business Community</Text>
              </Flex>
              <Flex align="center">
                <Icon as={FaLightbulb} boxSize={6} mr={3} />
                <Text fontWeight="bold" fontSize="lg">Learn Professional Skills</Text>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </Box>
      
      {/* Right side - Auth Form */}
      <Box 
        w={boxSize} 
        h={{ base: 'auto', md: '100vh' }} 
        p={{ base: 5, md: 12 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={colorMode === 'dark' ? 'black' : 'white'}
      >
        <Box 
          maxW="450px" 
          w="100%"
          p={6}
          borderRadius="xl"
          bg={colorMode === 'dark' ? 'black' : 'white'}
          boxShadow={colorMode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'lg'}
          borderWidth={colorMode === 'dark' ? '1px' : '0'}
          borderColor={colorMode === 'dark' ? 'gray.800' : 'transparent'}
        >
          {isLogin ? 
            <LoginForm onToggleForm={handleToggleForm} /> : 
            <RegisterForm onToggleForm={handleToggleForm} />
          }
        </Box>
      </Box>
    </Flex>
  );
}; 