import * as React from 'react';
import {
  Container,
  chakra,
  Stack,
  Text,
  Button,
  Box,
  Heading,
  Flex
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaGithub } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

const HeroSection = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <Flex
      justify="center"
      p={{ base: 8, sm: 14 }}
      h="90vh"
      align="center"
      background={
        'linear-gradient(90deg, rgba(237,242,246,1) 0%, rgba(255,255,255,1) 51%, rgba(237,242,246,1) 100%)'
      }
    >
      <Stack direction="column" spacing={6} alignItems="center" maxW={'450px'}>
        <Box
          py={2}
          px={3}
          bg="gray.200"
          w="max-content"
          color="dark"
          rounded="md"
          fontSize="sm"
          borderRadius="0px"
        >
          {/* <Stack direction={{ base: 'column', sm: 'row' }}> */}
          <Text fontWeight="bold">Ready, Select, Read, Discuss! 💬</Text>
          {/* <Text>Join a bookclub!</Text> */}
          {/* </Stack> */}
        </Box>
        <Heading
          fontSize={{ base: '4xl', sm: '5xl' }}
          fontWeight="bold"
          textAlign="center"
          maxW="600px"
        >
          Create or Join a Bookclub{' '}
          <chakra.span
            fontFamily="heading"
            color="gray.600"
            bg="linear-gradient(transparent 50%, #adadad 75%)"
          >
            with Ease
          </chakra.span>
        </Heading>
        <Text maxW="550px" fontSize="xl" textAlign="center" color="gray.500">
          Our Platform is the Perfect Place to Discover New Books and Discuss
          Them with a Community of Readers.
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          w={{ base: '100%', sm: 'auto' }}
          spacing={5}
        >
          <Button
            onClick={() => setAuthModalState({ open: true, view: 'signup' })}
            variant="homeL"
          >
            Get Started
          </Button>
          <Button
            // colorScheme="gray"
            variant="outline"
            size="lg"
          >
            Explore
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default HeroSection;
