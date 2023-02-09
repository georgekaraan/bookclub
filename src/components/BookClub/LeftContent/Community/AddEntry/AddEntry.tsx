import { Flex } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React, { useState } from 'react';
import AddEntryFull from './AddEntryFull';
import AddEntryLink from './AddEntryLink';

type AddEntryProps = {
  user?: User | null;
};

const AddEntry: React.FC<AddEntryProps> = ({ user }) => {
  const [view, setView] = useState('link');

  return (
    <>
      <Flex justify={'center'}>
        {view == 'link' && <AddEntryLink setView={setView} />}
        {user && view == 'full' && (
          <AddEntryFull setView={setView} user={user} />
        )}
      </Flex>
    </>
  );
};
export default AddEntry;
