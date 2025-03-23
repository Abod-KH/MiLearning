import React, { useRef, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Container,
  Avatar,
  Text,
  Heading,
  Button,
  Flex,
  IconButton,
  Divider,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  List,
  ListItem,
  Icon,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { FaEdit, FaSignOutAlt, FaUser, FaCog, FaBars, FaCheck, FaHeart, FaBookmark, FaPlayCircle } from 'react-icons/fa';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_AVATAR } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { VideoCard } from '../components/video/VideoCard';

export const Profile: React.FC = () => {
  const { videos, savedVideos } = useVideo();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isEditProfileOpen, onOpen: onEditProfileOpen, onClose: onEditProfileClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  
  // Filter videos for each tab
  const savedVideoList = videos.filter(video => savedVideos.includes(video.id));
  // In a real app, you would have actual liked videos data
  const likedVideoList = videos.slice(0, 3); // Just showing a few sample videos for liked tab
  const watchedVideoList = videos.slice(2, 5); // Just showing a few sample videos for watched tab
  
  if (!currentUser) {
    return <Box p={5}>Loading profile...</Box>;
  }
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      {/* Header with Drawer */}
      <Box 
        bg={colorMode === 'dark' ? 'fbDarkBg.200' : '#E3F2FD'} 
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
              ref={btnRef}
              aria-label="Open menu"
              icon={<FaBars />}
              variant="ghost"
              onClick={onOpen}
              mr={3}
            />
            <Heading size="md">Profile</Heading>
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
        <Container maxW="container.md" py={4}>
          <VStack spacing={6} align="stretch">
            {/* Profile Header */}
            <Box 
              textAlign="center" 
              position="relative" 
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} 
              borderRadius="lg" 
              p={6} 
              boxShadow="sm"
            >
              <Avatar 
                size="xl" 
                src={currentUser.avatarUrl || DEFAULT_AVATAR} 
                mb={4} 
                border="4px solid"
                borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'white'}
                boxShadow="lg"
              />
              <Heading size="lg">{currentUser.name}</Heading>
              <Text color={colorMode === 'dark' ? 'white' : 'gray.600'}>@{currentUser.username}</Text>
              <Text mt={2} maxW="400px" mx="auto" fontSize="sm" color={colorMode === 'dark' ? 'white' : 'gray.600'}>
                {currentUser.bio || "No bio yet"}
              </Text>
              
              <Flex mt={4} justify="center" gap={2}>
                <Button 
                  leftIcon={<FaEdit />} 
                  colorScheme="blue" 
                  size="sm"
                  onClick={onEditProfileOpen}
                >
                  Edit Profile
                </Button>
                <Button 
                  leftIcon={<FaSignOutAlt />} 
                  colorScheme="red" 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Flex>
            </Box>
            
            <Divider borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'} />

            {/* Videos Watched Stat - More Compact */}
            <Box 
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} 
              p={3} 
              borderRadius="lg" 
              boxShadow="md" 
              textAlign="center"
            >
              <Heading size="sm" mb={1} color={colorMode === 'dark' ? 'white' : 'gray.600'}>Videos Watched</Heading>
              <Heading size="lg" color="blue.500">{currentUser.videosWatched}</Heading>
              <Text color={colorMode === 'dark' ? 'white' : 'gray.500'} fontSize="xs" mt={0}>Total learning progress</Text>
            </Box>

            {/* Video Tab Navigation */}
            <Box
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'}
              borderRadius="lg"
              boxShadow="sm"
              overflow="hidden"
            >
              <Tabs 
                isFitted 
                variant="enclosed" 
                colorScheme="blue" 
                onChange={(index) => setActiveTab(index)}
                index={activeTab}
              >
                <TabList>
                  <Tab 
                    _selected={{ 
                      color: 'brand.500', 
                      bg: colorMode === 'dark' ? 'rgba(0, 132, 255, 0.1)' : 'blue.50',
                      fontWeight: 'bold'
                    }} 
                    color={colorMode === 'dark' ? 'white' : 'gray.600'}
                  >
                    <Icon as={FaPlayCircle} mr={2} /> 
                    Watched
                  </Tab>
                  <Tab 
                    _selected={{ 
                      color: 'brand.500', 
                      bg: colorMode === 'dark' ? 'rgba(0, 132, 255, 0.1)' : 'blue.50',
                      fontWeight: 'bold'
                    }} 
                    color={colorMode === 'dark' ? 'white' : 'gray.600'}
                  >
                    <Icon as={FaHeart} mr={2} /> 
                    Liked
                  </Tab>
                  <Tab 
                    _selected={{ 
                      color: 'brand.500', 
                      bg: colorMode === 'dark' ? 'rgba(0, 132, 255, 0.1)' : 'blue.50',
                      fontWeight: 'bold'
                    }} 
                    color={colorMode === 'dark' ? 'white' : 'gray.600'}
                  >
                    <Icon as={FaBookmark} mr={2} /> 
                    Saved
                  </Tab>
                </TabList>
                <TabPanels>
                  {/* Videos Watched Panel */}
                  <TabPanel p={4}>
                    {watchedVideoList.length > 0 ? (
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        {watchedVideoList.map((video) => (
                          <Box
                            key={video.id}
                            bg={colorMode === 'dark' ? 'fbDarkBg.100' : 'white'}
                            borderRadius="md"
                            overflow="hidden"
                            boxShadow="sm"
                            height="300px"
                            position="relative"
                          >
                            <VideoCard 
                              video={video}
                              isVisible={activeTab === 0}
                              isSearchOrSaved={true}
                            />
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <Text color={colorMode === 'dark' ? 'white' : 'gray.500'} textAlign="center" py={4}>
                        No watched videos yet. Start exploring!
                      </Text>
                    )}
                  </TabPanel>
                  
                  {/* Videos Liked Panel */}
                  <TabPanel p={4}>
                    {likedVideoList.length > 0 ? (
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        {likedVideoList.map((video) => (
                          <Box
                            key={video.id}
                            bg={colorMode === 'dark' ? 'fbDarkBg.100' : 'white'}
                            borderRadius="md"
                            overflow="hidden"
                            boxShadow="sm"
                            height="300px"
                            position="relative"
                          >
                            <VideoCard 
                              video={video}
                              isVisible={activeTab === 1}
                              isSearchOrSaved={true}
                            />
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <Text color={colorMode === 'dark' ? 'white' : 'gray.500'} textAlign="center" py={4}>
                        No liked videos yet. Like your favorite videos!
                      </Text>
                    )}
                  </TabPanel>
                  
                  {/* Videos Saved Panel */}
                  <TabPanel p={4}>
                    {savedVideoList.length > 0 ? (
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                        {savedVideoList.map((video) => (
                          <Box
                            key={video.id}
                            bg={colorMode === 'dark' ? 'fbDarkBg.100' : 'white'}
                            borderRadius="md"
                            overflow="hidden"
                            boxShadow="sm"
                            height="300px"
                            position="relative"
                          >
                            <VideoCard 
                              video={video}
                              isVisible={activeTab === 2}
                              isSearchOrSaved={true}
                            />
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <Text color={colorMode === 'dark' ? 'white' : 'gray.500'} textAlign="center" py={4}>
                        No saved videos yet. Save videos for later!
                      </Text>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>

            {/* Badges */}
            <Box 
              bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'} 
              p={5} 
              borderRadius="lg" 
              boxShadow="sm"
            >
              <Heading size="md" mb={4}>
                Badges Earned
              </Heading>
              {currentUser.badges && currentUser.badges.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                  {currentUser.badges.map((badge) => (
                    <HStack 
                      key={badge.id} 
                      bg={colorMode === 'dark' ? 'fbDarkBg.100' : 'white'} 
                      p={3} 
                      borderRadius="md" 
                      boxShadow="sm"
                      spacing={3}
                      border="1px solid"
                      borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.100'}
                    >
                      <Avatar src={badge.iconUrl} size="sm" />
                      <Box>
                        <Text fontWeight="bold">{badge.name}</Text>
                        <Text fontSize="xs" color={colorMode === 'dark' ? 'white' : 'gray.600'}>
                          {badge.description}
                        </Text>
                      </Box>
                    </HStack>
                  ))}
                </SimpleGrid>
              ) : (
                <Text color={colorMode === 'dark' ? 'white' : 'gray.500'}>
                  No badges earned yet. Keep watching videos to earn badges!
                </Text>
              )}
            </Box>
          </VStack>
        </Container>
      </Box>

      {/* Drawer */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={colorMode === 'dark' ? 'fbDarkBg.200' : 'white'}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'}>
            <Flex align="center">
              <Avatar 
                size="sm" 
                src={currentUser.avatarUrl} 
                name={currentUser.name} 
                mr={3} 
              />
              <Box>
                <Text fontWeight="bold">{currentUser.name}</Text>
                <Text fontSize="xs" color={colorMode === 'dark' ? 'white' : 'gray.500'}>@{currentUser.username}</Text>
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <List spacing={0}>
              <ListItem onClick={() => {
                navigate('/profile');
                onClose();
              }}>
                <Flex
                  py={3}
                  px={4}
                  alignItems="center"
                  _hover={{ bg: colorMode === 'dark' ? 'fbDarkBg.100' : 'gray.100' }}
                  cursor="pointer"
                  fontWeight="medium"
                >
                  <FaUser color={colorMode === 'dark' ? '#4999E9' : '#3182CE'} style={{ marginRight: '12px' }} />
                  <Text>Profile</Text>
                  <Icon as={FaCheck} ml="auto" color="blue.500" />
                </Flex>
              </ListItem>

              <ListItem onClick={() => {
                navigate('/settings');
                onClose();
              }}>
                <Flex
                  py={3}
                  px={4}
                  alignItems="center"
                  _hover={{ bg: colorMode === 'dark' ? 'fbDarkBg.100' : 'gray.100' }}
                  cursor="pointer"
                >
                  <FaCog color={colorMode === 'dark' ? '#4999E9' : '#3182CE'} style={{ marginRight: '12px' }} />
                  <Text>Settings</Text>
                </Flex>
              </ListItem>

              <Divider my={2} borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.200'} />

              <ListItem onClick={() => {
                handleLogout();
                onClose();
              }}>
                <Flex
                  py={3}
                  px={4}
                  alignItems="center"
                  _hover={{ bg: colorMode === 'dark' ? 'rgba(229, 62, 62, 0.2)' : 'red.50' }}
                  cursor="pointer"
                >
                  <FaSignOutAlt color={colorMode === 'dark' ? '#FC8181' : '#E53E3E'} style={{ marginRight: '12px' }} />
                  <Text color={colorMode === 'dark' ? 'red.300' : 'red.500'}>Logout</Text>
                </Flex>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={onEditProfileClose}
        currentUser={currentUser}
      />
    </Box>
  );
}; 