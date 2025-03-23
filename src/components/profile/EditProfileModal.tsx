import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Box,
  Avatar,
  Text,
  Flex,
  useToast,
  IconButton,
  useColorMode,
} from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: any; // Added currentUser prop
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, currentUser }) => {
  const { updateProfile } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { colorMode } = useColorMode();
  
  // Default placeholder avatar URL
  const defaultAvatar = 'https://i.pravatar.cc/150?img=0';
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    avatarUrl: currentUser?.avatarUrl || defaultAvatar,
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update form data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || '',
        bio: currentUser.bio || '',
        avatarUrl: currentUser.avatarUrl || defaultAvatar,
      });
    }
  }, [currentUser]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Preview the image
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({
            ...prev,
            avatarUrl: event.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
      
      // Store the file for later upload
      setAvatarFile(file);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Use the updateProfile function from AuthContext
      const success = await updateProfile({
        name: formData.name,
        bio: formData.bio,
        avatarUrl: formData.avatarUrl,
      });
      
      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Close the modal
        onClose();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "There was an error updating your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'}>
        <ModalHeader borderBottomWidth="1px" borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'}>
          Edit Profile
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Profile Photo */}
            <Box textAlign="center">
              <Text mb={2} fontWeight="medium">Profile Photo</Text>
              <Flex justify="center" position="relative">
                <Avatar 
                  size="xl" 
                  src={formData.avatarUrl} 
                  name={formData.name}
                  border="4px solid"
                  borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'white'}
                  boxShadow="md"
                />
                <IconButton
                  aria-label="Change photo"
                  icon={<FaCamera />}
                  position="absolute"
                  bottom="0"
                  right="30%"
                  colorScheme="blue"
                  rounded="full"
                  size="sm"
                  onClick={triggerFileInput}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </Flex>
              <Text fontSize="xs" color={colorMode === 'dark' ? 'white' : 'gray.500'} mt={2}>
                Click on the camera icon to change your photo
              </Text>
            </Box>
            
            {/* Name */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                bg={colorMode === 'dark' ? 'fbDarkBg.100' : 'white'}
                borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'}
              />
            </FormControl>
            
            {/* Bio */}
            <FormControl id="bio" mb={4}>
              <FormLabel>Bio</FormLabel>
              <Textarea 
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                maxLength={160}
                resize="none"
                bg={colorMode === 'dark' ? 'fbDarkBg.100' : 'white'}
                borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'}
              />
              <Text fontSize="xs" color={colorMode === 'dark' ? 'white' : 'gray.500'} mt={2}>
                {formData.bio.length}/160 characters
              </Text>
            </FormControl>
          </VStack>
        </ModalBody>
        
        <ModalFooter borderTopWidth="1px" borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'}>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button 
            colorScheme="blue" 
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Saving"
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}; 