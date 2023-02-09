import { entryState } from '@/atoms/entryAtom';
import React from 'react';
import { useRecoilState } from 'recoil';

const useEntries = () => {
  const [entryStateValue, setEntryStateValue] = useRecoilState(entryState);

  const onVote = async () => {};
  const onSelectEntry = async () => {};
  const onDeleteEntry = async () => {};

  return {
    entryStateValue,
    setEntryStateValue,
    onVote,
    onSelectEntry,
    onDeleteEntry
  };
};
export default useEntries;
