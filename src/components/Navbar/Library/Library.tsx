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
import BookClub from '../BookClub';
import LibraryItems from './LibraryItems';

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
              {!!mySnippets.find((bc) => bc.isOwner) && (
                <>
                  <Text userSelect={'none'} ml={2} fontWeight={'extrabold'}>
                    Creator of
                  </Text>
                  <MenuDivider />
                  {mySnippets
                    .filter((bc) => bc.isOwner)
                    .map((bc) => {
                      if (bc.isOwner) {
                        return <LibraryItems bc={bc} />;
                      }
                    })}
                </>
              )}
              {!!mySnippets.find((bc) => !bc.isOwner) && (
                <>
                  <Text userSelect={'none'} ml={2} fontWeight={'extrabold'}>
                    Member of
                  </Text>
                  <MenuDivider />
                  {mySnippets
                    .filter((bc) => !bc.isOwner)
                    .map((bc) => (
                      <LibraryItems key={bc.bookClubId} bc={bc} />
                    ))}
                </>
              )}
              <BookClub />
            </MenuList>
          </Menu>
        </Flex>
      )}
    </>
  );
};
export default Library;
