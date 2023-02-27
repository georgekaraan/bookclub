import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue
} from '@chakra-ui/react';

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg="white"
      boxShadow={'lg'}
      p={8}
      // rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
  bookclub
}: {
  src: string;
  name: string;
  title: string;
  bookclub: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={0} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Flex>
          <Text fontSize={'sm'} color="gray.600">
            {title}
          </Text>
          <Text fontSize={'sm'} ml={1} fontStyle="italic" color="gray.600">
            {bookclub}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default function WithSpeechBubbles() {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} py={8} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Our Members</Heading>
          <Text>Reading and Experiencing Books Together</Text>
        </Stack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Engaging Discussions</TestimonialHeading>
              <TestimonialText>
                This bookclub platform has transformed the way I read and
                discuss books. It's so fun to vote on which book to read next,
                and the discussions are always so engaging. The polls are a
                great way to gauge interest in a book, and it's awesome to see
                so many people excited about reading and learning together. I'm
                so glad I found this platform!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src="https://www.fakepersongenerator.com/Face/female/female1022989974365.jpg"
              name={'ethel_r'}
              title={'member of '}
              bookclub={' orwell-fans'}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Reading Revolution</TestimonialHeading>
              <TestimonialText>
                I've always wanted to be part of a bookclub, but never had the
                time or the opportunity to join one. This platform has changed
                everything for me! It's so easy to use and has connected me with
                like-minded people who love to read. I'm now reading books I
                never would have picked up on my own and I'm loving it!
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://www.fakepersongenerator.com/Face/male/male1085160727417.jpg'
              }
              name={'jackkk'}
              title={'creator of'}
              bookclub="discworld"
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Community Connection</TestimonialHeading>
              <TestimonialText>
                I absolutely love this bookclub platform! It's so easy to use
                and has brought me closer to my friends and colleagues. We've
                read books I would never have thought to read on my own, and the
                discussions have been so thought-provoking. It's great to have a
                community to share your thoughts with.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={
                'https://www.fakepersongenerator.com/Face/female/female2011102345166925.jpg'
              }
              name={'myra_cooper'}
              title={'moderator of'}
              bookclub="a-thriller-a-month"
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
