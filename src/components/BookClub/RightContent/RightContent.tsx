import { BookClub } from '@/atoms/bookClubsAtom';
import useBookClubData from '@/hooks/useBookClubData';
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import About from './About';
import Members from './Members';

type RightContentProps = {
  bcData: BookClub;
};

export interface Member {
  userId: string;
  displayName: string | undefined;
  image: string;
  isModerator: boolean;
}

const RightContent: React.FC<RightContentProps> = ({ bcData }) => {
  // const [members, setMembers] = useState<Member[]>([]);
  const [creator, setCreator] = useState<Member>();
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);

  const { getMembers, members } = useBookClubData();

  useEffect(() => {
    async function fetchMembers() {
      setIsLoadingMembers(true);
      await getMembers(bcData);
      // const memberUsers = await getMembers(bcData);
      // setMembers(memberUsers);
      setIsLoadingMembers(false);
    }
    fetchMembers();
  }, [bcData]);

  useEffect(() => {
    setCreator(
      members.filter((member) => member.userId === bcData.creatorId)[0]
    );
  }, [members]);

  return (
    <Flex
      justify={'center'}
      align="center"
      border={'1px solid'}
      borderColor={'gray.300'}
    >
      <Box w={'100%'} minH="100px">
        <Tabs
          isFitted={true}
          size={'md'}
          // borderColor={'black'}
          colorScheme="black"
          w={'100%'}
        >
          <TabList w={'100%'} justifyContent={'center'}>
            <Tab>About</Tab>
            <Tab>Members</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <About bcData={bcData} />
            </TabPanel>
            <TabPanel>
              <Members
                members={members}
                creator={creator}
                isLoadingMembers={isLoadingMembers}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};
export default RightContent;
