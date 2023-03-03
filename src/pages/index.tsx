import { authModalState } from '@/atoms/authModalAtom';
import { BookClub, bookClubState } from '@/atoms/bookClubsAtom';
import EntriesLoader from '@/components/BookClub/LeftContent/Community/Entries/EntriesLoader';
import Recommendations from '@/components/Home/Recommendations/Recommendations';
import Visitor from '@/components/Home/Visitor/Visitor';
import { auth } from '@/firebase/clientApp';
import useBookClubData from '@/hooks/useBookClubData';
import useEntries from '@/hooks/useEntries';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type HomePageProps = {
  bcSnippets: BookClub;
};

const HomePage: React.FC<HomePageProps> = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const setAuthModalState = useSetRecoilState(authModalState);

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
    // getTopPublicEntries();
  }, [user, loadingUser]);

  useEffect(() => {
    if (user && !user.emailVerified) {
      setAuthModalState((prev) => ({
        ...prev,
        open: true,
        view: 'verifyEmail'
      }));
    }
  }, [user, user?.emailVerified]);

  //   useEffect(() => {
  //     setLoading(true)
  // if(!loadingUser)

  //   },[])

  // const getTopPublicEntries = async () => {
  //   setLoading(true);
  //   try {
  //     const entryQuery = query(
  //       collection(firestore, 'entries'),
  //       // where("bookClubId", "!=", "george"),
  //       orderBy('numberOfVotes', 'desc'),
  //       limit(10)
  //     );
  //     const entryDocs = await getDocs(entryQuery);
  //     const entries = entryDocs.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data()
  //     }));

  //     setEntryStateValue((prev) => ({
  //       ...prev,
  //       entries: entries as Entry[]
  //     }));
  //   } catch (error: any) {
  //     console.log('getTopPublicEntries error', error.message);
  //   }
  //   setLoading(false);
  // };

  return (
    <>
      {!user && !loadingUser ? (
        <Visitor />
      ) : loadingUser ? (
        <EntriesLoader />
      ) : (
        <>
          <Flex justify="center" gap="10" my={10}>
            <Recommendations filter={'numberOfBooks'} />
            <Recommendations filter={'numberOfMembers'} />
          </Flex>
        </>
      )}
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
