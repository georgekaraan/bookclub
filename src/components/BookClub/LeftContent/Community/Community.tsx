import { BookClub } from '@/atoms/bookClubsAtom';
import { Entry } from '@/atoms/entryAtom';
import { auth, firestore } from '@/firebase/clientApp';
import useEntries from '@/hooks/useEntries';
import { Flex, Icon, Stack, Text } from '@chakra-ui/react';

import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddEntry from './AddEntry/AddEntry';
import Entries from './Entries/Entries';
import SingleEntry from './Entry/SingleEntry';
import { IoIosArrowBack } from 'react-icons/io';

type CommunityProps = {
  bcData: BookClub;
};

const Community: React.FC<CommunityProps> = ({ bcData }) => {
  const router = useRouter();

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
    } catch (error: any) {
      console.log('getEntries error', error.message);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  if (router.pathname.includes('entry')) {
    return (
      <>
        <Stack>
          <Flex align="center">
            <Icon as={IoIosArrowBack} />
            <Text>Back</Text>
          </Flex>
          <SingleEntry />
        </Stack>
      </>
    );
  }

  return (
    <>
      <AddEntry getEntries={getEntries} user={user} />

      <Entries bcData={bcData} />
    </>
  );
};
export default Community;
