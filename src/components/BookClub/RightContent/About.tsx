import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

type AboutProps = {};

const About: React.FC<AboutProps> = () => {
  return (
    <Text>
      The George Orwell Book Club is a community of readers passionate about
      exploring the themes of power, government control, and the individual
      experience through the works of the iconic British author. Members come
      together to discuss classic works such as "1984" and "Animal Farm" and
      delve into the thought-provoking questions about society and human nature
      that Orwell raises in his writing. Whether you're a long-time fan or new
      to Orwell's work, this book club provides a space for meaningful
      discussion and exchange of ideas. Join us as we dive into the mind of one
      of the 20th century's most important writers.
    </Text>
  );
};
export default About;
