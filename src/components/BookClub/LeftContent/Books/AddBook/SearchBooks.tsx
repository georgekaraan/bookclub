import { Book } from '@/atoms/bookAtom';
import SearchInput from '@/components/Navbar/SearchInput';
import { auth } from '@/firebase/clientApp';
import {
  Grid,
  Center,
  HStack,
  Button,
  IconButton,
  Text,
  Box,
  Image
} from '@chakra-ui/react';
import { title } from 'process';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaHeart } from 'react-icons/fa';

type SearchBooksProps = {};

const SearchBooks: React.FC<SearchBooksProps> = () => {
  const [user] = useAuthState(auth);
  const [searcResults, setSearcResults] = useState<Book[]>([]);
  return (
    <>
      <SearchInput
        user={user}
        navbar={false}
        setSearchResults={setSearcResults}
      />
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
                    {result.author}
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
    </>
  );
};
export default SearchBooks;
