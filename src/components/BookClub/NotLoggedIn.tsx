import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

const NotLoggedIn: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleLogIn = () => {
    setAuthModalState({ open: true, view: 'login' });
    return;
  };

  return (
    <Flex flexDirection="column" justify="center" align="center" minH="50vh">
      This is a private bookclub. Log In to view content.
      <Button variant="light" onClick={handleLogIn} mt={4}>
        Log In
      </Button>
    </Flex>
  );
};
export default NotLoggedIn;
