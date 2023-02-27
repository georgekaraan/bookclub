import {
  Box,
  chakra,
  Flex,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsBookFill } from 'react-icons/bs';
import { RiTeamFill } from 'react-icons/ri';
import { FaBookReader } from 'react-icons/fa';

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      // rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  return (
    <Flex
      justify="center"
      // bg="gray.100"
      px="20px"
    >
      <Box
        maxW="1280px"
        mx={'auto'}
        pt={4}
        px={{ base: 4, sm: 12, md: '16px' }}
        mb={10}
        w="100%"
      >
        <Heading
          textAlign={'center'}
          fontSize={'4xl'}
          py={10}
          // fontWeight={'bold'}
        >
          Here are some of our stats!
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={'Readers'}
            stat={'212'}
            icon={<FaBookReader size={'3em'} />}
          />
          <StatsCard
            title={'Bookclubs'}
            stat={'29'}
            icon={<RiTeamFill size={'3em'} />}
          />
          <StatsCard
            title={'Books Read'}
            stat={'32'}
            icon={<BsBookFill size={'3em'} />}
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
