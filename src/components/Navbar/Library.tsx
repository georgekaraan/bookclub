import { bookClubState } from '@/atoms/bookClubsAtom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import { User } from 'firebase/auth';
import Link from 'next/link';
import React from 'react';
import { BsBook } from 'react-icons/bs';
import { FaBookOpen } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import BookClub from './BookClub';

type LibraryProps = {
  user?: User | null;
};

const Library: React.FC<LibraryProps> = ({ user }) => {
  const mySnippets = useRecoilValue(bookClubState).mySnippets;

  return (
    <>
      {user && (
        <Flex ml={{ base: '0px', lg: '20px' }}>
          <Menu flip={true} preventOverflow>
            <MenuButton
              mr="10px"
              _hover={{
                bgColor: 'gray.500',
                outline: '1px solid',
                outlineColor: 'lightYellow'
              }}
            >
              <Flex
                p="4px"
                alignItems="center"
                justifyContent={'space-between'}
                width="64px"
              >
                <Icon
                  color={'lightYellow'}
                  _hover={{ color: 'dark' }}
                  boxSize={{ base: '24px', sm: '36px' }}
                  as={FaBookOpen}
                />
                <ChevronDownIcon color={'lightyellow'} />
              </Flex>
            </MenuButton>
            <MenuList w={{ base: '200px', sm: '300px' }} borderRadius="0%">
              <>
                <Text userSelect={'none'} ml={2} fontWeight={'extrabold'}>
                  My Bookclubs
                </Text>
                <MenuDivider />
              </>
              {mySnippets.map((bc) => (
                <Link href={`/bc/${bc.bookClubId}`} key={bc.bookClubId}>
                  <MenuItem
                    fontSize={{ base: '10pt', sm: '11pt', md: '12pt' }}
                    color={'dark'}
                    _hover={{ bg: 'dark', color: 'lightYellow' }}
                    height="40px"
                  >
                    <Flex align={'center'}>
                      {bc.imageURL ? (
                        <Image src={bc.imageURL} mr={2} w="30px" maxH="38px" />
                      ) : (
                        <Icon as={BsBook} mr={2} w="30px" maxH="38px" />
                      )}
                      {bc.bookClubId}
                    </Flex>
                  </MenuItem>
                  <MenuDivider />
                </Link>
              ))}
              {/* <>
                <Text userSelect={'none'} ml={2} fontWeight={'extrabold'}>
                  Currently Reading
                </Text>
                <MenuDivider />
              </>
              <MenuItem
                fontSize={{ base: '10pt', sm: '11pt', md: '12pt' }}
                color={'dark'}
                _hover={{ bg: 'dark', color: 'lightYellow' }}
                height="40px"
              >
                <Flex align={'center'}>
                  <Image
                    src="https://m.media-amazon.com/images/I/51UuSI9g6lL.jpg"
                    mr={2}
                    height="36px"
                  />
                  1984
                </Flex>
              </MenuItem>
              <MenuDivider />
              <>
                <Text userSelect={'none'} ml={2} fontWeight={'extrabold'}>
                  Finished
                </Text>
                <MenuDivider />
              </>
              <MenuItem
                fontSize={{ base: '10pt', sm: '11pt', md: '12pt' }}
                color={'dark'}
                _hover={{ bg: 'dark', color: 'lightYellow' }}
                height="40px"
              >
                <Flex align={'center'}>
                  <Image
                    src="https://m.media-amazon.com/images/I/91TpAAdiBLL.jpg"
                    mr={2}
                    height="36px"
                  />
                  Hitchhiker's Guide to the Galaxy
                </Flex>
              </MenuItem>
              <MenuDivider /> */}
              <BookClub />
            </MenuList>
          </Menu>
        </Flex>
      )}
    </>
  );
};
export default Library;
