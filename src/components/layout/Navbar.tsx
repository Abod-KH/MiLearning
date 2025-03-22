import React from 'react';
import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { FaHome, FaSearch, FaBookmark, FaUser } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { icon: FaHome, label: 'Home', path: '/' },
  { icon: FaSearch, label: 'Search', path: '/search' },
  { icon: FaBookmark, label: 'Saved', path: '/saved' },
  { icon: FaUser, label: 'Profile', path: '/profile' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg="white"
      boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
      zIndex={9999}
      py={2}
      height="60px"
      width="100%"
      transform="translateZ(0)"
    >
      <HStack justify="space-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <IconButton
              key={item.path}
              aria-label={item.label}
              icon={<item.icon />}
              variant="ghost"
              colorScheme={isActive ? 'blue' : 'gray'}
              onClick={() => navigate(item.path)}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
              _hover={{ bg: 'transparent' }}
            >
              <Text fontSize="xs">{item.label}</Text>
            </IconButton>
          );
        })}
      </HStack>
    </Box>
  );
}; 