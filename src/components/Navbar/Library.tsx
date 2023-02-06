import { auth } from '@/firebase/clientApp';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Image,
  Flex,
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuDivider,
  MenuItem,
  Text
} from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaBookOpen } from 'react-icons/fa';
import AddBookModal from '../Modal/CreateBookClub/CreateBookClub';
import BookClub from './BookClub';

type LibraryProps = {
  user?: User | null;
};

const Library: React.FC<LibraryProps> = ({ user }) => {
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
            <MenuList w={{ base: '200px', sm: '300px' }}>
              <>
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
                  {/* <Icon as={BsFillPersonFill} fontSize="14pt" mr={2} /> */}
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
                  {/* <Icon as={BsFillPersonFill} fontSize="14pt" mr={2} /> */}
                  <Image
                    src="https://m.media-amazon.com/images/I/91TpAAdiBLL.jpg"
                    mr={2}
                    height="36px"
                  />
                  Hitchhiker's Guide to the Galaxy
                </Flex>
              </MenuItem>
              <MenuDivider />
              <BookClub />
            </MenuList>
          </Menu>
        </Flex>
      )}
    </>
  );
};
export default Library;
