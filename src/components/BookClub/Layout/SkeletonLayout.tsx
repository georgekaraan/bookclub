import Page from '@/components/Layout/Page';
import { SkeletonText } from '@chakra-ui/react';
import React from 'react';

const SkeletonLayout: React.FC = () => {
  return (
    <Page>
      <SkeletonText mx="auto" noOfLines={30} w="100%" />
      <SkeletonText mx="auto" noOfLines={30} w="100%" />
    </Page>
  );
};
export default SkeletonLayout;
