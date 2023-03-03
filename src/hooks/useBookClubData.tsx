import { authModalState } from '@/atoms/authModalAtom';
import { BcSnippet, BookClub, bookClubState } from '@/atoms/bookClubsAtom';
import { Member } from '@/components/BookClub/RightContent/RightContent';
import { auth, firestore } from '@/firebase/clientApp';
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  where,
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

  const [members, setMembers] = useState<Member[]>([]);

  const getMembers = async (bcData: BookClub) => {
    const bcSnippetsRef = collectionGroup(firestore, 'bcSnippets');
    const q = query(bcSnippetsRef, where('bookClubId', '==', bcData.id));

    // // Fetch the documents that match the query
    const querySnapshot = await getDocs(q);

    const userIds = querySnapshot.docs.map((doc) => doc.ref.parent.parent?.id);

    const memberUsers = await Promise.all(
      userIds.map(async (userId) => {
        if (!userId) return null;
        const userDoc = doc(firestore, 'users', userId);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();
        if (!userData) return;

        const bcSnippetsDoc = doc(
          firestore,
          `users/${userId}/bcSnippets/`,
          bcData.id
        );
        const bcSnippetsSnapshot = await getDoc(bcSnippetsDoc);
        const bcSnippetsData = bcSnippetsSnapshot.data();

        return {
          userId,
          displayName: userData?.userName,
          image: userData?.photoURL,
          isModerator: bcSnippetsData?.isModerator || false
        };
      })
    );

    const filteredMembers = memberUsers.filter(
      (member) => member?.userId !== null
    ) as Member[];

    setMembers(filteredMembers);

    return filteredMembers;
  };

  const onJoinorLeaveBookClub = (bcData: BookClub, isMember: boolean) => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    if (isMember) {
      leaveBookClub(bcData.id);
      setMembers((prev) => ({
        ...prev,
        members: members.filter((member) => member.userId != user.uid)
      }));
      return -1;
    }
    joinBookClub(bcData);
    // const newMember: Member = {
    //   displayName: ,
    //   image: ,
    //   isModerator: ,
    //   userId:
    // }

    // setMembers((prev) => ([...prev, newMember]))
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

      console.log(snippets);
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
    if (!user) {
      setBcStateValue((prev) => ({
        ...prev,
        mySnippets: []
      }));
      return;
    }
    getMySnippets();
  }, [user]);

  return {
    bcStateValue,
    onJoinorLeaveBookClub,
    loading,
    getMembers,
    members,
    getMySnippets
  };
};
export default useBookClubData;
