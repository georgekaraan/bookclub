import { authModalState } from '@/atoms/authModalAtom';
import { bookClubState } from '@/atoms/bookClubsAtom';
import { Entry, entryState, EntryVote } from '@/atoms/entryAtom';
import { auth, firestore, storage } from '@/firebase/clientApp';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  writeBatch
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const useEntries = () => {
  const [entryStateValue, setEntryStateValue] = useRecoilState(entryState);
  const [user] = useAuthState(auth);
  const currentBookClub = useRecoilValue(bookClubState).currentBC;
  const setAuthModalState = useSetRecoilState(authModalState);

  const router = useRouter();

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    entry: Entry,
    bookClubId: string,
    vote: number
  ) => {
    event.stopPropagation();

    if (!user?.uid) return setAuthModalState({ open: true, view: 'login' });

    try {
      const { numberOfVotes } = entry;
      const existingVote = entryStateValue.entryVotes.find(
        (vote) => vote.entryId === entry.id
      );

      const batch = writeBatch(firestore);
      const updatedEntry = { ...entry };
      const updatedEntries = [...entryStateValue.entries];
      let updatedEntryVotes = [...entryStateValue.entryVotes];
      let voteChange = vote;

      if (!existingVote) {
        const entryVoteRef = doc(
          collection(firestore, 'users', `${user?.uid}/entryVotes`)
        );

        const newVote: EntryVote = {
          id: entryVoteRef.id,
          entryId: entry.id!,
          bookClubId,
          voteValue: vote
        };

        batch.set(entryVoteRef, newVote);

        updatedEntry.numberOfVotes = numberOfVotes + vote;
        updatedEntryVotes = [...updatedEntryVotes, newVote];
      } else {
        const entryVoteRef = doc(
          firestore,
          'users',
          `${user?.uid}/entryVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          updatedEntry.numberOfVotes = numberOfVotes - vote;
          updatedEntryVotes = updatedEntryVotes.filter(
            (vote) => vote.id != existingVote.id
          );

          batch.delete(entryVoteRef);

          voteChange *= -1;
        } else {
          updatedEntry.numberOfVotes = numberOfVotes + 2 * vote;
          const voteIdx = entryStateValue.entryVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );
          if (voteIdx !== -1) {
            updatedEntryVotes[voteIdx] = {
              ...existingVote,
              voteValue: vote
            };
          }
          batch.update(entryVoteRef, { voteValue: vote });

          voteChange = 2 * vote;
        }
      }

      const entryRef = doc(firestore, 'entries', entry.id!);
      batch.update(entryRef, { numberOfVotes: numberOfVotes + voteChange });

      await batch.commit();

      const entryIdx = entryStateValue.entries.findIndex(
        (item) => item.id === entry.id
      );
      updatedEntries[entryIdx] = updatedEntry;

      setEntryStateValue((prev) => ({
        ...prev,
        entries: updatedEntries,
        entryVotes: updatedEntryVotes
      }));

      if (entryStateValue.selectedEntry) {
        setEntryStateValue((prev) => ({
          ...prev,
          selectedEntry: updatedEntry
        }));
      }
    } catch (error) {
      console.log('onVote error', error);
    }
  };

  const onSelectEntry = async (entry: Entry) => {
    setEntryStateValue((prev) => ({
      ...prev,
      selectedEntry: entry
    }));

    router.push(`/bc/${entry.bookClubId}/community/entry/${entry.id}`);
  };

  const onDeleteEntry = async (entry: Entry): Promise<boolean> => {
    try {
      //delete image from storage if there is one
      if (entry.imageURL) {
        const imageRef = ref(storage, `entries/${entry.id}/image`);
        await deleteObject(imageRef);
      }

      // delete entry itself

      const entryDocRef = doc(firestore, 'entries', entry.id!);
      await deleteDoc(entryDocRef);

      setEntryStateValue((prev) => ({
        ...prev,
        entries: prev.entries.filter((item) => item.id != entry.id)
      }));

      return true;
    } catch (error) {}

    return false;
  };

  const getBookclubEntryVotes = async (bookClubId: string) => {
    const entryVotesQuery = query(
      collection(firestore, 'users', `${user?.uid}/entryVotes`),
      where('bookClubId', '==', bookClubId)
    );

    const entryVoteDocs = await getDocs(entryVotesQuery);

    const entryVotes = entryVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setEntryStateValue((prev) => ({
      ...prev,
      entryVotes: entryVotes as EntryVote[]
    }));
  };

  useEffect(() => {
    if (!user || !currentBookClub?.id) return;
    getBookclubEntryVotes(currentBookClub?.id);
  }, [user, currentBookClub]);

  useEffect(() => {
    if (!user) {
      setEntryStateValue((prev) => ({
        ...prev,
        entryVotes: []
      }));
    }
  }, [user]);

  return {
    entryStateValue,
    setEntryStateValue,
    onVote,
    onSelectEntry,
    onDeleteEntry
  };
};
export default useEntries;
