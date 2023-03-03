import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const VerifyEmail: React.FC = () => {
  return (
    <>
      <Flex align="center" justify={'center'}>
        <Text textAlign={'center'}>
          Kindly verify the email address you've provided so that you can
          proceed.
        </Text>
      </Flex>
    </>
  );
};
export default VerifyEmail;
