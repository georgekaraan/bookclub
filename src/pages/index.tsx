import { BookClub, bookClubState } from '@/atoms/bookClubsAtom';
import { Entry, entryState } from '@/atoms/entryAtom';
import EntriesLoader from '@/components/BookClub/LeftContent/Community/Entries/EntriesLoader';
import EntryItem from '@/components/BookClub/LeftContent/Community/Entries/EntryItem';
import NumBooksRecommendation from '@/components/Home/Recommendations/NumBooksRecommendation';
import NumMembersRecommendation from '@/components/Home/Recommendations/NumMembersRecommendation';
import Visitor from '@/components/Home/Visitor/Visitor';
import { auth, firestore } from '@/firebase/clientApp';
import useBookClubData from '@/hooks/useBookClubData';
import useEntries from '@/hooks/useEntries';
import { Heading, Stack } from '@chakra-ui/react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import { MouseEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify';

type HomePageProps = {
  bcSnippets: BookClub;
};

const HomePage: React.FC<HomePageProps> = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const { getMySnippets } = useBookClubData();
  const {
    entryStateValue,
    onDeleteEntry,
    onSelectEntry,
    onVote,
    setEntryStateValue
  } = useEntries();

  const mySnippets = useRecoilValue(bookClubState).mySnippets;

  useEffect(() => {
    if (!user && !loadingUser) return;
    getMySnippets();
    getTopPublicEntries();
  }, [user, loadingUser]);

  const getTopPublicEntries = async () => {
    setLoading(true);
    try {
      const entryQuery = query(
        collection(firestore, 'entries'),
        // where("bookClubId", "!=", "george"),
        orderBy('numberOfVotes', 'desc'),
        limit(10)
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
      console.log('getTopPublicEntries error', error.message);
    }
    setLoading(false);
  };

  return (
    <>
      {!user ? <Visitor /> : <NumMembersRecommendation />}
      {/* {user ? (
        loading ? (
          <EntriesLoader />
        ) : (
          <Stack spacing={4}>
            {entryStateValue.entries.map((entry) => (
              <>
                <EntryItem
                  entry={entry}
                  onVote={onVote}
                  onDelete={onDeleteEntry}
                  onSelect={onSelectEntry}
                  key={entry.id}
                  userVote={
                    entryStateValue.entryVotes &&
                    entryStateValue.entryVotes.find(
                      (item) => item.entryId === entry.id
                    )?.voteValue
                  }
                  userIsCreator={user?.uid === entry.creatorId}
                  scrollToComments={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </>
            ))}
          </Stack>
        )
      ) : null} */}
    </>
  );
};

export default HomePage;
