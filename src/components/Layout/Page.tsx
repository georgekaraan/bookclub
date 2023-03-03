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
      <Flex w={'95%'} justify="space-between" maxW={'1500px'}>
        <Flex
          direction="column"
          w={{ base: '100%', lg: '75%' }}
          mr={{ base: 0, lg: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
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
