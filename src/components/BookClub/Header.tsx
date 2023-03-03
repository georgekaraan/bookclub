import { BookClub, bookClubState } from '@/atoms/bookClubsAtom';
import {
  Text,
  Box,
  Flex,
  Icon,
  Image,
  Button,
  useToast,
  IconButton,
  Spinner,
  VStack
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsBookFill } from 'react-icons/bs';
import useBookClubData from '@/hooks/useBookClubData';
import { AiTwotoneLock } from 'react-icons/ai';
import { ImBooks } from 'react-icons/im';
import { RxEyeOpen } from 'react-icons/rx';
import useSelectFile from '@/hooks/useSelectFile';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

type HeaderProps = {
  bcData: BookClub;
};

const Header: React.FC<HeaderProps> = ({ bcData }) => {
  const { onSelectFile, setSelectedFile, selectedFile } = useSelectFile();
  const inputRef = useRef<HTMLInputElement>(null);
  const { bcStateValue, onJoinorLeaveBookClub, loading } = useBookClubData();
  const [user] = useAuthState(auth);
  const isMember = !!bcStateValue.mySnippets.find(
    (item) => item.bookClubId === bcData.id
  );
  const isCreator = user?.uid === bcData?.creatorId;

  const [memberCount, setMemberCount] = useState(bcData.numberOfMembers);
  const [uploadingImage, setUploadingImage] = useState(false);
  const toast = useToast();

  const { getMembers } = useBookClubData();

  const setBookclubStateValue = useSetRecoilState(bookClubState);
  const currentBc = useRecoilValue(bookClubState);

  const onJoinOrLeave = () => {
    if (user?.uid === bcData.creatorId && isMember) {
      toast({
        isClosable: true,
        position: 'bottom',
        title: 'Cannot Abandon Bookclub!',
        colorScheme: 'blackAlpha',
        variant: 'subtle',
        description:
          "You've created this bookclub. You can only leave by deleting it in your profile settings 🥹"
      });
      return;
    }
    const result = onJoinorLeaveBookClub(bcData, isMember);
    if (result == 1) setMemberCount((prev) => prev + 1);
    if (result == -1) setMemberCount((prev) => prev - 1);
  };

  const onUpdateImage = async () => {
    if (!selectedFile) return;

    setUploadingImage(true);
    try {
      const imageRef = ref(storage, `bookclubs/${bcData.id}/image`);
      await uploadString(imageRef, selectedFile, 'data_url');

      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(firestore, 'bookclubs', bcData.id), {
        imageURL: downloadURL
      });

      setBookclubStateValue((prev) => ({
        ...prev,
        currentBC: {
          ...prev.currentBC,
          imageURL: downloadURL
        } as BookClub
      }));
    } catch (error: any) {
      console.log('onUpdateImage', error);
    }
    setSelectedFile('');
    setUploadingImage(false);
  };

  return (
    <Flex flexDirection={'column'} w="100%" h={'120px'}>
      {/* <Box height={'50%'} bgColor="gray.300" /> */}
      <Flex justify={'center'} align="center" bg="gray.200" flexGrow={1}>
        <Flex width={'95%'} maxW="1500px">
          <Flex justify="center" align="center" position="relative">
            {currentBc.currentBC?.imageURL || selectedFile ? (
              <Image
                borderRadius="full"
                boxSize="80px"
                src={selectedFile || currentBc.currentBC?.imageURL}
                alt="Dan Abramov"
              />
            ) : (
              <Icon as={ImBooks} fontSize={88} color="dark" p="10px" />
            )}
            <Flex direction="column" gap="30px">
              {isCreator && (
                <Icon
                  aria-label="Edit Photo"
                  as={EditIcon}
                  position="absolute"
                  right="-10px"
                  top="10px"
                  onClick={() => inputRef.current?.click()}
                  cursor="pointer"
                />
              )}
              <Flex position="absolute" bottom="-15px" right="-1px">
                {selectedFile &&
                  (uploadingImage ? (
                    <Spinner />
                  ) : (
                    <Text
                      border="1px solid"
                      borderColor="dark"
                      p="3px"
                      bgColor="gray.50"
                      cursor="pointer"
                      onClick={onUpdateImage}
                    >
                      Save
                    </Text>
                  ))}
              </Flex>
              <input
                accept="image/*"
                type="file"
                ref={inputRef}
                hidden
                onChange={onSelectFile}
              />
            </Flex>
          </Flex>

          <Flex p={'10px 16px'} align="center">
            <Flex direction={'column'} mx={6}>
              <Text fontWeight={900} fontSize="16pt">
                {bcData.id}
              </Text>
              <Flex align={'center'}>
                <Icon
                  as={
                    bcData.privacyType === 'private' ? AiTwotoneLock : RxEyeOpen
                  }
                  mr={1}
                />
                <Text fontWeight={600} fontSize="11pt">
                  {bcData.privacyType === 'private'
                    ? 'Private'
                    : bcData.privacyType === 'public'
                    ? 'Public'
                    : ''}
                </Text>
              </Flex>
            </Flex>
            <Flex direction={'column'} mx={6}>
              <Text fontWeight={500} fontSize="11pt">
                No. of Members: {memberCount && memberCount}
              </Text>
              <Text fontWeight={500} fontSize="11pt">
                No. of Books Read: {bcData.numberOfBooks}
              </Text>
            </Flex>

            <Button
              variant={isMember ? 'outline' : 'light'}
              border={isMember ? '1px solid' : '1px solid'}
              height="36px"
              px={3}
              onClick={onJoinOrLeave}
              isLoading={loading}
            >
              {isMember
                ? 'Member'
                : bcData.privacyType === 'public'
                ? 'Join'
                : 'Request Access'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
