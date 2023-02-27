import {
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Member } from './RightContent';

type MembersProps = {
  members: Member[];
  creator?: Member;
  isLoadingMembers: boolean;
};

const Members: React.FC<MembersProps> = ({
  members,
  creator,
  isLoadingMembers
}) => {
  return (
    <Stack w={'100%'} direction="column" spacing={2}>
      {isLoadingMembers ? (
        <>
          {[0, 1, 2, 3].map((item, index) => (
            <Flex key={index} align="center">
              <SkeletonCircle />
              <SkeletonText ml={4} w="200px" noOfLines={1} height="20px" />
            </Flex>
          ))}
        </>
      ) : (
        <>
          <Heading size="sm" textAlign="center" textDecoration="underline">
            Creator
          </Heading>
          <Flex align="center">
            {creator?.image ? (
              <Image
                maxH="40px"
                w="40px"
                borderRadius="full"
                src={creator?.image}
              />
            ) : (
              <Icon w="40px" h="40px" as={BsPersonCircle} color="dark" />
            )}
            <Text ml="10px" fontSize="12pt">
              {creator?.displayName || creator?.userId}
            </Text>
          </Flex>

          {members.filter((member: Member) => member.isModerator).length !=
          0 ? (
            <>
              <Heading size="sm" textAlign="center" textDecoration="underline">
                Moderator(s)
              </Heading>

              {members
                .filter((member: Member) => member.isModerator)
                .map((member: Member) => (
                  <Flex key={member.userId} align="center">
                    {member.image ? (
                      <Image
                        maxH="40px"
                        w="40px"
                        borderRadius="full"
                        src={member.image}
                      />
                    ) : (
                      <Icon
                        w="40px"
                        h="40px"
                        as={BsPersonCircle}
                        color="dark"
                      />
                    )}

                    <Text ml="10px" fontSize="12pt">
                      {member?.displayName || member.userId}
                    </Text>
                  </Flex>
                ))}
            </>
          ) : null}

          <Heading size="sm" textAlign="center" textDecoration="underline">
            Members
          </Heading>
          {members
            .filter(
              (member: Member) =>
                member.userId != creator?.userId && !member.isModerator
            )
            .map((member: Member) => (
              <Flex key={member.userId} align="center">
                {member.image ? (
                  <Image
                    maxH="40px"
                    w="40px"
                    borderRadius="full"
                    src={member.image}
                  />
                ) : (
                  <Icon w="40px" h="40px" as={BsPersonCircle} color="dark" />
                )}

                <Text ml="10px" fontSize="12pt">
                  {member?.displayName || member.userId}
                </Text>
              </Flex>
            ))}
        </>
      )}
    </Stack>
  );
};
export default Members;
