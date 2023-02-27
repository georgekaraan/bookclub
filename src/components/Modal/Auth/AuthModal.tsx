import { authModalState } from '@/atoms/authModalAtom';
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { auth, firestore } from '../../../firebase/clientApp';
import ResetPassword from './ResetPassword';
import { useRouter } from 'next/router';
import FirstTime from './FirstTime';
import { doc, getDoc } from 'firebase/firestore';

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false
    }));
  };
  const handleFirstTime = () => {
    setModalState((prev) => ({
      ...prev,
      view: 'firstTime'
    }));
  };

  const router = useRouter();

  const checkFirstLogin = async () => {
    const userDocRef = doc(firestore, 'users', user?.uid!);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if ((userData && userData.firstLogin) || !userData.userName) {
        handleFirstTime();
      } else {
        handleClose();
      }
    }
  };

  useEffect(() => {
    if (user) {
      checkFirstLogin();
      // auth.currentUser?.getIdTokenResult().then((idTokenResult) => {
      //   console.log(idTokenResult);
      //   if (idTokenResult.claims.firstLogin) {
      //     handleFirstTime();
      //   } else {
      //     handleClose();
      //   }
      // });
    }
  }, [user, loading]);

  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view
    });
  };

  return (
    <>
      <Modal
        isOpen={modalState.open}
        onClose={handleClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="0%">
          <ModalHeader textAlign={'center'}>
            {modalState.view === 'login' && 'Login'}
            {modalState.view === 'signup' && 'Sign Up'}{' '}
            {modalState.view === 'resetPassword' && 'Reset Password'}
            {modalState.view === 'firstTime' && 'Welcome to the BookClub!'}
          </ModalHeader>
          {!(modalState.view === 'firstTime') && <ModalCloseButton />}
          <ModalBody
            display={'flex'}
            flexDirection="column"
            alignItems={'center'}
            justifyContent="center"
            pb={6}
          >
            <Flex
              w={'70%'}
              direction="column"
              align={'center'}
              justify="center"
            >
              {modalState.view == 'login' || modalState.view == 'signup' ? (
                <>
                  <OAuthButtons />
                  <Text fontWeight={700}>OR</Text>
                  <AuthInputs />
                </>
              ) : modalState.view == 'resetPassword' ? (
                <ResetPassword toggleView={toggleView} />
              ) : (
                <FirstTime />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
