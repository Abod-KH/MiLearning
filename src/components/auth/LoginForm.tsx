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
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

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
    <Box
      w="100%"
      p={6}
      borderRadius="lg"
      bg="white"
      boxShadow="sm"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="flex-start">
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            Log in to TikTok Business
          </Text>
          
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          <FormControl isInvalid={!!formErrors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              focusBorderColor="blue.500"
            />
            <FormErrorMessage>{formErrors.username}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!formErrors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                focusBorderColor="blue.500"
              />
              <InputRightElement width="3rem">
                <Button
                  h="1.5rem"
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
          </FormControl>
          
          <FormControl>
            <Checkbox
              colorScheme="blue"
              isChecked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              Remember me
            </Checkbox>
          </FormControl>
          
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={isLoading}
            loadingText="Logging in"
          >
            Log In
          </Button>
          
          <Box alignSelf="center" pt={2}>
            <Text fontSize="sm" color="gray.600">
              Don't have an account?{' '}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={onToggleForm}
                fontSize="sm"
              >
                Sign Up
              </Button>
            </Text>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}; 