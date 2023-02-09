import { BookClub } from '@/atoms/bookClubsAtom';
import { Entry } from '@/atoms/entryAtom';
import { auth, firestore } from '@/firebase/clientApp';
import useEntries from '@/hooks/useEntries';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import EntryItem from './EntryItem';

type EntriesProps = {
  bcData: BookClub;
};

const Entries: React.FC<EntriesProps> = ({ bcData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    entryStateValue,
    setEntryStateValue,
    onDeleteEntry,
    onVote,
    onSelectEntry
  } = useEntries();

  const getEntries = async () => {
    try {
      const entryQuery = query(
        collection(firestore, 'entries'),
        where('bookClubId', '==', bcData.id),
        orderBy('createdAt', 'desc')
      );

      const entryDocs = await getDocs(entryQuery);
      const entries = entryDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setEntryStateValue((prev) => ({
        ...prev,
        entries: entries as Entry[]
      }));

      console.log(entryStateValue);
    } catch (error: any) {
      console.log('getEntries error', error.message);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <>
      <Stack>
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
                // userVote={undefined}
              />
            ))}
        </>
      </Stack>
    </>
  );
};
export default Entries;
