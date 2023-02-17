import { Box, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';
import React from 'react';

const EntriesLoader: React.FC = () => {
  return (
    <Stack spacing={4}>
      <Box p="12px 12px" bg="white" boxShadow="md">
        <SkeletonText mt={4} w="30%" noOfLines={1} />
        <SkeletonText mt={4} noOfLines={4} spacing="4" />
      </Box>
    </Stack>
  );
};
export default EntriesLoader;
