import { Stack } from '@chakra-ui/react';
import React from 'react';
import Hero from './Hero';
import SplitScreen from './SplitScreen';
import Statistics from './Statistics';
import Testimonial from './Testimonial';

type VisitorProps = {};

const Visitor: React.FC<VisitorProps> = () => {
  return (
    <>
      <Stack direction="column" w="100%" justify="center">
        <Hero />
        <Statistics />
        <SplitScreen />
        <Testimonial />
      </Stack>
    </>
  );
};
export default Visitor;
