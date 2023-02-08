import { List, ListItem, ListIcon, Flex } from '@chakra-ui/react';
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';

type MembersProps = {};

const Members: React.FC<MembersProps> = () => {
  return (
    <Flex w={'100%'}>
      <List fontSize={18} spacing={2}>
        <ListItem>
          <ListIcon as={BsPersonCircle} color="dark" />
          George
        </ListItem>
        <ListItem>
          <ListIcon as={BsPersonCircle} color="dark" />
          John W.
        </ListItem>
        <ListItem>
          <ListIcon as={BsPersonCircle} color="dark" />
          Anon1232
        </ListItem>
        <ListItem>
          <ListIcon as={BsPersonCircle} color="dark" />
          JimmyDuuude
        </ListItem>
      </List>
    </Flex>
  );
};
export default Members;
