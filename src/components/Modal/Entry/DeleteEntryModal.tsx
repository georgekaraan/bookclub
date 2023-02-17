import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Stack,
  Checkbox,
  HStack,
  ModalFooter,
  Button,
  Text,
  Box
} from '@chakra-ui/react';
import error from 'next/error';
import React from 'react';

type DeleteEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => {};
  loadingDelete: boolean;
};

const DeleteEntryModal: React.FC<DeleteEntryModalProps> = ({
  isOpen,
  onClose,
  handleDelete,
  loadingDelete
}) => {
  return (
    <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="0%">
        <ModalHeader
          display={'flex'}
          flexDirection={'column'}
          fontSize="13pt"
          p={3}
        >
          Delete Entry
        </ModalHeader>
        <ModalCloseButton />
        <Box p={'10px'}>
          <ModalBody display={'flex'} flexDirection="column" p={'10px'}>
            <Text fontWeight={600} fontSize={14}>
              Are you sure you want to delete this entry? It will disappear
              forever 👀
            </Text>
          </ModalBody>
        </Box>
        <ModalFooter bgColor={'gray.300'}>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={loadingDelete}
            variant={'light'}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteEntryModal;
