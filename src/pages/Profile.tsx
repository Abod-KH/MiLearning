import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Avatar,
  Text,
  Heading,
  SimpleGrid,
  Badge,
  Container,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
} from '@chakra-ui/react';
import { useVideo } from '../context/VideoContext';

export const Profile: React.FC = () => {
  const { currentUser, savedVideos } = useVideo();

  return (
    <Box minHeight="100vh" bg="gray.50" pb="60px">
      <Container maxW="container.md" py={4}>
        <VStack spacing={6} align="stretch">
          {/* Profile Header */}
          <Box textAlign="center">
            <Avatar size="xl" src={currentUser.avatarUrl} mb={4} />
            <Heading size="lg">{currentUser.name}</Heading>
            <Text color="gray.600">Learning Enthusiast</Text>
            <Button colorScheme="blue" mt={4}>
              Edit Profile
            </Button>
          </Box>

          {/* Stats */}
          <SimpleGrid columns={2} spacing={4}>
            <Stat>
              <StatLabel>Videos Watched</StatLabel>
              <StatNumber>{currentUser.videosWatched}</StatNumber>
              <StatHelpText>Total learning progress</StatHelpText>
            </Stat>
            <Stat>
              <StatLabel>Saved Videos</StatLabel>
              <StatNumber>{savedVideos.length}</StatNumber>
              <StatHelpText>For later reference</StatHelpText>
            </Stat>
          </SimpleGrid>

          {/* Badges */}
          <Box>
            <Heading size="md" mb={4}>
              Badges Earned
            </Heading>
            <HStack spacing={2} wrap="wrap">
              {currentUser.badges.map((badge) => (
                <Badge
                  key={badge.id}
                  colorScheme="blue"
                  variant="subtle"
                  p={2}
                  borderRadius="md"
                >
                  {badge.name}
                </Badge>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}; 