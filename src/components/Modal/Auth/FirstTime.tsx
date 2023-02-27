import React, { useState } from 'react';
import {
  Button,
  Flex,
  Icon,
  Input,
  Text,
  Image,
  Spinner
} from '@chakra-ui/react';
import {
  useAuthState,
  useSendPasswordResetEmail
} from 'react-firebase-hooks/auth';
import { BsDot, BsReddit } from 'react-icons/bs';
import { authModalState, ModalView } from '../../../atoms/authModalAtom';
import { auth, firestore } from '../../../firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';

type FirstTimeProps = {};

const FirstTime: React.FC<FirstTimeProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [userName, setUserName] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [user] = useAuthState(auth);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const userDocRef = doc(firestore, 'users', user?.uid!);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const userNameQuery = query(
        collection(firestore, 'users'),
        where(`userName`, '==', userName)
      );

      const userNameExists = await getDocs(userNameQuery);

      if (!userNameExists.empty) {
        setIsLoading(false);
        throw new Error(
          'This username already exists. Please choose another one.'
        );
      }
      await updateDoc(userDocRef, {
        firstLogin: false,
        userName
      });

      setSuccess(true);
      setAuthModalState((prev) => ({
        ...prev,
        open: false
      }));
    } catch (error: any) {
      console.log('onFirstTimeUserNameChange error', error);
      setError(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <Flex direction="column" alignItems="center" width="100%">
      {success ? (
        <Text mb={4}>Your username has been updated successfully!</Text>
      ) : (
        <>
          <Text fontSize="sm" textAlign="center" mb={2}>
            Enter a username:
          </Text>
          <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Input
              required
              name="userName"
              placeholder="user name"
              type="text"
              mb={2}
              onChange={(event) => setUserName(event.target.value)}
              fontSize="10pt"
              _placeholder={{ color: 'gray.500' }}
              _hover={{
                bg: 'white',
                border: '1px solid',
                borderColor: 'blue.500'
              }}
              _focus={{
                outline: 'none',
                bg: 'white',
                border: '1px solid',
                borderColor: 'blue.500'
              }}
              bg="gray.50"
            />
            <Text textAlign="center" fontSize="10pt" color="red">
              {error}
            </Text>
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </form>
        </>
      )}
    </Flex>
  );
};
export default FirstTime;
