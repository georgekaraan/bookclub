import { Book } from '@/atoms/bookAtom';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const apiKey = process.env.GOOGLE_BOOKS_API;
    try {
        const { q } = req.query;
        const url = `https://openlibrary.org/search.json?q=title:${q}&limit=10&mode=books`;
        const response = await fetch(url);
        const data = await response.json();


        const filteredBooks = data.docs.map((doc: any) => {
          const book: Book = {
            title: doc.title,
            authors: doc.author_name[0],
            addedOn: serverTimestamp() as Timestamp,
            category: doc.subject,
            googleLink: `https://books.google.com/books?id=${doc.key.slice(7)}&dq=${q}&source=gbs_book_similarbooks`,
            id: doc.isbn ? doc.isbn[0] : 'Cannot be found',
            pageCount: doc.number_of_pages_median,
            publishedDate: doc.publish_date[0],
            publisher: doc.publisher,
            imageURL: `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          };
          return book;
        });

        res.status(200).json(filteredBooks);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data from Google Books API' });
      }

  }
