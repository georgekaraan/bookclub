import { BookClub } from '@/atoms/bookClubsAtom';
import { Text, Box, Flex, Icon, Image, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsBookFill } from 'react-icons/bs';
import useBookClubData from '@/hooks/useBookClubData';
import { AiTwotoneLock } from 'react-icons/ai';
import { RxEyeOpen } from 'react-icons/rx';

type HeaderProps = {
  bcData: BookClub;
};

const Header: React.FC<HeaderProps> = ({ bcData }) => {
  const { bcStateValue, onJoinorLeaveBookClub, loading } = useBookClubData();
  const isMember = !!bcStateValue.mySnippets.find(
    (item) => item.bookClubId === bcData.id
  );
  const [memberCount, setMemberCount] = useState(bcData.numberOfMembers);

  const onJoinOrLeave = () => {
    const result = onJoinorLeaveBookClub(bcData, isMember);
    if (result == 1) setMemberCount((prev) => prev + 1);
    if (result == -1) setMemberCount((prev) => prev - 1);
  };

  return (
    <Flex flexDirection={'column'} w="100%" h={'150px'}>
      {/* <Box height={'50%'} bgColor="gray.300" /> */}
      <Flex justify={'center'} align="center" bg="gray.200" flexGrow={1}>
        <Flex width={'95%'} maxW="1500px">
          {bcData.imageURL ? (
            <Image />
          ) : (
            <Icon
              as={BsBookFill}
              fontSize={88}
              //   position={'relative'}
              //   top={5}
              color="dark"
              // border={'4px solid'}
              p="10px"
            />
          )}
          <Flex p={'10px 16px'} align="center">
            <Flex direction={'column'} mr={6}>
              <Text fontWeight={900} fontSize="16pt">
                {bcData.id}
              </Text>
              <Flex align={'center'}>
                <Icon
                  as={
                    bcData.privacyType === 'private' ? AiTwotoneLock : RxEyeOpen
                  }
                  mr={1}
                />
                <Text fontWeight={600} fontSize="11pt">
                  {bcData.privacyType === 'private'
                    ? 'Private'
                    : bcData.privacyType === 'public'
                    ? 'Public'
                    : ''}
                </Text>
              </Flex>
              <Text fontWeight={500} fontSize="11pt">
                No. of Members: {memberCount && memberCount}
              </Text>
              <Text fontWeight={500} fontSize="11pt">
                No. of Books Read: {bcData.numberOfBooks}
              </Text>
            </Flex>
            <Button
              variant={isMember ? 'outline' : 'light'}
              border={isMember ? '1px solid' : 'none'}
              height="36px"
              px={5}
              onClick={onJoinOrLeave}
              isLoading={loading}
            >
              {isMember ? 'Member' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
