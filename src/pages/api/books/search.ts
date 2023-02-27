import { Book } from '@/atoms/bookAtom';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const apiKey = process.env.GOOGLE_BOOKS_API;
    try {
        const { q } = req.query;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${apiKey}&langRestrict=en&orderBy=relevance&printType=books`;
        const response = await fetch(url);
        const data = await response.json();

        const filteredBooks = data.items.map((item: any) => {
          const book: Book = {
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            addedOn: serverTimestamp() as Timestamp,
            category: item.volumeInfo.categories,
            googleLink: item.volumeInfo.previewLink,
            id:
              item.volumeInfo.industryIdentifiers?.filter(
                (isbn: any) => isbn.type === 'ISBN_13'
              )[0]?.identifier || 'Cannot be found',
            pageCount: item.volumeInfo.pageCount,
            publishedDate: item.volumeInfo.publishedDate,
            publisher: item.volumeInfo.publisher,
            imageURL: item.volumeInfo.imageLinks?.thumbnail
          };
          return book;
        });

        res.status(200).json(filteredBooks);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from Google Books API' });
      }

  }
