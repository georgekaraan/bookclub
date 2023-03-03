import { authModalState } from '@/atoms/authModalAtom';
import CreateBookClub from '@/components/Modal/CreateBookClub/CreateBookClub';
import { Button, Flex, Heading, Text, chakra } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

type NotAMemberProps = {};

const NotAMember: React.FC<NotAMemberProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Flex
        p={10}
        m={4}
        border="2px dashed"
        borderColor="dark"
        direction="column"
      >
        <Heading mb={6}>You are not part of a bookclub yet!</Heading>
        <CreateBookClub open={open} handleClose={() => setOpen(false)} />
        <Button onClick={() => setOpen(true)} variant="light" size="md">
          Create Your Own Bookclub
        </Button>
      </Flex>
      <Text> -- or -- </Text>
      <Flex>
        <Heading>
          Join one of the{' '}
          <chakra.span textDecoration="underline"> top ones</chakra.span>
        </Heading>
      </Flex>
    </>
  );
};
export default NotAMember;
