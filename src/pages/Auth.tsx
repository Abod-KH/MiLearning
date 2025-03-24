import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Image, 
  Text, 
  VStack, 
  Heading, 
  useBreakpointValue, 
  Icon, 
  Spinner, 
  Center
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaVideo, FaUsers, FaLightbulb, FaGraduationCap } from 'react-icons/fa';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Create animated components with framer-motion
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Animation keyframes
  const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  `;

  const pulse = keyframes`
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  `;
  
  const floatAnimation = `${float} 3s ease-in-out infinite`;
  const pulseAnimation = `${pulse} 2s ease-in-out infinite`;
  
  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is authenticated, redirecting to home');
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleToggleForm = () => {
    // Simple toggle without animations to ensure reliability
    console.log('Toggling form');
    setIsLogin(!isLogin);
  };
  
  const bgGradient = 'linear(to-br, blue.500, blue.700)';
  const boxSize = useBreakpointValue({ base: '100%', md: '50%' });

  if (isLoading) {
    return (
      <Center minH="100vh" bg="white">
        <VStack spacing={4}>
          <Spinner 
            size="xl" 
            color="blue.500" 
            thickness="4px" 
            speed="0.8s"
            emptyColor="gray.200"
          />
          <Text color="gray.700" fontWeight="medium">Loading MiLearning...</Text>
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
      bg="white"
      overflow="hidden"
    >
      {/* Left side - App Info */}
      <MotionBox 
        w={boxSize} 
        h={{ base: '45vh', md: '100vh' }} 
        bgGradient={bgGradient}
        color="white"
        p={{ base: 8, md: 12 }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        position="relative"
        overflow="hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background Elements */}
        <MotionBox
          position="absolute"
          top="10%"
          right="-5%"
          height="300px"
          width="300px"
          borderRadius="full"
          bg="whiteAlpha.200"
          zIndex={0}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <MotionBox
          position="absolute"
          bottom="-10%"
          left="-5%"
          height="250px"
          width="250px"
          borderRadius="full"
          bg="whiteAlpha.100"
          zIndex={0}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <VStack align="flex-start" spacing={6} maxW="500px" mx="auto" position="relative" zIndex={1}>
          <MotionImage 
            src="/logo1.png" 
            alt="MiLearning" 
            h="70px"
            mb={4}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <Heading 
            size="2xl" 
            fontWeight="bold" 
            lineHeight="shorter"
            letterSpacing="tight"
            bgGradient="linear(to-r, white, blue.100)"
            bgClip="text"
          >
            MiLearning
          </Heading>
          
          <Text 
            fontSize="xl" 
            fontWeight="medium"
            opacity={0.95}
            textShadow="0 1px 2px rgba(0,0,0,0.1)"
          >
            Elevate your skills with engaging, short-form educational content.
          </Text>
          
          <MotionBox 
            w="100%" 
            bg="whiteAlpha.200" 
            borderRadius="xl" 
            p={6} 
            backdropFilter="blur(10px)"
            position="relative"
            overflow="hidden"
            boxShadow="0 8px 32px rgba(0, 0, 0, 0.15)"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Box
              position="absolute"
              top="-20px"
              right="-20px"
              h="150px"
              w="150px"
              borderRadius="full"
              bg="whiteAlpha.200"
              zIndex={0}
            />
            
            <VStack align="flex-start" spacing={5} position="relative" zIndex={1}>
              <MotionFlex 
                align="center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <Icon as={FaVideo} boxSize={6} mr={3} />
                <Text fontWeight="bold" fontSize="lg">Engaging Video Content</Text>
              </MotionFlex>
              
              <MotionFlex 
                align="center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <Icon as={FaUsers} boxSize={6} mr={3} />
                <Text fontWeight="bold" fontSize="lg">Vibrant Learning Community</Text>
              </MotionFlex>
              
              <MotionFlex 
                align="center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <Icon as={FaGraduationCap} boxSize={6} mr={3} />
                <Text fontWeight="bold" fontSize="lg">Professional Skill Growth</Text>
              </MotionFlex>
            </VStack>
          </MotionBox>
        </VStack>
      </MotionBox>
      
      {/* Right side - Auth Form */}
      <Box 
        w={boxSize} 
        h={{ base: 'auto', md: '100vh' }} 
        p={{ base: 5, md: 12 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="white"
        position="relative"
      >
        <MotionBox 
          maxW="450px" 
          w="100%"
          p={6}
          borderRadius="xl"
          bg="white"
          boxShadow="xl"
          borderWidth="1px"
          borderColor="gray.100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isLogin ? 
            <LoginForm onToggleForm={handleToggleForm} /> : 
            <RegisterForm onToggleForm={handleToggleForm} />
          }
        </MotionBox>
      </Box>
    </Flex>
  );
}; 