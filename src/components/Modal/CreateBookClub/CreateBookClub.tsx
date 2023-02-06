import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React from 'react';

type CreateBookClubProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateBookClub: React.FC<CreateBookClubProps> = ({
  open,
  handleClose
}) => {
  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display={'flex'}
          flexDirection={'column'}
          fontSize="13pt"
          p={3}
        >
          Add New Book
        </ModalHeader>
        <ModalCloseButton />
        <Box>
          <ModalBody
            display={'flex'}
            flexDirection="column"
            p={'10px 0px'}
          ></ModalBody>
        </Box>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateBookClub;
