import { Book } from '@/atoms/bookAtom';
import { bookClubState } from '@/atoms/bookClubsAtom';
import SearchInput from '@/components/Navbar/SearchInput';
import { auth } from '@/firebase/clientApp';
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  HStack,
  IconButton,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text
} from '@chakra-ui/react';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { now } from 'moment';
import { title } from 'process';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaHeart } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import SearchBooks from './SearchBooks';

type AddBookDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

const AddBookDrawer: React.FC<AddBookDrawerProps> = ({ onClose, isOpen }) => {
  const [value, setValue] = useState('manual');
  const currentBc = useRecoilValue(bookClubState).currentBC;
  const [book, setBook] = useState<Book>({
    author: '',
    title: '',
    publisher: '',
    publishedDate: '',
    pageCount: 0,
    addedOn: serverTimestamp() as Timestamp,
    imageURL: '',
    bookClubId: currentBc?.id,
    category: [],
    numberOfReads: 0
  });

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value }
    } = event;
    setBook((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(book);
  }, [book]);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} variant="secondary">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add a Book</DrawerHeader>
        <DrawerBody display={'flex'} flexDirection="column" p={'10px'}>
          {/* <SearchBooks /> */}

          <RadioGroup onChange={setValue} value={value}>
            <Stack direction="row">
              <Radio colorScheme="blackAlpha" value="manual">
                Manual
              </Radio>
              <Radio value="auto" isDisabled>
                Automatic
              </Radio>
            </Stack>
          </RadioGroup>
          <Text mt="20px" fontWeight={600} fontSize={14}>
            Title
          </Text>
          <Input
            placeholder="1984"
            type="text"
            name="title"
            onChange={onTextChange}
            value={book.title}
            size="md"
            mt={1}
          ></Input>
          <Text mt="20px" fontWeight={600} fontSize={14}>
            Author
          </Text>
          <Input
            placeholder="George Orwell"
            type="text"
            onChange={onTextChange}
            value={book.author}
            name="author"
            size="md"
            mt={1}
          ></Input>
          <Text mt="20px" fontWeight={600} fontSize={14}>
            Number of Pages
          </Text>
          <Input
            placeholder="233"
            type="number"
            onChange={onTextChange}
            value={book.pageCount}
            name="pageCount"
            size="md"
            mt={1}
          ></Input>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default AddBookDrawer;
