import React from 'react';
import AddBook from '../Books/AddBook/AddBookButton';
import NextBook from './NextBook';
import ReadBooks from './ReadBooks';
import Wishlist from './Wishlist';

type LibraryProps = {};

const Library: React.FC<LibraryProps> = () => {
  return (
    <>
      <AddBook />
      <ReadBooks />
      <Wishlist />
      <NextBook />
    </>
  );
};
export default Library;
