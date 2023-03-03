import { Book } from '@/atoms/bookAtom';
import { bookClubState } from '@/atoms/bookClubsAtom';
import useBookClubData from '@/hooks/useBookClubData';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

type SearchInputProps = {
  user: any;
  navbar: boolean;
  setSearchResults: React.Dispatch<React.SetStateAction<Book[]>>;
};

const SearchInput: React.FC<SearchInputProps> = ({
  user,
  navbar,
  setSearchResults
}) => {
  const [searchText, setSearchText] = useState('');
  const { bcStateValue } = useBookClubData();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    const response = await fetch(`/api/books/search?q=${searchText}`, {
      method: 'GET'
    });
    const data = await response.json();

    // const filteredBooks = data.items.map((item: any) => {
    //   const book: Book = {
    //     title: item.volumeInfo.title,
    //     authors: item.volumeInfo.authors,
    //     addedOn: serverTimestamp() as Timestamp,
    //     bookClubId: bcStateValue?.currentBC?.id!,
    //     category: item.volumeInfo.categories,
    //     googleLink: item.volumeInfo.previewLink,
    //     id:
    //       item.volumeInfo.industryIdentifiers?.filter(
    //         (isbn: any) => isbn.type === 'ISBN_13'
    //       )[0]?.identifier || 'Cannot be found',
    //     pageCount: item.volumeInfo.pageCount,
    //     publishedDate: item.volumeInfo.publishedDate,
    //     publisher: item.volumeInfo.publisher,
    //     imageURL: item.volumeInfo.imageLinks?.thumbnail
    //   };
    //   return book;
    // });

    setSearchResults(data);
  };

  return (
    <>
      {user && (
        <Flex
          // mx={2}
          align="center"
          display={{ base: 'none', sm: 'unset' }}
          width="300px"
          m={'0 10px'}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none" height="32px" mt={'0.5'}>
              <SearchIcon color={navbar ? 'lightYellow' : 'dark'} />
            </InputLeftElement>
            <Input
              type="text"
              height="36px"
              placeholder="Search"
              _placeholder={{ color: 'gray' }}
              color={navbar ? 'lightYellow' : 'dark'}
              _focus={{ outline: 'none', border: '1px solid' }}
              _hover={
                navbar
                  ? { bg: 'gray.700', border: '1px solid' }
                  : { border: '1px solid' }
              }
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </InputGroup>
        </Flex>
      )}
    </>
  );
};
export default SearchInput;
