import { auth } from '@/firebase/clientApp';
import useEntries from '@/hooks/useEntries';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import EntryItem from '../Entries/EntryItem';

type SingleEntryProps = {};

const SingleEntry: React.FC<SingleEntryProps> = () => {
  const { entryStateValue, onDeleteEntry, onVote, setEntryStateValue } =
    useEntries();

  const [user] = useAuthState(auth);

  return (
    <>
      {entryStateValue.selectedEntry && (
        <EntryItem
          entry={entryStateValue.selectedEntry}
          onVote={onVote}
          onDelete={onDeleteEntry}
          userVote={
            entryStateValue.entryVotes.find(
              (entry) => entry.id === entryStateValue.selectedEntry?.id
            )?.voteValue
          }
          userIsCreator={user?.uid == entryStateValue.selectedEntry?.creatorId}
        />
      )}
    </>
  );
};
export default SingleEntry;
