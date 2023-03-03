import { authModalState } from '@/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    if (user) {
      setAuthModalState((prev) => ({
        ...prev,
        view: 'firstTime'
      }));
    }
    if (loading) {
      setAuthModalState((prev) => ({
        ...prev,
        view: 'loading'
      }));
    }
  }, [user, loading]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input
          name="email"
          placeholder="email"
          type={'email'}
          mb={2}
          onChange={onChange}
          fontSize="10pt"
          required
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'gray.50',
            border: '1px solid',
            borderColor: 'gray.200'
          }}
          _focus={{
            outline: 'none',
            bg: 'gray.50',
            border: '1px solid',
            borderColor: 'gray.200'
          }}
        />
        <Input
          name="password"
          placeholder="password"
          type="password"
          onChange={onChange}
          fontSize="10pt"
          required
          _placeholder={{ color: 'gray.500' }}
          _hover={{
            bg: 'gray.50',
            border: '1px solid',
            borderColor: 'gray.200'
          }}
          _focus={{
            outline: 'none',
            bg: 'gray.50',
            border: '1px solid',
            borderColor: 'gray.200'
          }}
        />
        {error && (
          <Text textAlign={'center'} color="red" fontSize={'10pt'}>
            {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
          </Text>
        )}
        <Button
          w="100%"
          height="36px"
          variant={'light'}
          my={2}
          type="submit"
          isLoading={loading}
        >
          Login
        </Button>
        <Flex justifyContent={'center'} mb={2}>
          <Text fontSize="9pt" mr="1">
            Forgot your password?
          </Text>
          <Text
            fontSize={'9pt'}
            color="blue.500"
            cursor={'pointer'}
            fontWeight="extrabold"
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, view: 'resetPassword' }))
            }
          >
            Reset now!
          </Text>
        </Flex>
        <Flex fontSize={'9pt'} justifyContent="center">
          <Text mr={1}>New here?</Text>
          <Text
            color={'blue.500'}
            fontWeight="700"
            cursor={'pointer'}
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, view: 'signup' }))
            }
          >
            SIGN UP
          </Text>
        </Flex>
      </form>
    </>
  );
};
export default Login;
