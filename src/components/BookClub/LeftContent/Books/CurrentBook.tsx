import {
  VStack,
  Heading,
  Box,
  Link,
  Container,
  BoxProps,
  Circle,
  Flex,
  useColorModeValue,
  keyframes
} from '@chakra-ui/react';
import { FaTools } from 'react-icons/fa';
// Here we have used react-icons package for the icons
import { FiPackage, FiHome, FiBarChart2, FiCheckCircle } from 'react-icons/fi';

const CurrentBookTimeline = () => {
  const linkColor = 'blue.400';
  const linkHoverColor = 'blue.600';

  return (
    <Container maxW="7xl" p={{ base: 2, sm: 10 }}>
      <VStack textAlign="start" align="start" mb={5}>
        <Box zIndex={5}>
          <Heading fontSize="4xl" fontWeight="600" my={5}>
            Progress
          </Heading>
          <Box>
            <StageItem icon={FiCheckCircle} done={true}>
              Ch 1, Ch 2, & Ch 3{' '}
            </StageItem>
            <StageItem animate={true}>Ch 4, Ch5, & Ch 6 </StageItem>
            <StageItem>Ch 7, Ch 8, & Ch 9 </StageItem>
            <StageItem>Ch 10, Ch 11, & Ch 12 </StageItem>
            <StageItem skipTrail>Ch 13</StageItem>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

interface StageItemProps extends BoxProps {
  icon?: any;
  boxProps?: BoxProps;
  skipTrail?: boolean;
  //   animation?: boolean;
  animate?: boolean;
  done?: boolean;
}

const StageItem: React.FC<StageItemProps> = ({
  icon,
  boxProps = {},
  skipTrail = false,
  animate = false,
  done = false,
  children,
  ...props
}) => {
  const color = useColorModeValue('gray.700', 'gray.500');

  const blinking = keyframes`
  from { opacity: 0.15; }
  to { opacity: 0.45; }
`;

  return (
    <Flex minH={20} {...props}>
      <Flex
        flexDir="column"
        alignItems="center"
        mr={4}
        pos="relative"
        zIndex={-1}
      >
        <Circle
          size={12}
          bg={!done ? 'gray.600' : 'green'}
          opacity={done ? '0.5' : '0.07'}
          animation={animate ? `${blinking} 1s infinite` : 'none'}
        />

        <Box
          as={icon}
          size="1.25rem"
          color={done ? 'green' : color}
          pos="absolute"
          left="0.875rem"
          top="0.875rem"
        />
        {!skipTrail && <Box w="1px" flex={1} bg={color} />}
      </Flex>
      <Box pt={{ base: 1, sm: 3 }} {...boxProps}>
        {children}
      </Box>
    </Flex>
  );
};

export default CurrentBookTimeline;
