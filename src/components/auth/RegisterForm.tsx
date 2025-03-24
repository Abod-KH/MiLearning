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
  HStack,
  Stack
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

// Create motion components
const MotionVStack = motion(VStack);
const MotionBox = motion(Box);
const MotionInput = motion(Input);

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
    console.log('Register form submitted');
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
      console.log('Form validation errors:', errors);
      setFormErrors(errors);
      return;
    }
    
    // Clear any form errors
    setFormErrors({});
    
    try {
      // Attempt registration
      console.log('Attempting to register with:', { 
        username, 
        email, 
        name,
        password: '****' // Don't log the actual password
      });
      
      const success = await register({
        username,
        password,
        email,
        name
      });
      
      console.log('Registration result:', success ? 'Success' : 'Failed');
    } catch (err) {
      console.error('Error during form submission:', err);
      // We can't use setError directly as it's not exposed
      clearError(); // Clear any previous errors first
      // The error will be displayed in the next render cycle
      console.error('An unexpected error occurred during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MotionVStack 
        spacing={4} 
        align="flex-start"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box textAlign="center" w="100%" mb={1}>
          <Image 
            src="/logo1.png" 
            alt="MiLearning" 
            h="40px" 
            mx="auto" 
            mb={2} 
          />
          <Heading size="lg" fontWeight="bold" color="gray.800" mb={1}>
            Create Account
          </Heading>
          <Text color="gray.500" fontSize="sm">
            Join MiLearning to start your learning journey
          </Text>
        </Box>
        
        {error && (
          <Alert status="error" borderRadius="md" variant="left-accent">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <FormControl isInvalid={!!formErrors.name}>
          <FormLabel htmlFor="name" fontWeight="medium">Full Name</FormLabel>
          <MotionInput
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            focusBorderColor="blue.400"
            size="md"
            borderRadius="md"
            bg="gray.50"
            _focus={{ bg: "white", boxShadow: "0 0 0 1px blue.400" }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
          />
          <FormErrorMessage>{formErrors.name}</FormErrorMessage>
        </FormControl>
        
        <Stack direction={["column", "row"]} w="100%" spacing={4}>
          <FormControl isInvalid={!!formErrors.username}>
            <FormLabel htmlFor="username" fontWeight="medium">Username</FormLabel>
            <MotionInput
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              focusBorderColor="blue.400"
              size="md"
              borderRadius="md"
              bg="gray.50"
              _focus={{ bg: "white", boxShadow: "0 0 0 1px blue.400" }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.01 }}
            />
            <FormErrorMessage>{formErrors.username}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!formErrors.email}>
            <FormLabel htmlFor="email" fontWeight="medium">Email</FormLabel>
            <MotionInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              focusBorderColor="blue.400"
              size="md"
              borderRadius="md"
              bg="gray.50"
              _focus={{ bg: "white", boxShadow: "0 0 0 1px blue.400" }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.01 }}
            />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>
        </Stack>
        
        <FormControl isInvalid={!!formErrors.password}>
          <FormLabel htmlFor="password" fontWeight="medium">Password</FormLabel>
          <InputGroup>
            <MotionInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              focusBorderColor="blue.400"
              size="md"
              borderRadius="md"
              bg="gray.50"
              _focus={{ bg: "white", boxShadow: "0 0 0 1px blue.400" }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.01 }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
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
          <FormLabel htmlFor="confirmPassword" fontWeight="medium">Confirm Password</FormLabel>
          <MotionInput
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            focusBorderColor="blue.400"
            size="md"
            borderRadius="md"
            bg="gray.50"
            _focus={{ bg: "white", boxShadow: "0 0 0 1px blue.400" }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
          />
          <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>
        </FormControl>
        
        <FormControl isInvalid={!!formErrors.acceptTerms} mt={2}>
          <Checkbox
            colorScheme="blue"
            isChecked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            size="md"
            borderColor="gray.400"
          >
            <Text fontSize="sm">
              I accept the <Button as="a" variant="link" colorScheme="blue" size="sm">Terms of Service</Button> and <Button as="a" variant="link" colorScheme="blue" size="sm">Privacy Policy</Button>
            </Text>
          </Checkbox>
          <FormErrorMessage>{formErrors.acceptTerms}</FormErrorMessage>
        </FormControl>
        
        <Button
          type="submit"
          colorScheme="blue"
          width="100%"
          isLoading={isLoading}
          loadingText="Creating account"
          size="lg"
          mt={2}
          fontSize="md"
          fontWeight="bold"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          _active={{ transform: 'translateY(0)', boxShadow: 'md' }}
          transition="all 0.2s"
        >
          Create Account
        </Button>
        
        <Divider my={3} />
        
        <Box alignSelf="center">
          <Text fontSize="sm" color="gray.600">
            Already have an account?{' '}
            <Button
              variant="link"
              colorScheme="blue"
              onClick={onToggleForm}
              fontSize="sm"
              fontWeight="bold"
              textDecoration="underline"
              _hover={{ textDecoration: 'none' }}
            >
              Sign In
            </Button>
          </Text>
        </Box>
      </MotionVStack>
    </form>
  );
}; 