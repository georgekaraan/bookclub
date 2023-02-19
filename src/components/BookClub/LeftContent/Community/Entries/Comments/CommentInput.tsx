import AuthButtons from '@/components/Navbar/RightContent/AuthButtons';
import { Flex, Textarea, Button, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import React from 'react';

type CommentInputProps = {
  commentText?: string;
  setCommentText: (value: string) => void;
  user: User;
  createLoading?: boolean;
  onCreateComment: (text: string) => void;
};

const CommentInput: React.FC<CommentInputProps> = ({
  commentText,
  setCommentText,
  user,
  createLoading,
  onCreateComment
}) => {
  return (
    <Flex direction="column" position="relative">
      {user ? (
        <>
          <Text ml={3} mb={1}>
            Comment as{' '}
            <span style={{ color: '', fontWeight: 'bold' }}>
              {user?.displayName}
            </span>
          </Text>
          <Textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Insert wisely my friend"
            fontSize="10pt"
            borderRadius={0}
            minHeight="120px"
            pb={10}
            borderColor="gray.200"
            _placeholder={{ color: 'gray.500' }}
            _focus={{
              outline: 'none',
              bg: 'white',
              border: '1px solid black'
            }}
          />
          <Flex
            mt={2}
            justify="flex-end"
            // bg="gray.100"
            p="6px 8px"
            borderRadius="0px"
          >
            <Button
              height="32px"
              disabled={!commentText?.length}
              isLoading={createLoading}
              onClick={() => onCreateComment(commentText!)}
              variant="light"
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          <AuthButtons />
        </Flex>
      )}
    </Flex>
  );
};
export default CommentInput;
