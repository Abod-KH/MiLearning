import React from 'react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useVideo } from '../../context/VideoContext';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useVideo();

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FaSearch color="gray.300" />
      </InputLeftElement>
      <Input
        placeholder="Search videos..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="filled"
        bg="whiteAlpha.200"
        _hover={{ bg: 'whiteAlpha.300' }}
        _focus={{ bg: 'whiteAlpha.400' }}
      />
    </InputGroup>
  );
}; 