import { authModalState } from '@/atoms/authModalAtom';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { sendEmailVerification } from 'firebase/auth';

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitting');

    if (error) setError('');
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    const status = await createUserWithEmailAndPassword(
      signUpForm.email,
      signUpForm.password
    );
    status?.user && sendEmailVerification(status?.user!);
    setAuthModalState((prev) => ({
      ...prev,
      view: 'firstTime'
    }));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log([event.target.name], event.target.value);

    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  useEffect(() => {
    if (loading) {
      setAuthModalState((prev) => ({
        ...prev,
        view: 'loading'
      }));
    }
  }, [loading]);

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
          mb={2}
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
        <Input
          name="confirmPassword"
          placeholder="confirm password"
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

        <Text textAlign={'center'} fontSize="10pt" color={'red'}>
          {error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>

        <Button
          w="100%"
          height="36px"
          variant={'light'}
          my={2}
          type="submit"
          isLoading={loading}
        >
          Sign Up
        </Button>
        <Flex fontSize={'9pt'} justifyContent="center">
          <Text mr={1}>Already a reader?</Text>
          <Text
            color={'blue.500'}
            fontWeight="700"
            cursor={'pointer'}
            onClick={() =>
              setAuthModalState((prev) => ({ ...prev, view: 'login' }))
            }
          >
            SIGN IN
          </Text>
        </Flex>
      </form>
    </>
  );
};
export default SignUp;
