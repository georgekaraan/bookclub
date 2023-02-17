import { BookClub, bookClubState } from '@/atoms/bookClubsAtom';
import Page from '@/components/Layout/Page';
import { auth } from '@/firebase/clientApp';
import useBookClubData from '@/hooks/useBookClubData';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import Header from '../Header';
import LeftContent from '../LeftContent/LeftContent';
import NotLoggedIn from '../NotLoggedIn';
import NotMember from '../NotMember';
import RightContent from '../RightContent/RightContent';

type LayoutProps = {
  bookClubData: BookClub;
  tab: number;
};

const Layout: React.FC<LayoutProps> = ({ bookClubData, tab }) => {
  const setBookclubStateValue = useSetRecoilState(bookClubState);
  const [user, loadingAuth, error] = useAuthState(auth);

  const { bcStateValue, onJoinorLeaveBookClub, loading } = useBookClubData();
  const isMember = !!bcStateValue.mySnippets.find(
    (item) => item.bookClubId === bookClubData.id
  );

  useEffect(() => {
    setBookclubStateValue((prev) => ({
      ...prev,
      currentBC: bookClubData
    }));
  }, []);

  if (bookClubData.privacyType == 'private' && !user)
    return (
      <>
        <Header bcData={bookClubData} /> <NotLoggedIn />
      </>
    );

  if (bookClubData.privacyType == 'private' && !isMember)
    return (
      <>
        <Header bcData={bookClubData} /> <NotMember />
      </>
    );

  return (
    <>
      <Header bcData={bookClubData} />

      <Page>
        <>
          <LeftContent tab={tab} bcData={bookClubData} />
        </>
        <>
          <RightContent bcData={bookClubData} />
        </>
      </Page>
    </>
  );
};
export default Layout;
