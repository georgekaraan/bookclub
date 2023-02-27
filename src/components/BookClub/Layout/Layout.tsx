import { BookClub, bookClubState } from '@/atoms/bookClubsAtom';
import Page from '@/components/Layout/Page';
import { auth } from '@/firebase/clientApp';
import useBookClubData from '@/hooks/useBookClubData';
import { Grid, GridItem, Skeleton, SkeletonText } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import Header from '../Header';
import LeftContent from '../LeftContent/LeftContent';
import NotLoggedIn from '../NotLoggedIn';
import NotMember from '../NotMember';
import RightContent from '../RightContent/RightContent';
import SkeletonLayout from './SkeletonLayout';

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
  }, [bookClubData]);

  // if (loadingAuth && loading)
  //   return (
  //     <>
  //       <Header bcData={bookClubData} />
  //       <Page>
  //         <SkeletonText mx="auto" noOfLines={30} w="100%" />
  //         <SkeletonText mx="auto" noOfLines={30} w="100%" />
  //       </Page>
  //     </>
  //   );

  if (bookClubData.privacyType == 'private' && !user)
    return (
      <>
        <Header bcData={bookClubData} />{' '}
        {loadingAuth ? <SkeletonLayout /> : <NotLoggedIn />}
      </>
    );

  if (bookClubData.privacyType == 'private' && !isMember)
    return (
      <>
        <Header bcData={bookClubData} />
        {loading ? <SkeletonLayout /> : <NotMember />}
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
