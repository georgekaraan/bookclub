import { auth } from '@/firebase/clientApp';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls
} from '@chakra-ui/react';
import { updateProfile, User } from 'firebase/auth';

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type profileProps = {};

const profile: React.FC<profileProps> = () => {
  const [user] = useAuthState(auth);
  const [display, setDisplayName] = useState(user?.displayName as string);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(event.target.value);
  };

  const handleSubmit = async (name: string) => {
    try {
      await updateProfile(auth.currentUser as User, { displayName: name });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {user && (
        <Flex>
          <Flex w={'500px'} height="500px" justify="center" align={'center'}>
            <Input
              placeholder="Enter display name :)"
              defaultValue={user?.displayName as string}
              //   value={display}
              onChange={handleChange}
            />
            <Button onClick={() => handleSubmit(display)}>Submit</Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default profile;
