import { BcSnippet } from '@/atoms/bookClubsAtom';
import CreateBookClub from '@/components/Modal/CreateBookClub/CreateBookClub';
import { Flex, Heading, Button, Grid, Text } from '@chakra-ui/react';
import React from 'react';

type DashboardProps = {
  mySnippets: BcSnippet[];
};

const Dashboard: React.FC<DashboardProps> = ({ mySnippets }) => {
  return (
    <>
      <Grid gridTemplateColumns="1fr 1fr">
        {mySnippets &&
          mySnippets.map((bc) => (
            <Flex
              p={10}
              w="500px"
              m={4}
              border="2px dashed"
              borderColor="dark"
              direction="column"
            >
              <Heading mb={6}>{bc.bookClubId}</Heading>
              <Text>{bc.currentBookId}</Text>
            </Flex>
          ))}
      </Grid>
    </>
  );
};
export default Dashboard;
