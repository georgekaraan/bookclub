import { Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';
import { User } from 'firebase/auth';
import UserMenu from './UserMenu';

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify={'center'} align="center">
        {user ? <UserMenu user={user} /> : <AuthButtons />}
      </Flex>
    </>
  );
};
export default RightContent;
