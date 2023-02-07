import { auth, firestore } from '@/firebase/clientApp';
import {
  Text,
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Stack,
  Checkbox,
  HStack
} from '@chakra-ui/react';
import {
  collection,
  doc,
  getCountFromServer,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type CreateBookClubProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateBookClub: React.FC<CreateBookClubProps> = ({
  open,
  handleClose
}) => {
  const [bcName, setBcName] = useState('');
  const [bcType, setBcType] = useState('private');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    setError('');
  }, []);

  function bookClubName({ target: { value } }: { target: { value: string } }) {
    setBcName(
      value
        .replace(/[-\s_]+/g, '-')
        .replace(/^-/, '')
        .replace(/[^a-zA-Z0-9àç_èéù-]+/g, '')
        .toLowerCase()
    );
  }

  const onBcTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBcType(event.target.name);
  };

  const handleCreateBookClub = async () => {
    if (error) setError('');

    if (bcName.endsWith('-')) setBcName(bcName.slice(0, -1));

    const format = /[ `!_@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(bcName) || bcName.length < 3) {
      return setError(
        'Name must be between 3–20 characters, and can only contain letters and/or numbers.'
      );
    }

    setLoading(true);

    try {
      const bookClubDocRef = doc(firestore, 'bookclubs', bcName);
      const userBcSnippetsRef = collection(
        firestore,
        `users/${user?.uid}/bcSnippets`
      );

      await runTransaction(firestore, async (transaction) => {
        const bookClubDoc = await transaction.get(bookClubDocRef);
        if (bookClubDoc.exists()) {
          throw new Error(`Sorry, ${bcName} already exists! Pick another.`);
        }

        const snapshot = await getCountFromServer(userBcSnippetsRef);
        if (snapshot.data().count >= 3) {
          throw new Error(
            `Sorry, you have already created 3 book clubs. Your plate is full!`
          );
        }

        transaction.set(bookClubDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          numberOfBooks: 0,
          privacyType: bcType,
          members: [user?.uid]
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/bcSnippets`, bcName),
          {
            bookClubId: bcName,
            isModerator: true
          }
        );
      });
    } catch (error: any) {
      console.log('handleCreateBC', error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <Modal size={'2xl'} isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent borderRadius="0%">
        <ModalHeader
          display={'flex'}
          flexDirection={'column'}
          fontSize="13pt"
          p={3}
        >
          Create a Book Club
        </ModalHeader>
        <ModalCloseButton />
        <Box p={'10px'}>
          <ModalBody display={'flex'} flexDirection="column" p={'10px'}>
            <Text fontWeight={600} fontSize={14}>
              Name
            </Text>
            <Text fontWeight={400} fontSize={12}>
              Book Club name cannot be changed later
            </Text>
            <Input
              placeholder="ladies-who-read"
              type="text"
              onChange={bookClubName}
              value={bcName}
              size="md"
              mt={3}
            ></Input>
            <Text fontSize={'9pt'} color="red" pt={1}>
              {error}
            </Text>

            <Text mt={3} fontWeight={600} fontSize={14}>
              Type
            </Text>
            <Stack spacing={1}>
              <Checkbox
                name="private"
                isChecked={bcType == 'private'}
                onChange={onBcTypeChange}
                colorScheme="gray"
              >
                <HStack align={'baseline'}>
                  <Text fontSize={'11pt'}>Private</Text>
                  <Text fontWeight={400} fontSize={12}>
                    - Restricted access to members only.
                  </Text>
                </HStack>
              </Checkbox>
              <Checkbox
                name="public"
                isChecked={bcType == 'public'}
                onChange={onBcTypeChange}
                colorScheme="gray"
              >
                <HStack align={'baseline'}>
                  <Text fontSize={'11pt'}>Public</Text>
                  <Text fontWeight={400} fontSize={12}>
                    - Open for all readers.
                  </Text>
                </HStack>
              </Checkbox>
            </Stack>
          </ModalBody>
        </Box>

        <ModalFooter bgColor={'gray.300'}>
          <Button mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={handleCreateBookClub}
            isLoading={loading}
            variant={'light'}
          >
            Create Book Club
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateBookClub;
