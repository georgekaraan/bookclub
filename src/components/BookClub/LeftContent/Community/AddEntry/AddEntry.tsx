import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import AddEntryFull from './AddEntryFull';
import AddEntryLink from './AddEntryLink';

const AddEntry: React.FC = () => {
  const [view, setView] = useState('link');

  return (
    <>
      <Flex justify={'center'}>
        {view == 'link' && <AddEntryLink setView={setView} />}
        {view == 'full' && <AddEntryFull setView={setView} />}
      </Flex>
    </>
  );
};
export default AddEntry;
