import { BookClub } from '@/atoms/bookClubsAtom';
import { Text, Box, Flex, Icon, Image, Button } from '@chakra-ui/react';
import React from 'react';
import { BsBookFill } from 'react-icons/bs';

type HeaderProps = {
  bcData: BookClub;
};

const Header: React.FC<HeaderProps> = ({ bcData }) => {
  const isJoined = false;

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
              <Text fontWeight={800} fontSize="16pt">
                {bcData.id}
              </Text>
              <Text fontWeight={500} fontSize="11pt">
                No. of Members: {bcData.numberOfMembers}
              </Text>
              <Text fontWeight={500} fontSize="11pt">
                No. of Books Read: {bcData.numberOfBooks}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? 'outline' : 'light'}
              height="36px"
              px={5}
              onClick={() => {}}
            >
              {isJoined ? 'Joined' : 'Join'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
