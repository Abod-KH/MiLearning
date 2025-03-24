import React from 'react';
import { Box, Flex, Icon, Text, useColorMode } from '@chakra-ui/react';
import { FaHome, FaSearch, FaBookmark, FaUser } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive }) => {
  const { colorMode } = useColorMode();
  
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <Flex 
        direction="column" 
        align="center" 
        py={2}
        position="relative"
        color={isActive ? (colorMode === 'dark' ? "brand.500" : "customBlue.500") : colorMode === 'dark' ? 'white' : 'gray.600'}
        className={isActive ? 'active-nav-item' : ''}
        _hover={{ 
          color: colorMode === 'dark' ? "brand.500" : "customBlue.500",
          transform: 'translateY(-2px)',
        }}
        transition="all 0.2s ease"
      >
        <Icon 
          as={icon} 
          boxSize={6} 
          mb={1}
          filter={isActive && colorMode === 'dark' ? 'drop-shadow(0 0 4px rgba(0, 132, 255, 0.6))' : 'none'}
        />
        <Text 
          fontSize="xs" 
          fontWeight={isActive ? "bold" : "normal"}
        >
          {label}
        </Text>
        
        {/* Active indicator line */}
        {isActive && (
          <Box
            position="absolute"
            bottom="-5px"
            left="50%"
            transform="translateX(-50%)"
            height="3px"
            width="50%"
            className="active-indicator"
            borderRadius="full"
          />
        )}
      </Flex>
    </NavLink>
  );
};

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { colorMode } = useColorMode();
  
  // Define navigation items
  const navItems = [
    { 
      icon: FaHome, 
      label: 'Home', 
      to: '/' 
    },
    { 
      icon: FaSearch, 
      label: 'Search', 
      to: '/search' 
    },
    { 
      icon: FaBookmark, 
      label: 'Saved', 
      to: '/saved' 
    },
    { 
      icon: FaUser, 
      label: 'Profile', 
      to: '/profile' 
    },
  ];

  return (
    <Box
      className="nav-container"
      position="fixed"
      bottom="0"
      left="0" 
      right="0"
      height="55px"
      zIndex={1000}
      width="100%"
      bg={colorMode === 'dark' ? 'fbDarkBg.200' : '#E3F2FD'}
      borderTop="1px solid"
      borderColor={colorMode === 'dark' ? 'fbDarkBg.50' : 'gray.100'}
    >
      <Flex 
        justify="space-around" 
        align="center"
        height="100%"
        width="100%"
      >
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            to={item.to}
            isActive={
              item.to === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(item.to)
            }
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Navbar; 