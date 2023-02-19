import { Entry, entryState } from '@/atoms/entryAtom';
import { firestore, storage } from '@/firebase/clientApp';
import useSelectFile from '@/hooks/useSelectFile';
import { CloseIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiFillFileText, AiFillAudio } from 'react-icons/ai';
import { BsImages, BsFillCameraVideoFill } from 'react-icons/bs';
import { FaPollH } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import FormImage from './EntryForm/FormImage';
import FormText from './EntryForm/FormText';

type AddEntryFullProps = {
  setView: React.Dispatch<React.SetStateAction<string>>;
  user: User;
  getEntries: () => {};
};

const AddEntryFull: React.FC<AddEntryFullProps> = ({
  setView,
  user,
  getEntries
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: ''
  });
  // const [selectedFile, setSelectedFile] = useState<string>();

  const { onSelectFile, selectedFile, setSelectedFile } = useSelectFile();

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [error, setError] = useState(false);

  const handleAddEntry = async () => {
    const { bookclub } = router.query;

    const newEntry: Entry = {
      bookClubId: bookclub as string,
      creatorId: user?.uid,
      title: textInputs.title,
      body: textInputs.body,
      creatorUserName: user?.displayName as string,
      numberOfReplies: 0,
      numberOfVotes: 0,
      createdAt: serverTimestamp() as Timestamp
    };
    setLoading(true);
    try {
      const entryDocRef = await addDoc(
        collection(firestore, 'entries'),
        newEntry
      );
      if (selectedFile) {
        const imageRef = ref(storage, `entries/${entryDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, 'data_url');
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(entryDocRef, {
          imageURL: downloadURL
        });
      }
      getEntries();
      setView('link');
    } catch (error: any) {
      console.log('handleAddEntry error', error.message);
      setError(true);
    }
    setLoading(false);
  };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value }
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Flex
        direction={'column'}
        border="1px solid"
        borderColor="gray.100"
        boxShadow={'lg'}
        p={2}
        // w={{ base: '100%', md: '85%' }}
        maxW={'800px'}
        w="100%"
      >
        <Flex justify={'flex-end'}>
          <IconButton
            size={'xs'}
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={() => setView('link')}
            borderRadius="0%"
          />
        </Flex>

        <Tabs
          align="center"
          size={{ base: 'sm', lg: 'md' }}
          // variant="soft-rounded"
          colorScheme="black"
          onChange={handleTabsChange}
          index={tabIndex}
        >
          <TabList>
            <Tab>
              <Icon mr={1} as={AiFillFileText} />
              Text
            </Tab>
            <Tab>
              <Icon mr={1} as={BsImages} />
              Images
            </Tab>
            <Tab isDisabled _hover={{ cursor: 'default' }}>
              <Icon mr={1} as={BsFillCameraVideoFill} />
              Videos
            </Tab>
            <Tab isDisabled _hover={{ cursor: 'default' }}>
              <Icon mr={1} as={AiFillAudio} />
              Audio
            </Tab>
            <Tab isDisabled _hover={{ cursor: 'default' }}>
              <Icon mr={1} as={FaPollH} />
              Poll
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormText
                textInputs={textInputs}
                handleAddEntry={handleAddEntry}
                onChange={onTextChange}
                loading={loading}
              />
            </TabPanel>
            <TabPanel>
              <FormImage
                onSelectImage={onSelectFile}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setTabIndex={setTabIndex}
              />
            </TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
        {/* </Flex> */}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <Text>There has been an error adding new entry 😭</Text>
          </Alert>
        )}
      </Flex>
    </>
  );
};
export default AddEntryFull;
