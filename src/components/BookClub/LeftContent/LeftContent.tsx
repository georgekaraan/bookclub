import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import CurrentlyReading from './Books/CurrentlyReading';
import Community from './Community/Community';
import { BookClub } from '@/atoms/bookClubsAtom';
import CurrentBookTimeline from './Books/CurrentBook';
import Library from './Library/Library';

type LeftContentProps = {
  tab: number;
  bcData: BookClub;
};

const LeftContent: React.FC<LeftContentProps> = ({ tab, bcData }) => {
  const router = useRouter();

  const onClick = (tabRoute: string) => {
    const { bookclub } = router.query;
    if (bookclub) {
      router.push(`/bc/${bookclub}/${tabRoute}`);
    }
  };

  return (
    <Flex w={'100%'} border="1px solid" minH={'70vh'} borderColor="gray.300">
      <Tabs
        w={'100%'}
        isFitted
        size={{ base: 'sm', md: 'md' }}
        index={tab}
        colorScheme="black"
      >
        <TabList>
          {bcData.currentBookId && (
            <Tab onClick={() => onClick('')}>Current Book</Tab>
          )}
          <Tab onClick={() => onClick('library')}>Library</Tab>
          <Tab onClick={() => onClick('community')}>Community</Tab>
          <Tab onClick={() => onClick('quotes')}>Quotes</Tab>
          <Tab onClick={() => onClick('poll')}>Poll</Tab>
        </TabList>
        <TabPanels>
          {bcData.currentBookId && (
            <TabPanel>
              {/* <CurrentlyReading /> */}
              <CurrentBookTimeline />
            </TabPanel>
          )}
          <TabPanel>
            <Library />
          </TabPanel>
          <TabPanel>
            <Community bcData={bcData} />
          </TabPanel>
          <TabPanel>{/* <Community bcData={bcData} /> */}</TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
export default LeftContent;
