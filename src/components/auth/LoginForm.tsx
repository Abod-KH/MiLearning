import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  FormErrorMessage,
  Checkbox,
  Heading,
  Divider,
  Image,
  Flex
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

// Create motion components
const MotionVStack = motion(VStack);
const MotionBox = motion(Box);
const MotionInput = motion(Input);

interface LoginFormProps {
  onToggleForm: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const { login, error, clearError, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Validate form
    const errors: {
      username?: string;
      password?: string;
    } = {};
    
    if (!username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Clear any form errors
    setFormErrors({});
    
    // Attempt login
    const success = await login(username, password);
    
    if (success && rememberMe) {
      // In a real app, we might store a refresh token or set a longer expiry
      console.log('User opted to be remembered');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MotionVStack 
        spacing={5} 
        align="flex-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box textAlign="center" w="100%" mb={2}>
          <Image 
            src="/logo1.png" 
            alt="MiLearning" 
            h="45px" 
            mx="auto" 
            mb={2} 
          />
          <Heading size="lg" fontWeight="bold" color="gray.800" mb={1}>
            Welcome Back
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Log in to continue your learning journey
          </Text>
        </Box>
        
        {error && (
          <Alert status="error" borderRadius="md" variant="left-accent">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <FormControl isInvalid={!!formErrors.username}>
          <FormLabel htmlFor="username" fontWeight="medium">Username</FormLabel>
          <InputGroup>
            <MotionInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              focusBorderColor="blue.400"
              size="lg"
              borderRadius="md"
              fontSize="md"
              bg="gray.50"
              _focus={{ bg: "white", boxShadow: "0 0 0 1px blue.400" }}
              pr="4.5rem"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.01 }}
            />
          </InputGroup>
          <FormErrorMessage>{formErrors.username}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!formErrors.password}>
          <FormLabel htmlFor="password" fontWeight="medium">Password</FormLabel>
          <InputGroup>
            <MotionInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              focusBorderColor="blue.400"
              size="lg"
              borderRadius="md"
              fontSize="md"
              bg="gray.50"
              _focus={{ bg: "white", boxShadow: "0 0 0 1px blue.400" }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.01 }}
            />
            <InputRightElement width="4.5rem" h="full">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formErrors.password}</FormErrorMessage>
        </FormControl>
        
        <Flex justify="space-between" w="100%" align="center" mt={1}>
          <FormControl display="flex" alignItems="center">
            <Checkbox
              colorScheme="blue"
              isChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              size="md"
              borderColor="gray.400"
            >
              <Text fontSize="sm">Remember me</Text>
            </Checkbox>
          </FormControl>
          
          <Button variant="link" colorScheme="blue" size="sm">
            Forgot Password?
          </Button>
        </Flex>
        
        <Button
          type="submit"
          colorScheme="blue"
          width="100%"
          isLoading={isLoading}
          loadingText="Logging in"
          size="lg"
          mt={2}
          fontSize="md"
          fontWeight="bold"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          _active={{ transform: 'translateY(0)', boxShadow: 'md' }}
          transition="all 0.2s"
        >
          Sign In
        </Button>
        
        <Divider my={4} />
        
        <Box alignSelf="center" textAlign="center">
          <Text fontSize="sm" color="gray.600">
            Don't have an account?{' '}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={onToggleForm}
              fontSize="sm"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: 'none' }}
            >
              Sign Up Now
            </Button>
          </Text>
        </Box>
      </MotionVStack>
    </form>
  );
}; 