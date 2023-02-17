import { auth } from '@/firebase/clientApp';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const useRequireAuth = (redirectUrl = '/login') => {
  const [user, loading] = useAuthState(auth);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      setIsRedirecting(true);
      router.push(redirectUrl);
    }
  }, [loading, user, redirectUrl]);

  return isRedirecting;
};

export default useRequireAuth;
