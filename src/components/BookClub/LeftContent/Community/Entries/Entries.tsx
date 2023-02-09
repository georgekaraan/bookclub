import { BookClub } from '@/atoms/bookClubsAtom';
import { Entry } from '@/atoms/entryAtom';
import { firestore } from '@/firebase/clientApp';
import useEntries from '@/hooks/useEntries';
import { Flex } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

type EntriesProps = {
  bcData: BookClub;
};

const Entries: React.FC<EntriesProps> = ({ bcData }) => {
  const [loading, setLoading] = useState(false);
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

  return <Flex>Hellp</Flex>;
};
export default Entries;
