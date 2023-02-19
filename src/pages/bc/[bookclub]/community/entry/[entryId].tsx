import { BookClub } from '@/atoms/bookClubsAtom';
import { Entry, entryState } from '@/atoms/entryAtom';
import Layout from '@/components/BookClub/Layout/Layout';
import SingleEntry from '@/components/BookClub/LeftContent/Community/Entry/SingleEntry';
import NotFound from '@/components/BookClub/NotFound';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import router from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';

type EntryPageProps = {
  bookClubData: BookClub;
};

const EntryPage: React.FC<EntryPageProps> = ({ bookClubData }) => {
  const [entryStateValue, setEntryStateValue] = useRecoilState(entryState);

  const fetchPost = async (entryId: string) => {
    try {
      const postDocRef = doc(firestore, 'entries', `${entryId}`);
      const postDoc = await getDoc(postDocRef);

      setEntryStateValue((prev) => ({
        ...prev,
        selectedEntry: { id: postDoc.id, ...postDoc.data() } as Entry
      }));
    } catch (error) {
      console.log('fetchPost error', error);
    }
  };

  useEffect(() => {
    const { entryId } = router.query;
    if (entryId && !entryStateValue.selectedEntry) {
      fetchPost(entryId as string);
    }
  }, [entryStateValue.selectedEntry]);

  if (!bookClubData) {
    return <NotFound />;
  }
  return (
    <>
      <Layout bookClubData={bookClubData} tab={2} />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const bcDocRef = doc(
      firestore,
      'bookclubs',
      context.query.bookclub as string
    );
    const bcDoc = await getDoc(bcDocRef);

    return {
      props: {
        bookClubData: bcDoc.exists()
          ? JSON.parse(safeJsonStringify({ id: bcDoc.id, ...bcDoc.data() }))
          : ''
      }
    };
  } catch (error) {
    // error page
    console.log('getServerSideProps error', error);
  }
}
export default EntryPage;
