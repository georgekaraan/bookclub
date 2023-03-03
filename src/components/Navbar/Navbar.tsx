import { Book } from '@/atoms/bookAtom';
import { auth } from '@/firebase/clientApp';
import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Library from './Library/Library';
import RightContent from './RightContent/RightContent';
import SearchInput from './SearchInput';

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [searcResults, setSearcResults] = useState<Book[]>([]);

  const router = useRouter();

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
        <Heading
          size={{ sm: 'sm', md: 'md' }}
          color={'lightYellow'}
          _dark={{ bg: 'lightYellow', color: 'dark' }}
          display={{ base: 'none', sm: 'unset' }}
          whiteSpace="nowrap"
          onClick={() => router.push('/')}
          cursor="pointer"
        >
          BookClub
        </Heading>
        <Library user={user} />
      </Flex>
      <SearchInput
        user={user}
        navbar={true}
        setSearchResults={setSearcResults}
      />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
