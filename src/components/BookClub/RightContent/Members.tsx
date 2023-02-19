import {
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Member } from './RightContent';

type MembersProps = {
  members: Member[];
  creator?: Member;
};

const Members: React.FC<MembersProps> = ({ members, creator }) => {
  return (
    <Stack w={'100%'} direction="column" spacing={2}>
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

      <Heading size="sm" textAlign="center" textDecoration="underline">
        {members.filter((member: Member) => member.isModerator).length > 1
          ? 'Moderators'
          : 'Moderator'}
      </Heading>
      {members
        .filter((member: Member) => member.isModerator)
        .map((member: Member) => (
          <Flex align="center">
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

      <Heading size="sm" textAlign="center" textDecoration="underline">
        Members
      </Heading>
      {members
        .filter(
          (member: Member) =>
            member.userId != creator?.userId && !member.isModerator
        )
        .map((member: Member) => (
          <Flex align="center">
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
    </Stack>
  );
};
export default Members;
