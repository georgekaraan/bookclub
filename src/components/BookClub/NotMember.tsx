import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

const NotMember: React.FC = () => {
  return (
    <Flex flexDirection="column" justify="center" align="center" minH="50vh">
      You are not a member of this bookclub!
      <Link href="/">
        <Button mt={4}>Request Access</Button>
      </Link>
    </Flex>
  );
};
export default NotMember;
