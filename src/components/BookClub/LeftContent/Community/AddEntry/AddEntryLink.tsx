import { Fade, Flex, Icon, Input, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';

type AddEntryLinkProps = {
  setView: React.Dispatch<React.SetStateAction<string>>;
};

const AddEntryLink: React.FC<AddEntryLinkProps> = ({ setView }) => {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Flex w={'100%'} justify={'flex-end'}>
      <Flex
        // justify="space-evenly"
        // justify="flex-end"
        align="center"
        bg="white"
        height={{ base: '34px', md: '56px' }}
        borderRadius={0}
        border="1px solid"
        borderColor="gray.100"
        p={2}
        mr={2}
        boxShadow="lg"
        w="30%"
        maxW={'700px'}
        minW={'200px'}
      >
        <Input
          placeholder="Add Entry"
          maxHeight={{ base: '26px', md: 'unset' }}
          fontSize={{ base: '8pt', md: '10pt' }}
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'white',
            border: '1px solid',
            borderColor: 'dark'
          }}
          _focus={{
            outline: 'none',
            bg: 'white',
            border: '1px solid',
            borderColor: 'dark'
          }}
          bg="gray.50"
          borderColor="gray.200"
          height="36px"
          borderRadius={4}
          mr={4}
          onClick={() => setView('full')}
        />
        <Icon
          as={IoImageOutline}
          fontSize={24}
          mr={4}
          color="gray.600"
          cursor="pointer"
          onClick={() => setView('full')}
        />
        {/* <Icon
        as={BsLink45Deg}
        fontSize={24}
        color="gray.600"
        cursor="pointer"
        onClick={() => setView('full')}
      /> */}
      </Flex>
    </Flex>
  );
};
export default AddEntryLink;
