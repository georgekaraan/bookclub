import { AddIcon } from '@chakra-ui/icons';
import { Flex, Menu, MenuItem, Icon } from '@chakra-ui/react';
import React from 'react';
import { GrAdd } from 'react-icons/gr';
import { useState } from 'react';
import CreateBookClub from '../Modal/CreateBookClub/CreateBookClub';

type BookClubProps = {};

const BookClub: React.FC<BookClubProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateBookClub open={open} handleClose={() => setOpen(false)} />
      <MenuItem
        fontSize={{ base: '10pt', sm: '11pt', md: '12pt' }}
        color={'dark'}
        _hover={{ bg: 'dark', color: 'lightYellow' }}
        height="40px"
        onClick={() => setOpen(true)}
      >
        <Flex align={'center'}>
          <Icon fontSize={20} mr={3} as={GrAdd} color="green" />
          Add Book
        </Flex>
      </MenuItem>
    </>
  );
};
export default BookClub;
