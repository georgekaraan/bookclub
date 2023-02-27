import { auth, firestore } from '@/firebase/clientApp';

import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const useUser = () => {
  const [user, loading] = useAuthState(auth);
  const [userName, setUsername] = useState('');

  const getUserName = async () => {
    const userDocRef = doc(firestore, 'users', user?.uid!);
    const userDoc = await getDoc(userDocRef);
    const userData = userDoc.data();
    if (userData?.userName) {
      setUsername(userData?.userName);
    }
  };

  useEffect(() => {
    getUserName();
  }, [user]);

  return { userName };
};
export default useUser;
