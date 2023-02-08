import { authModalState } from '@/atoms/authModalAtom';
import { BcSnippet, BookClub, bookClubState } from '@/atoms/bookClubsAtom';
import { auth, firestore } from '@/firebase/clientApp';
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsPatchPlus } from 'react-icons/bs';
import { useRecoilState, useSetRecoilState } from 'recoil';

const useBookClubData = () => {
  const [user] = useAuthState(auth);
  const [bcStateValue, setBcStateValue] = useRecoilState(bookClubState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuthModalState = useSetRecoilState(authModalState);

  const onJoinorLeaveBookClub = (bcData: BookClub, isMember: boolean) => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    if (isMember) {
      leaveBookClub(bcData.id);
      return -1;
    }
    joinBookClub(bcData);
    return 1;
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/bcSnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));

      setBcStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as BcSnippet[]
      }));
    } catch (error: any) {
      console.log('getMySnippets error', error);
      setError(error.message);
    }

    setLoading(false);
  };

  const joinBookClub = async (bcData: BookClub) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      const newSnippet: BcSnippet = {
        bookClubId: bcData.id,
        imageURL: bcData.imageURL || ''
      };

      batch.set(
        doc(firestore, `users/${user?.uid}/bcSnippets`, bcData.id),
        newSnippet
      );
      batch.update(doc(firestore, 'bookclubs', bcData.id), {
        numberOfMembers: increment(1)
      });

      await batch.commit();

      setBcStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet]
      }));
    } catch (error: any) {
      console.log('joinBookClub error', error);
      setError(error.message);
    }
    setLoading(false);
  };
  const leaveBookClub = async (bookClubId: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);

      batch.delete(doc(firestore, `users/${user?.uid}/bcSnippets`, bookClubId));

      batch.update(doc(firestore, 'bookclubs', bookClubId), {
        numberOfMembers: increment(-1)
      });

      await batch.commit();

      setBcStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.bookClubId !== bookClubId
        )
      }));
    } catch (error: any) {
      console.log('leaveBookClub error', error);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  return {
    bcStateValue,
    onJoinorLeaveBookClub,
    loading
  };
};
export default useBookClubData;
