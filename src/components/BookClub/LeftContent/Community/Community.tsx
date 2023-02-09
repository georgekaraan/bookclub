import { BookClub } from '@/atoms/bookClubsAtom';
import { auth } from '@/firebase/clientApp';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AddEntry from './AddEntry/AddEntry';
import Entries from './Entries/Entries';

type CommunityProps = {
  bcData: BookClub;
};

const Community: React.FC<CommunityProps> = ({ bcData }) => {
  const [user] = useAuthState(auth);

  return (
    <>
      <AddEntry user={user} />
      <Entries bcData={bcData} />
    </>
  );
};
export default Community;
