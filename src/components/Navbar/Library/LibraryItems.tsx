import { BcSnippet } from '@/atoms/bookClubsAtom';
import { Flex, Icon, Image, MenuDivider, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { BsBook } from 'react-icons/bs';

type LibraryItemsProps = {
  bc: BcSnippet;
};

const LibraryItems: React.FC<LibraryItemsProps> = ({ bc }) => {
  return (
    <Link href={`/bc/${bc.bookClubId}`} key={bc.bookClubId}>
      <MenuItem
        fontSize={{ base: '10pt', sm: '11pt', md: '12pt' }}
        color={'dark'}
        _hover={{ bg: 'dark', color: 'lightYellow' }}
        height="40px"
      >
        <Flex align={'center'}>
          {bc.imageURL ? (
            <Image src={bc.imageURL} mr={2} w="30px" maxH="38px" />
          ) : (
            <Icon as={BsBook} mr={2} w="30px" maxH="38px" />
          )}
          {bc.bookClubId}
        </Flex>
      </MenuItem>
      <MenuDivider />
    </Link>
  );
};
export default LibraryItems;
