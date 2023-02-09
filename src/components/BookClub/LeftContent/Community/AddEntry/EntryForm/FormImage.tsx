import { Button, Flex, HStack, Image } from '@chakra-ui/react';
import React, { useRef } from 'react';

type FormImageProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedFile: (value: string) => void;
  setTabIndex: (index: number) => void;
};

const FormImage: React.FC<FormImageProps> = ({
  onSelectImage,
  selectedFile,
  setSelectedFile,
  setTabIndex
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      direction={'column'}
      justify={'center'}
      align="center"
      width={'100%'}
      height="250px"
    >
      {selectedFile ? (
        <>
          <Flex direction={'column'} align={'center'}>
            <Image src={selectedFile} maxW="180px" maxH={'180px'} />
            <HStack>
              <Button variant={'light'} onClick={() => setTabIndex(0)}>
                Back to Post
              </Button>
              <Button onClick={() => setSelectedFile('')}>Remove</Button>
            </HStack>
          </Flex>
        </>
      ) : (
        <Flex justify={'center'} align="center">
          <Button
            variant={'outline'}
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            Add Image
          </Button>
          <input
            accept="image/*"
            type="file"
            ref={inputRef}
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default FormImage;
