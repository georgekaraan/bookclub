import { Entry, entryState } from '@/atoms/entryAtom';
import { firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';

const useEntries = () => {
  const [entryStateValue, setEntryStateValue] = useRecoilState(entryState);

  const onVote = async () => {};

  const onSelectEntry = async () => {};
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

  return {
    entryStateValue,
    setEntryStateValue,
    onVote,
    onSelectEntry,
    onDeleteEntry
  };
};
export default useEntries;
