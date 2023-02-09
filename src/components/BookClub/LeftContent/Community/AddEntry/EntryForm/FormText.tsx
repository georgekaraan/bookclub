import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';
import React from 'react';

type FormTextProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleAddEntry: () => void;
  loading: boolean;
};

const FormText: React.FC<FormTextProps> = ({
  textInputs,
  onChange,
  handleAddEntry,
  loading
}) => {
  return (
    <Stack spacing={3} w="100%" height="250px">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize="10pt"
        placeholder="Title"
        _placeholder={{ color: 'gray.400' }}
        _focus={{ border: '1px solid', borderColor: 'dark' }}
      />
      <Textarea
        placeholder="Tell us more..."
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="10pt"
        height="150px"
        _placeholder={{ color: 'gray.400' }}
        _focus={{ border: '1px solid', borderColor: 'dark' }}
      />
      <Flex justify={'flex-end'}>
        <Button
          isLoading={loading}
          onClick={handleAddEntry}
          disabled={!textInputs.title}
          variant={'light'}
        >
          Share
        </Button>
      </Flex>
    </Stack>
  );
};
export default FormText;
