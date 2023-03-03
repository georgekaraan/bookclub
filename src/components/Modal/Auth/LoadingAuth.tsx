import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

const LoadingAuth: React.FC = () => {
  return (
    <>
      <Center>
        <Spinner size="lg" />
      </Center>
    </>
  );
};
export default LoadingAuth;
