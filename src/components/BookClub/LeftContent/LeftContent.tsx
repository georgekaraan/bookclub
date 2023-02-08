import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex
} from '@chakra-ui/react';
import React from 'react';
import AddEntry from './Community/AddEntry/AddEntry';
import { useRouter } from 'next/router';
import CurrentlyReading from './CurrentlyReading';

type LeftContentProps = {
  tab: number;
};

const LeftContent: React.FC<LeftContentProps> = ({ tab }) => {
  const router = useRouter();

  const onClick = (tabRoute: string) => {
    const { bookclub } = router.query;
    if (bookclub) {
      router.push(`/bc/${bookclub}/${tabRoute}`);
    }
  };
  //   // Could check for user to open auth modal before redirecting to submit
  //   if (community) {
  //     return;
  //   }

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
          <Tab onClick={() => onClick('')}>Current Book</Tab>
          <Tab onClick={() => onClick('progress')}>Progress</Tab>
          <Tab onClick={() => onClick('community')}>Community</Tab>
          <Tab onClick={() => onClick('poll')}>Poll</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CurrentlyReading />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <AddEntry />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
export default LeftContent;
