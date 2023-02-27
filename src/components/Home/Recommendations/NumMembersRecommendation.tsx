import { BookClub } from '@/atoms/bookClubsAtom';
import { firestore } from '@/firebase/clientApp';
import useBookClubData from '@/hooks/useBookClubData';
import {
  Flex,
  Text,
  Image,
  Box,
  Button,
  Icon,
  Link,
  Skeleton,
  SkeletonCircle,
  Stack
} from '@chakra-ui/react';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { BsBook } from 'react-icons/bs';
import { FaReddit } from 'react-icons/fa';

const NumMembersRecommendation: React.FC = () => {
  const [bookclubs, setBookclubs] = useState<BookClub[]>([]);
  const [loading, setLoading] = useState(false);
  const { bcStateValue, onJoinorLeaveBookClub } = useBookClubData();

  const getBCRecommendations = async () => {
    setLoading(true);
    try {
      const bookclubQuery = query(
        collection(firestore, 'bookclubs'),
        orderBy('numberOfMembers', 'desc'),
        limit(5)
      );

      const bookclubDocs = await getDocs(bookclubQuery);

      const bookclubs = bookclubDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookclubs(bookclubs as BookClub[]);
    } catch (error) {
      console.log('getBCRecommendations error', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBCRecommendations();
  }, []);

  return (
    <>
      {bookclubs && (
        <Flex
          direction="column"
          bg="white"
          borderRadius={0}
          // cursor="pointer"
          border="1px solid"
          borderColor="gray.300"
          w="400px"
        >
          <Flex
            align="flex-end"
            color="white"
            p="6px 10px"
            bg="blue.500"
            height="70px"
            borderRadius="4px 4px 0px 0px"
            fontWeight={600}
            // bgImage="url(/images/recCommsArt.png)"
            // backgroundSize="cover"
            // bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
            //   url('images/recCommsArt.png')"
          >
            Top Communities - No. of Members
          </Flex>
          <Flex direction="column">
            {loading ? (
              <Stack mt={2} p={3}>
                <Flex justify="space-between" align="center">
                  <SkeletonCircle size="10" />
                  <Skeleton height="10px" width="70%" />
                </Flex>
                <Flex justify="space-between" align="center">
                  <SkeletonCircle size="10" />
                  <Skeleton height="10px" width="70%" />
                </Flex>
                <Flex justify="space-between" align="center">
                  <SkeletonCircle size="10" />
                  <Skeleton height="10px" width="70%" />
                </Flex>
              </Stack>
            ) : (
              <>
                {bookclubs.map((item, index) => {
                  const isJoined = !!bcStateValue.mySnippets.find(
                    (snippet) => snippet.bookClubId === item.id
                  );
                  return (
                    <Link key={item.id} href={`/bc/${item.id}`}>
                      <Flex
                        position="relative"
                        align="center"
                        fontSize="10pt"
                        borderBottom="1px solid"
                        borderColor="gray.200"
                        p="10px 12px"
                        fontWeight={600}
                      >
                        <Flex width="80%" align="center">
                          <Flex width="15%">
                            <Text mr={2}>{index + 1}</Text>
                          </Flex>
                          <Flex align="center" width="80%">
                            {item.imageURL ? (
                              <Image
                                borderRadius="full"
                                boxSize="28px"
                                src={item.imageURL}
                                mr={2}
                              />
                            ) : (
                              <Icon
                                as={FaReddit}
                                fontSize={30}
                                color="brand.100"
                                mr={2}
                              />
                            )}
                            <span
                              style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {item.id}
                            </span>
                          </Flex>
                        </Flex>
                        <Box position="absolute" right="10px">
                          <Button
                            height="22px"
                            fontSize="8pt"
                            onClick={(event) => {
                              event.stopPropagation();
                              onJoinorLeaveBookClub(item, isJoined);
                            }}
                            variant={isJoined ? 'outline' : 'solid'}
                          >
                            {isJoined ? 'Joined' : 'Join'}
                          </Button>
                        </Box>
                      </Flex>
                    </Link>
                  );
                })}
                <Box p="10px 20px">
                  <Button height="30px" width="100%">
                    View All
                  </Button>
                </Box>
              </>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default NumMembersRecommendation;
