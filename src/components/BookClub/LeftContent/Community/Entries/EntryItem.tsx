import { Entry } from '@/atoms/entryAtom';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import { ImHeart, ImHeartBroken } from 'react-icons/im';

type EntryItemProps = {
  entry: Entry;
  userIsCreator: boolean;
  userVote?: number;
  onVote: () => {};
  onDelete: () => {};
  onSelect: () => {};
};

const EntryItem: React.FC<EntryItemProps> = ({
  entry,
  userIsCreator,
  userVote,
  onVote,
  onDelete,
  onSelect
}) => {
  return (
    <Flex border="1px solid" borderColor={'gray.200'} boxShadow={'sm'}>
      {entry.title}
    </Flex>
  );
};
export default EntryItem;
