import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import React from 'react';

type SearchInputProps = {
  user: any;
};

const SearchInput: React.FC<SearchInputProps> = ({ user }) => {
  return (
    <Flex
      ml={2}
      align="center"
      display={{ base: 'none', md: 'unset' }}
      width="300px"
      m={'0 auto'}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="lightYellow" />}
          height="32px"
          mt={'0.5'}
        />
        <Input
          type="text"
          height="36px"
          placeholder="Search book"
          _placeholder={{ color: 'gray' }}
          //   fontSize={'10pt'}
          color={'lightyellow'}
          _focus={{ outline: 'none', border: '1px solid' }}
          _hover={{ bg: 'gray.700', border: '1px solid' }}
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
