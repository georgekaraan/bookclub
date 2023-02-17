import { BookClub } from '@/atoms/bookClubsAtom';
import { Entry } from '@/atoms/entryAtom';
import { auth, firestore } from '@/firebase/clientApp';
import useEntries from '@/hooks/useEntries';
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddEntry from './AddEntry/AddEntry';
import Entries from './Entries/Entries';

type CommunityProps = {
  bcData: BookClub;
};

const Community: React.FC<CommunityProps> = ({ bcData }) => {
  const [user] = useAuthState(auth);
  const { entryStateValue, setEntryStateValue } = useEntries();

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
      <AddEntry getEntries={getEntries} user={user} />

      <Entries bcData={bcData} />
    </>
  );
};
export default Community;
