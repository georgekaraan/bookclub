import { firestore } from '@/firebase/clientApp';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Stack, Text, Image, Spinner } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { doc, Timestamp } from 'firebase/firestore';
import moment from 'moment';
import React from 'react';
import { BsPersonCircle, BsBookmarkCheck, BsPatchMinus } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayName: string;
  creatorImage?: string;
  bookClubId: string;
  entryId: string;
  entryTitle: string;
  text: string;
  createdAt: Timestamp;
};

type CommentItemProps = {
  comment: Comment;
  onDeleteComment: (comment: Comment) => void;
  deleteLoading: boolean;
  userId: string;
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onDeleteComment,
  deleteLoading,
  userId
}) => {
  return (
    <Flex>
      <Box mr={2} mt={1}>
        {comment?.creatorImage ? (
          <Image
            maxH="30px"
            w="30px"
            borderRadius="full"
            src={comment?.creatorImage}
          />
        ) : (
          <Icon fontSize="30px" as={BsPersonCircle} color="dark" />
        )}
      </Box>
      <Stack spacing={1}>
        <Stack fontSize={'11pt'} direction={'row'} align="center">
          <Text fontWeight="700">{comment.creatorDisplayName}</Text>
          <Text fontSize="10pt" color="gray.400">
            {`commented ${moment(
              new Date(comment.createdAt.seconds * 1000)
            ).fromNow()}`}
          </Text>
          {deleteLoading && <Spinner size="sm" color="gray.400" />}
        </Stack>
        <Text fontSize="10pt">{comment.text}</Text>
        <Stack
          direction="row"
          align="center"
          cursor="pointer"
          color="gray.400"
          spacing={3}
        >
          <Icon
            as={BsBookmarkCheck}
            fontSize="16px"
            _hover={{
              transform: 'scale(1.2)',
              color: 'dark'
            }}
          />
          <Icon
            as={BsPatchMinus}
            fontSize="16px"
            _hover={{
              transform: 'scale(1.2)',
              color: 'dark'
            }}
          />
          {userId == comment.creatorId && (
            <>
              <Icon
                as={FaEdit}
                fontSize="16px"
                _hover={{
                  transform: 'scale(1.2)',
                  color: 'dark'
                }}
              />
              <DeleteIcon
                fontSize="16px"
                _hover={{
                  transform: 'scale(1.2)',
                  color: 'dark'
                }}
                onClick={() => onDeleteComment(comment)}
              />
            </>
          )}
        </Stack>
      </Stack>
    </Flex>
  );
};
export default CommentItem;
