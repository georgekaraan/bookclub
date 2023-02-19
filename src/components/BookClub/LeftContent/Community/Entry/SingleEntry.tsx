import { auth } from '@/firebase/clientApp';
import useEntries from '@/hooks/useEntries';
import { User } from 'firebase/auth';
import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Comments from '../Entries/Comments/Comments';
import EntryItem from '../Entries/EntryItem';

type SingleEntryProps = {};

const SingleEntry: React.FC<SingleEntryProps> = () => {
  const { entryStateValue, onDeleteEntry, onVote, setEntryStateValue } =
    useEntries();

  const [user] = useAuthState(auth);

  const commentsRef = useRef<HTMLDivElement>(null);

  const scrollToComments = () => {
    commentsRef?.current!.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {entryStateValue.selectedEntry && (
        <>
          <EntryItem
            entry={entryStateValue.selectedEntry}
            onVote={onVote}
            onDelete={onDeleteEntry}
            userVote={
              entryStateValue.entryVotes.find(
                (entry) => entry.id === entryStateValue.selectedEntry?.id
              )?.voteValue
            }
            userIsCreator={
              user?.uid == entryStateValue.selectedEntry?.creatorId
            }
            scrollToComments={scrollToComments}
          />
          <Comments
            ref={commentsRef}
            user={user as User}
            selectedEntry={entryStateValue.selectedEntry}
            bookClubId={entryStateValue.selectedEntry.bookClubId}
          />
        </>
      )}
    </>
  );
};
export default SingleEntry;
