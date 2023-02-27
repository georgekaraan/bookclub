import { Entry, entryState } from '@/atoms/entryAtom';
import { firestore } from '@/firebase/clientApp';
import useUser from '@/hooks/useUser';
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch
} from 'firebase/firestore';
import React, { forwardRef, Ref, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import { Comment } from './CommentItem';

type CommentsProps = {
  user: User;
  selectedEntry: Entry | null;
  bookClubId: string;
  ref: Ref<HTMLDivElement>;
};

const Comments: React.FC<CommentsProps> = forwardRef(
  ({ user, selectedEntry, bookClubId }, ref) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [deleteLoadingId, setDeleteLoadingId] = useState('');
    const [createLoading, setCreateLoading] = useState(false);
    const setEntryStateValue = useSetRecoilState(entryState);
    const { userName } = useUser();

    const onCreateComment = async () => {
      setCreateLoading(true);
      try {
        const batch = writeBatch(firestore);

        const commentDocRef = doc(collection(firestore, 'comments'));

        const newComment: Comment = {
          id: commentDocRef.id,
          creatorId: user.uid,
          creatorDisplayName: userName,
          bookClubId,
          entryId: selectedEntry?.id!,
          entryTitle: selectedEntry?.title!,
          text: commentText,
          createdAt: serverTimestamp() as Timestamp
        };

        batch.set(commentDocRef, newComment);

        newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

        const entryDocRef = doc(firestore, 'entries', selectedEntry?.id!);

        batch.update(entryDocRef, {
          numberOfReplies: increment(1)
        });

        await batch.commit();

        setCommentText('');
        setComments((prev) => [newComment, ...prev]);
        setEntryStateValue((prev) => ({
          ...prev,
          selectedEntry: {
            ...prev.selectedEntry,
            numberOfReplies: prev.selectedEntry?.numberOfReplies! + 1
          } as Entry
        }));
      } catch (error) {
        console.log('onCreateComment error', error);
      }
      setCreateLoading(false);
    };

    const onDeleteComment = async (comment: Comment) => {
      setDeleteLoadingId(comment.id);

      try {
        const batch = writeBatch(firestore);

        const commentDocRef = doc(firestore, 'comments', comment.id);
        batch.delete(commentDocRef);

        const entryDocRef = doc(firestore, 'entries', selectedEntry?.id!);

        batch.update(entryDocRef, {
          numberOfReplies: increment(-1)
        });

        await batch.commit();

        setEntryStateValue((prev) => ({
          ...prev,
          selectedEntry: {
            ...prev.selectedEntry,
            numberOfReplies: prev.selectedEntry?.numberOfReplies! - 1
          } as Entry
        }));
        setComments((prev) => prev.filter((item) => item.id != comment.id));
      } catch (error) {
        console.log('onDeleteComment', error);
      }
      setDeleteLoadingId('');
    };

    const getEntryComments = async () => {
      try {
        const commentsColl = collection(firestore, 'comments');

        const commentQuery = query(
          commentsColl,
          where('entryId', '==', selectedEntry?.id),
          orderBy('createdAt', 'desc')
        );

        const commentDocs = getDocs(commentQuery);
        const comments = (await commentDocs).docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(comments as Comment[]);
      } catch (error) {
        console.log('getEntryComments error', error);
      }
      setFetchLoading(false);
    };

    useEffect(() => {
      if (!selectedEntry) return;
      getEntryComments();
    }, [selectedEntry]);

    return (
      <Flex mt="0px !important" ref={ref}>
        <Box
          bg="white"
          borderRadius="0px"
          w="100%"
          maxW="800px"
          mx={'auto'}
          borderX="1px solid"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Flex direction="column" my={10} fontSize="10pt" mx="48px">
            <CommentInput
              commentText={commentText}
              setCommentText={setCommentText}
              user={user}
              createLoading={createLoading}
              onCreateComment={onCreateComment}
            />
            <Stack spacing={6} p={2}>
              {fetchLoading ? (
                <>
                  {[0, 1, 2].map((item, index) => (
                    <Box key={index} p={4}>
                      <SkeletonCircle size="10" />
                      <SkeletonText mt="4" noOfLines={2} spacing={3} />
                    </Box>
                  ))}
                </>
              ) : (
                <>
                  {comments.length == 0 ? (
                    <Text>No comments yet</Text>
                  ) : (
                    <>
                      {comments.map((comment: Comment, index: number) => (
                        <CommentItem
                          comment={comment}
                          onDeleteComment={onDeleteComment}
                          deleteLoading={deleteLoadingId == comment.id}
                          userId={user?.uid}
                          key={comment.id}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
            </Stack>
          </Flex>
        </Box>
      </Flex>
    );
  }
);

export default Comments;
