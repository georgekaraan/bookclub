import { bookClubState } from '@/atoms/bookClubsAtom';
import { Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Recommendations from '../Recommendations/Recommendations';
import Dashboard from './Dashboard';
import NotAMember from './NotAMember';

type UserProps = {};

const User: React.FC<UserProps> = () => {
  const { mySnippets } = useRecoilValue(bookClubState);

  return (
    <>
      <Flex direction="column" align="center" justify="center">
        {mySnippets ? <Dashboard mySnippets={mySnippets} /> : <NotAMember />}
        <Grid
          my={6}
          templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }}
          gap={10}
        >
          <Recommendations filter={'numberOfBooks'} />
          <Recommendations filter={'numberOfMembers'} />
          <Recommendations filter={'hottestBooks'} />
        </Grid>
      </Flex>
    </>
  );
};
export default User;
