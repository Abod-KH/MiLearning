import React from 'react';
import { Input, InputGroup, InputLeftElement, useColorMode } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useVideo } from '../../context/VideoContext';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useVideo();
  const { colorMode } = useColorMode();

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FaSearch color={colorMode === 'dark' ? 'gray.400' : 'gray.300'} />
      </InputLeftElement>
      <Input
        placeholder="Search videos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="filled"
        bg={colorMode === 'dark' ? 'whiteAlpha.200' : 'softGray.50'}
        color={colorMode === 'dark' ? 'white' : 'black'}
        _hover={{ bg: colorMode === 'dark' ? 'whiteAlpha.300' : 'gray.200' }}
        _focus={{ 
          bg: colorMode === 'dark' ? 'whiteAlpha.400' : 'white',
          borderColor: 'blue.500'
        }}
      />
    </InputGroup>
  );
}; 