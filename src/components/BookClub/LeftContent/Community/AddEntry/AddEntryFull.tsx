import { CloseIcon } from '@chakra-ui/icons';
import {
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
import React, { useState } from 'react';
import { AiFillFileText, AiFillAudio } from 'react-icons/ai';
import { BsImages, BsFillCameraVideoFill } from 'react-icons/bs';
import { FaPollH } from 'react-icons/fa';
import FormImage from '../EntryForm/FormImage';
import FormText from '../EntryForm/FormText';

type AddEntryFullProps = {
  setView: React.Dispatch<React.SetStateAction<string>>;
};

const AddEntryFull: React.FC<AddEntryFullProps> = ({ setView }) => {
  const [loading, setLoading] = useState(false);
  const [textInputs, setTextInputs] = useState({
    title: '',
    body: ''
  });
  const [selectedFile, setSelectedFile] = useState<string>();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleAddEntry = () => {};

  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as string);
      }
    };
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
        w="100%"
        maxW={'700px'}
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
                onSelectImage={onSelectImage}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setTabIndex={setTabIndex}
              />
            </TabPanel>
            <TabPanel>
              <p onClick={() => setView('link')}>Three!</p>
            </TabPanel>
            <TabPanel>
              <p onClick={() => setView('link')}>Four!</p>
            </TabPanel>
            <TabPanel>
              <p onClick={() => setView('link')}>Five</p>
            </TabPanel>
            <TabPanel>
              <p onClick={() => setView('link')}>Six</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
        {/* </Flex> */}
      </Flex>
    </>
  );
};
export default AddEntryFull;
