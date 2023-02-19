import { BookClub } from '@/atoms/bookClubsAtom';
import { Entry } from '@/atoms/entryAtom';
import { auth, firestore } from '@/firebase/clientApp';
import useEntries from '@/hooks/useEntries';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import EntriesLoader from './EntriesLoader';
import EntryItem from './EntryItem';

type EntriesProps = {
  bcData: BookClub;
};

const Entries: React.FC<EntriesProps> = ({ bcData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const { entryStateValue, onDeleteEntry, onVote, onSelectEntry } =
    useEntries();

  return (
    <>
      {loading ? (
        <EntriesLoader />
      ) : (
        <Stack
          // w={{ base: '100%', md: '85%' }}

          mx="auto"
          my={4}
          spacing={4}
        >
          <>
            {entryStateValue.entries &&
              entryStateValue.entries.map((entry: Entry, index) => (
                <EntryItem
                  key={entry.id}
                  entry={entry}
                  onDelete={onDeleteEntry}
                  onVote={onVote}
                  onSelect={onSelectEntry}
                  userIsCreator={user?.uid === entry.creatorId}
                  userVote={
                    entryStateValue.entryVotes &&
                    entryStateValue.entryVotes.find(
                      (item) => item.entryId === entry.id
                    )?.voteValue
                  }
                />
              ))}
          </>
        </Stack>
      )}
    </>
  );
};
export default Entries;
