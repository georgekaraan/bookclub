import { Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import DarkModeSwitch from './DarkModeSwitch';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import Library from './Library';

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      bg="dark"
      height="64px"
      _dark={{ bg: 'lightYellow' }}
      padding={'6px 18px'}
      align="center"
      justifyContent={'space-between'}
    >
      <Flex alignItems={'center'} gap="0.5em" _dark={{ bg: 'lightYellow' }}>
        {/* <Image
          src="/images/Lex-Face.png"
          height="42px"
          _dark={{ bg: 'lightYellow' }}
        /> */}
        <Heading
          size={{ sm: 'sm', md: 'md' }}
          color={'lightYellow'}
          _dark={{ bg: 'lightYellow', color: 'dark' }}
          display={{ base: 'none', sm: 'unset' }}
          whiteSpace="nowrap"
        >
          BookClub
        </Heading>
        <Library user={user} />
      </Flex>
      <SearchInput user={user} />
      <RightContent user={user} />
      {/* <DarkModeSwitch /> */}
    </Flex>
  );
};
export default Navbar;
