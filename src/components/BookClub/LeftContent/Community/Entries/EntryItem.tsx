import { Entry } from '@/atoms/entryAtom';
import {
  Flex,
  Image,
  Grid,
  Icon,
  Text,
  Heading,
  GridItem,
  chakra,
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  useDisclosure,
  Alert,
  AlertIcon,
  useToast,
  Box
} from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  BsFillBookmarkFill,
  BsBookmarkCheck,
  BsBookmarkFill,
  BsPatchMinus
} from 'react-icons/bs';
import {
  TbFiretruck,
  TbWorldLongitude,
  TbHandMiddleFinger,
  TbThumbUp,
  TbThumbDown
} from 'react-icons/tb';
import { HiOutlineTrash } from 'react-icons/hi';
import { AiOutlineWarning } from 'react-icons/ai';
import { GrMoreVertical } from 'react-icons/gr';
import { BiCommentDetail } from 'react-icons/bi';
import moment from 'moment';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { IoShareSocialOutline } from 'react-icons/io5';
import DeleteEntryModal from '@/components/Modal/Entry/DeleteEntryModal';

type EntryItemProps = {
  entry: Entry;
  userIsCreator: boolean;
  userVote?: number;
  onVote: () => {};
  onDelete: (entry: Entry) => Promise<boolean>;
  onSelect: () => {};
};

const EntryItem: React.FC<EntryItemProps> = ({
  entry,
  userIsCreator,
  userVote,
  onVote,
  onDelete,
  onSelect
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDelete(entry);
      if (!success) throw Error('Failed to delete entry!');
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
    onClose();
  };

  return (
    <>
      <Grid
        border={'1px solid'}
        borderColor="gray.200"
        templateColumns="48px 1fr 40px"
        // height="500px"
        // minH="200px"
        cursor="pointer"
        _hover={{ boxShadow: 'lg', borderColor: 'gray.400' }}
        alignContent={'center'}
        justifyContent="center"
      >
        <GridItem display="grid">
          <Flex
            direction="column"
            border="1px solid"
            borderColor="gray.200"
            bg={'gray.50'}
            width="48px"
            // minH="100%"
            // h="500px"
            // maxH={'500px'}
            align="center"
            gap="4px"
            justify="center"
            p={2}
          >
            <Icon
              mt={1}
              fontSize="24px"
              as={userVote == 1 ? BsBookmarkFill : BsBookmarkCheck}
              cursor="pointer"
              onClick={onVote}
              transition="all 0.2s"
              _hover={{
                transform: 'scale(1.2)',
                color: 'dark'
              }}
            />
            <Text mt={1}>{entry.numberOfVotes}</Text>
            <Icon
              fontSize="24px"
              as={BsPatchMinus}
              cursor="pointer"
              onClick={onVote}
              _hover={{
                transform: 'scale(1.2)',
                color: 'dark'
              }}
            />
            <Divider my={2} />
            <Text>{entry.numberOfReplies}</Text>
            <Icon
              fontSize="24px"
              as={BiCommentDetail}
              cursor="pointer"
              onClick={onVote}
              _hover={{
                transform: 'scale(1.2)',
                color: 'dark'
              }}
            />
          </Flex>
          {/* <Icon
            fontSize="24px"
            as={HiOutlineTrash}
            cursor="pointer"
            onClick={onVote}
            // alignSelf="flex-end"
            // justifySelf="flex-end"
          /> */}
        </GridItem>
        <GridItem mx="12px" display="grid">
          <Flex direction="column" justify="center">
            {error &&
              toast({
                render: () => (
                  <Box color="white" p={2} bg="gray.500">
                    <Flex justify="center" align="center" gap={1}>
                      <Icon as={AiOutlineWarning} />
                      <Text>{error}</Text>
                    </Flex>
                  </Box>
                )
              })}
            <Heading size={'md'} mt="12px">
              {entry.title}
            </Heading>
            <Flex my="6px">
              <Flex>
                <Flex
                  userSelect="none"
                  align="center"
                  borderRadius="16px"
                  bg="blackAlpha.400"
                  h="24px"
                  m="4px 2px"
                  px={2}
                >
                  <Icon
                    fontSize={'14px'}
                    as={BsFillBookmarkFill}
                    color="dark"
                    mr={1}
                  />
                  <Text fontWeight="500" color="dark" fontSize="11pt">
                    Ch. 11
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex
                  userSelect="none"
                  align="center"
                  borderRadius="16px"
                  bg="blackAlpha.400"
                  h="24px"
                  m="4px 2px"
                  px={2}
                >
                  <Icon
                    as={TbWorldLongitude}
                    fontSize={'22px'}
                    color="dark"
                    mr={1}
                  />
                  <Text fontWeight="500" color="dark" fontSize="11pt">
                    General
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex
                  align="center"
                  borderRadius="16px"
                  bg="blackAlpha.400"
                  h="24px"
                  m="4px 2px"
                  px={2}
                  userSelect="none"
                >
                  <Icon
                    as={TbFiretruck}
                    fontSize={'22px'}
                    color="dark"
                    mr={1}
                  />
                  <Text fontWeight="500" color="dark" fontSize="11pt">
                    Controversial
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <Text>{entry.body}</Text>
          </Flex>
          {entry.imageURL && (
            <Flex align="center" justify="center" p={2} mb="12px">
              {loadingImage && <Skeleton height="200px" w="100%" />}
              <Image
                src={entry.imageURL}
                maxHeight="450px"
                alt="Entry Image"
                onLoad={() => setLoadingImage(false)}
                display={loadingImage ? 'none' : 'unset'}
              />
            </Flex>
          )}
          <Flex alignSelf="flex-end" mb={'12px'}>
            <Text fontSize={'10pt'} color="gray.600">
              entered by{' '}
              <chakra.span _hover={{ fontWeight: '600' }}>
                {entry.creatorUserName}
              </chakra.span>
              {' ' +
                moment(new Date(entry.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Flex>
        </GridItem>
        <GridItem display="grid">
          <Menu>
            <MenuButton
              borderRadius="unset"
              h="40px"
              w="40px"
              p={2}
              _hover={{
                bg: 'gray.100',
                borderColor: 'gray.400'
                // borderLeft: '1px solid',
                // borderBottom: '1px solid'
              }}
              _expanded={{ bg: 'gray.200' }}
              transition="all 0.2s"
            >
              <Icon
                fontSize="24px"
                mt={'5px'}
                as={GrMoreVertical}
                cursor="pointer"
              />
            </MenuButton>
            <MenuList bgPosition="right">
              <MenuItem fontSize="12pt" icon={<IoShareSocialOutline />}>
                <Text size="sm">Share</Text>
              </MenuItem>

              {userIsCreator && (
                <MenuItem
                  fontSize="12pt"
                  icon={<DeleteIcon />}
                  onClick={onOpen}
                >
                  Delete
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </GridItem>
      </Grid>
      <DeleteEntryModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
        loadingDelete={loadingDelete}
      />
    </>
  );
};
export default EntryItem;