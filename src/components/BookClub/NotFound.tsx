import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

const NotFound: React.FC = () => {
  return (
    <Flex flexDirection="column" justify="center" align="center" minH="50vh">
      This Book Club doesn't exist yet 🫠
      <Link href="/">
        <Button mt={4}>Go Home</Button>
      </Link>
    </Flex>
  );
};
export default NotFound;
