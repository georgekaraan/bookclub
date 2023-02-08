import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex
} from '@chakra-ui/react';
import React from 'react';

type PageProps = {
  children: any;
};

const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <Flex justify="center" padding="10px 0px">
      <Flex
        w={'95%'}
        justify="space-between"
        maxW={'1500px'}
        // border="1px solid green"
      >
        {/* Main Content */}
        <Flex
          direction="column"
          w={{ base: '100%', lg: '75%' }}
          mr={{ base: 0, lg: 6 }}
          // border="2px solid green"
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        {/* Members */}
        <Flex
          direction="column"
          display={{ base: 'none', lg: 'flex' }}
          w={{ lg: '25%' }}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Page;
