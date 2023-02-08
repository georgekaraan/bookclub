import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import React from 'react';
import CurrentlyReading from '../LeftContent/CurrentlyReading';
import About from './About';
import Members from './Members';

type RightContentProps = {};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <Flex
      justify={'center'}
      align="center"
      border={'1px solid'}
      borderColor={'gray.300'}
    >
      <Box w={'100%'}>
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
              <About />
            </TabPanel>
            <TabPanel>
              <Members />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
};
export default RightContent;
