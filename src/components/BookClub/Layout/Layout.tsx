import { BookClub } from '@/atoms/bookClubsAtom';
import Page from '@/components/Layout/Page';
import React from 'react';
import Header from '../Header';
import LeftContent from '../LeftContent/LeftContent';
import RightContent from '../RightContent/RightContent';

type LayoutProps = {
  bookClubData: BookClub;
  tab: number;
};

const Layout: React.FC<LayoutProps> = ({ bookClubData, tab }) => {
  return (
    <>
      <Header bcData={bookClubData} />
      <Page>
        <>
          <LeftContent tab={tab} bcData={bookClubData} />
        </>
        <>
          <RightContent />
        </>
      </Page>
    </>
  );
};
export default Layout;
