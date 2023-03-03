import { AddIcon } from '@chakra-ui/icons';
import { Text, Flex, Menu, MenuItem, Icon, Box } from '@chakra-ui/react';
import React from 'react';
import { GrAdd } from 'react-icons/gr';
import { useState } from 'react';
import CreateBookClub from '../Modal/CreateBookClub/CreateBookClub';
import { IoMdAdd } from 'react-icons/io';

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
          <Box fontSize={20} mr={2} as={IoMdAdd} />
          <Text fontSize={{ base: '10pt', sm: '11pt', md: '12pt' }}>
            Create New Book Club
          </Text>
        </Flex>
      </MenuItem>
    </>
  );
};
export default BookClub;
