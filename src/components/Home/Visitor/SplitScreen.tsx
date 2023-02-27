import { authModalState } from '@/atoms/authModalAtom';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';

export default function SplitScreen() {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Stack direction={{ base: 'column', md: 'row' }} px="20px">
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'gray.400',
                zIndex: -1
              }}
            >
              More than Just a
            </Text>
            <br />{' '}
            <Text color={'gray.400'} as={'span'}>
              Book Club
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Find your next favorite book and connect with like-minded readers -
            our platform makes starting and running a bookclub easy and fun,
            whether you're looking to join an existing group or create your own
            online bookclub.
          </Text>
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing={4}
            // align="center"
          >
            <Button
              onClick={() => setAuthModalState({ open: true, view: 'signup' })}
              variant="light"
              size={{ base: 'md', md: 'lg' }}
            >
              Create Your Bookclub
            </Button>
            <Button
              onClick={() => setAuthModalState({ open: true, view: 'signup' })}
              size={{ base: 'md', md: 'lg' }}
            >
              Join a Bookclub
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} maxW="700px" justify="center">
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://firebasestorage.googleapis.com/v0/b/lex-book-club.appspot.com/o/Home%2Fbookclub2.png?alt=media&token=0edda5c6-388a-4211-a69a-0c8b402e0db6'
          }
          p={{ base: 4, md: 10 }}
        />
      </Flex>
    </Stack>
  );
}
