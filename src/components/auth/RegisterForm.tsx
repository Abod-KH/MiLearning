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

interface RegisterFormProps {
  onToggleForm: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const { register, error, clearError, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    // Validate form
    const errors: {
      name?: string;
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      acceptTerms?: string;
    } = {};
    
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!username.trim()) {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Clear any form errors
    setFormErrors({});
    
    // Attempt registration
    await register({
      username,
      password,
      email,
      name
    });
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
            Create your account
          </Text>
          
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          <FormControl isInvalid={!!formErrors.name}>
            <FormLabel htmlFor="name">Full Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              focusBorderColor="blue.500"
            />
            <FormErrorMessage>{formErrors.name}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!formErrors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              focusBorderColor="blue.500"
            />
            <FormErrorMessage>{formErrors.username}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!formErrors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="blue.500"
            />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!formErrors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
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
          
          <FormControl isInvalid={!!formErrors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              focusBorderColor="blue.500"
            />
            <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!formErrors.acceptTerms}>
            <Checkbox
              colorScheme="blue"
              isChecked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            >
              I accept the Terms of Service and Privacy Policy
            </Checkbox>
            <FormErrorMessage>{formErrors.acceptTerms}</FormErrorMessage>
          </FormControl>
          
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            isLoading={isLoading}
            loadingText="Creating account"
          >
            Sign Up
          </Button>
          
          <Box alignSelf="center" pt={2}>
            <Text fontSize="sm" color="gray.600">
              Already have an account?{' '}
              <Button
                variant="link"
                colorScheme="blue"
                onClick={onToggleForm}
                fontSize="sm"
              >
                Log In
              </Button>
            </Text>
          </Box>
        </VStack>
      </form>
    </Box>
  );
}; 