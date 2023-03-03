import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { BookClub } from '@/atoms/bookClubsAtom';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from '@/components/BookClub/NotFound';
import Layout from '@/components/BookClub/Layout/Layout';

type BookClubCommunityProps = {
  bookClubData: BookClub;
};

const BookClubCommunityPage: React.FC<BookClubCommunityProps> = ({
  bookClubData
}) => {
  if (!bookClubData) {
    return <NotFound />;
  }
  return (
    <Layout
      bookClubData={bookClubData}
      tab={bookClubData.currentBookId ? 2 : 1}
    />
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

export default BookClubCommunityPage;
