import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { BookClub } from '@/atoms/bookClubsAtom';

type AboutProps = {
  bcData: BookClub;
};

const About: React.FC<AboutProps> = ({ bcData }) => {
  return (
    <>
      <Text>{bcData.about ? bcData.about : 'No info was provided 🥹'}</Text>
    </>
  );
};
export default About;
