import {
  Box,
  color,
  Flex,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem
} from '@chakra-ui/react';
import React from 'react';
import { BsCircle, BsCircleFill } from 'react-icons/bs';

type CurrentlyReadingProps = {};

const CurrentlyReading: React.FC<CurrentlyReadingProps> = () => {
  return (
    <Flex>
      <HStack w={'100%'} h="50vh" justify={'space-between'}>
        <Image
          src="https://m.media-amazon.com/images/I/51UuSI9g6lL.jpg"
          mr={2}
          height="80%"
        />
        <Flex flexGrow={1} align="center" justify={'center'}>
          <List fontSize={18} spacing={8}>
            <ListItem
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: 'scale(1.1)'
              }}
              cursor="pointer"
            >
              <ListIcon as={BsCircleFill} color="dark" />
              Chapters 1 - 3
            </ListItem>
            <ListItem>
              <ListIcon as={BsCircleFill} color="dark" />
              Chapters 4 - 6
            </ListItem>
            <ListItem>
              <ListIcon as={BsCircleFill} color="dark" />
              Chapters 7 - 10
            </ListItem>
            {/* You can also use custom icons from react-icons */}
            <ListItem>
              <ListIcon
                transition="all 0.3s ease-in-out"
                animation="pulse 1s ease-in-out infinite"
                _hover={{
                  animation: 'none'
                }}
                as={BsCircle}
                color="dark"
              />
              Chapters 11-13
            </ListItem>
          </List>
        </Flex>
      </HStack>
    </Flex>
  );
};
export default CurrentlyReading;
