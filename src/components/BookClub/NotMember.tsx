import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

const NotMember: React.FC = () => {
  return (
    <Flex flexDirection="column" justify="center" align="center" minH="50vh">
      You are not a member of this bookclub!
      {/* <Button variant="light" mt={4} px={3}>
        Request Access
      </Button> */}
    </Flex>
  );
};
export default NotMember;
