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
import { ImBooks } from 'react-icons/im';

type RecommendationsProps = {
  filter: string;
};

const Recommendations: React.FC<RecommendationsProps> = ({ filter }) => {
  const [bookclubs, setBookclubs] = useState<BookClub[]>([]);
  const [loading, setLoading] = useState(false);
  const { bcStateValue, onJoinorLeaveBookClub } = useBookClubData();

  const getBCRecommendations = async () => {
    setLoading(true);

    try {
      const bookclubQuery = query(
        collection(firestore, 'bookclubs'),
        orderBy(filter, 'desc'),
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
    console.log('filter:', filter);
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
          w="300px"
        >
          <Flex
            align="center"
            justify="center"
            // p="6px 10px"
            bg="gray.200"
            height="40px"
            borderRadius="0px"
            fontWeight={600}
            w="100%"
            textAlign="center"
          >
            {filter == 'numberOfMembers'
              ? 'No. of Members'
              : filter == 'numberOfBooks' && 'No. of Books Read'}
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
                              <Icon as={ImBooks} fontSize={25} mr={2} />
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
                          {/* <Button
                            height="22px"
                            fontSize="8pt"
                            onClick={(event) => (
                              event.stopPropagation(),
                              onJoinorLeaveBookClub(item, isJoined)
                            )}
                            variant={isJoined ? 'outline' : 'solid'}
                          >
                            {isJoined ? 'Joined' : 'Join'}
                          </Button> */}

                          {filter == 'numberOfMembers'
                            ? item.numberOfMembers
                            : filter == 'numberOfBooks' && item.numberOfBooks}
                        </Box>
                      </Flex>
                    </Link>
                  );
                })}
              </>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default Recommendations;
