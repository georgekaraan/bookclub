import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddBookDrawer from './AddBookDrawer';

type AddBookButtonProps = {};

const AddBookButton: React.FC<AddBookButtonProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="light" onClick={onOpen}>
        Add Book
      </Button>
      <AddBookDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
};
export default AddBookButton;
