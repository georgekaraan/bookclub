import { authModalState } from '@/atoms/authModalAtom';
import { Fade, Flex, Icon, Input, useDisclosure } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { IoImageOutline } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';

type AddEntryLinkProps = {
  setView: React.Dispatch<React.SetStateAction<string>>;
  user?: User | null;
};

const AddEntryLink: React.FC<AddEntryLinkProps> = ({ setView, user }) => {
  const { isOpen, onToggle } = useDisclosure();
  const setAuthModalState = useSetRecoilState(authModalState);

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Flex w={'100%'} maxW="800px" justify={'flex-end'}>
      <Flex
        align="center"
        bg="white"
        height="56px"
        borderRadius={0}
        border="1px solid"
        borderColor="gray.100"
        p={2}
        // mr={20}
        boxShadow="lg"
        minW={'200px'}
        w={'300px'}
      >
        <Input
          placeholder="Add Entry"
          // maxHeight={{ base: '26px', md: 'unset' }}
          fontSize="10pt"
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
          onClick={
            user
              ? () => setView('full')
              : () => setAuthModalState({ open: true, view: 'login' })
          }
        />
        <Icon
          as={IoImageOutline}
          fontSize={24}
          mr={4}
          color="gray.600"
          cursor="pointer"
          onClick={
            user
              ? () => setView('full')
              : () => setAuthModalState({ open: true, view: 'login' })
          }
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
