import { auth, firestore } from '@/firebase/clientApp';
import {
  chakra,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { BiLike, BiLogOut } from 'react-icons/bi';
import { FaBookReader } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { User } from 'firebase/auth';
import { useResetRecoilState } from 'recoil';
import { bookClubState } from '@/atoms/bookClubsAtom';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import useUser from '@/hooks/useUser';

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter();

  const { userName } = useUser();

  const resetBcState = useResetRecoilState(bookClubState);
  const logout = async () => {
    await signOut(auth);
    resetBcState();
    router.push('/');
  };

  return (
    <Flex>
      <Menu autoSelect={false}>
        <MenuButton borderRadius={'50%'} mr="10px">
          <Flex p="4px">
            <Icon
              as={IoMdNotificationsOutline}
              color="lightYellow"
              boxSize={{ base: '24px', sm: '36px' }}
            />
          </Flex>
        </MenuButton>
        <MenuList borderRadius="0%">
          <MenuItem
            fontSize={{ base: '10pt', sm: '12pt', md: '14pt' }}
            color={'dark'}
            cursor="default"
            _hover={{ bg: 'lightYellow' }}
            // pointerEvents="none"
          >
            <Flex align={'center'}>
              <Icon as={BiLike} fontSize="14pt" mr={2} />
              JohnK liked your comment on{'  '}
              <chakra.span cursor={'pointer'} fontWeight="bold">
                1984: Chapter 2
              </chakra.span>
            </Flex>
          </MenuItem>
          {/* <MenuDivider /> */}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton
          mr="10px"
          borderRadius={'50%'}
          bgColor="gray.600"
          _hover={{
            bgColor: 'gray.500',
            outline: '1px solid',
            outlineColor: 'lightYellow'
          }}
        >
          <Flex p="4px">
            <>
              <Icon
                color={'lightYellow'}
                _hover={{ color: 'dark' }}
                boxSize={{ base: '24px', sm: '36px' }}
                borderRadius={'50%'}
                as={FaBookReader}
              />
            </>
          </Flex>
        </MenuButton>
        <MenuList borderRadius="0%">
          {user && (
            <>
              <Text ml={2} fontWeight={'extrabold'}>
                {/* {user.displayName || user.email?.split('@')[0]} */}
                {userName}
              </Text>
              <MenuDivider />
            </>
          )}
          <MenuItem
            fontSize={{ base: '10pt', sm: '12pt', md: '14pt' }}
            color={'dark'}
            _hover={{ bg: 'dark', color: 'lightYellow' }}
            onClick={() => router.push('/profile')}
          >
            <Flex align={'center'}>
              <Icon as={BsFillPersonFill} fontSize="14pt" mr={2} />
              Profile
            </Flex>
          </MenuItem>
          <MenuDivider />
          <MenuItem
            fontSize={{ base: '10pt', sm: '12pt', md: '14pt' }}
            color={'dark'}
            _hover={{ bg: 'dark', color: 'lightYellow' }}
            onClick={logout}
          >
            <Flex align={'center'}>
              <Icon as={BiLogOut} fontSize="14pt" pr={'3px'} mr={2} />
              Sign Out
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
export default UserMenu;
