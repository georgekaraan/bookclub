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
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';
import { auth } from '../../../firebase/clientApp';
import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);

  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false
    }));
  };

  useEffect(() => {
    if (user) handleClose();
  }, [user]);

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
      >
        <ModalOverlay />
        <ModalContent borderRadius="0%">
          <ModalHeader textAlign={'center'}>
            {modalState.view === 'login' && 'Login'}
            {modalState.view === 'signup' && 'Sign Up'}{' '}
            {modalState.view === 'resetPassword' && 'Reset Password'}
          </ModalHeader>
          <ModalCloseButton />
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
              ) : (
                <ResetPassword toggleView={toggleView} />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
