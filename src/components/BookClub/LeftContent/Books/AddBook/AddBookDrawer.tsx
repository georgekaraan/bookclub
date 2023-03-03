import { Book } from '@/atoms/bookAtom';
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
  Text
} from '@chakra-ui/react';
import { title } from 'process';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaHeart } from 'react-icons/fa';

type AddBookDrawerProps = {
  onClose: () => void;
  isOpen: boolean;
};

const AddBookDrawer: React.FC<AddBookDrawerProps> = ({ onClose, isOpen }) => {
  const [user] = useAuthState(auth);
  const [searcResults, setSearcResults] = useState<Book[]>([]);

  useEffect(() => {
    console.log(searcResults);
  }, [searcResults]);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} variant="secondary">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add a Book</DrawerHeader>
        <DrawerBody>
          <SearchInput
            user={user}
            navbar={false}
            setSearchResults={setSearcResults}
          />

          {/* <HStack spacing={1} overflowWrap="anywhere">
            {searcResults &&
              searcResults.map((result: Book) => (
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  height="400px"
                >
                  <Image src={result.imageURL} height="60%" objectFit="cover" />
                  <Box p="6">
                    <Box display="flex" alignItems="baseline">
                      <Text fontSize="xl" fontWeight="semibold" mr="2">
                        {result.title}
                      </Text>
                      <Text fontSize="md" color="gray.500">
                        {result.publishedDate}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">
                        by {result.authors}
                      </Text>
                    </Box>
                    <Box mt="4">
                      <Text fontSize="md">{result.pageCount} pages</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
          </HStack> */}
          {/* <HStack spacing={1} overflowWrap="anywhere"> */}
          <Grid
            templateColumns={'repeat(auto-fit,minmax(15rem,1fr))'}
            gap="8"
            justifyContent={'center'}
            alignContent="center"
          >
            {searcResults &&
              searcResults.map((result: Book) => (
                <Box
                  // maxW={'250px'}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Center height="60%">
                    <Image src={result.imageURL} alt={title} />
                  </Center>

                  <Box p="6">
                    <Box display="flex" alignItems="baseline">
                      {/* <Badge borderRadius="full" px="2" colorScheme="teal">
                        New
                      </Badge> */}
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        ml="2"
                      >
                        {result.publishedDate}
                      </Box>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {result.title}
                    </Box>

                    <Box>
                      <Text fontSize="sm" color="gray.600">
                        {/* {result.authors?.join(', ')} */}
                        {result.authors}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="sm" color="gray.600">
                        {result.pageCount} pages
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.600">
                        {result.googleLink}
                      </Text>
                    </Box>

                    <HStack mt="2">
                      <Button colorScheme="teal" size="sm">
                        Buy
                      </Button>
                      <IconButton
                        aria-label="Add to favorites"
                        icon={<FaHeart />}
                        size="sm"
                      />
                    </HStack>
                  </Box>
                </Box>
              ))}
          </Grid>
          {/* </HStack> */}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default AddBookDrawer;
