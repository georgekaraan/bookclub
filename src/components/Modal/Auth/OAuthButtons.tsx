import { authModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSignInWithGithub } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { auth } from '../../../firebase/clientApp';

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, ghUser, ghLoading, ghError] =
    useSignInWithGithub(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  useEffect(() => {
    if (loading) {
      setAuthModalState((prev) => ({
        ...prev,
        view: 'loading'
      }));
    }
  }, [loading]);

  return (
    <Flex direction={'column'} mb={4} w="100%">
      <Button
        height="34px"
        border="1px solid"
        borderColor="gray.400"
        mb={2}
        onClick={() => signInWithGoogle()}
        isLoading={loading}
      >
        <Image mr={1} src="/images/google_logo.png" height={'20px'} />
        Continue with Google
      </Button>
      {error && <Text>{error.message}</Text>}
      <Button
        height="34px"
        border="1px solid"
        borderColor="gray.400"
        mb={2}
        onClick={() => signInWithGithub()}
        isLoading={ghLoading}
      >
        <Image mr={1} src="/images/github_logo.png" height={'20px'} />
        Continue with GitHub
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
