import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Book {
    id?: string,
    author: string,
    author2?: string,
    title: string,
    edition?: number,
    publisher?: string,
    publishedDate?: string,
    pageCount: number,
    addedOn: Timestamp,
    imageURL?: string,
    bookClubId?: string,
    category: string[],
    startDate?: Timestamp,
    endDate?: Timestamp,
    schedule?: object[],
    numberOfActiveReaders?: number,
    numberOfReads?: number,
    googleLink?: string,
    amazonLink?: string

}

export interface BookSnippet {
    bookId: string,
    bookClubId: string,
    isRead: boolean,
    currentCh: number,
    imageURL?: string,
}

// interface BookClubState {
//     mySnippets: BcSnippet[],
//     currentBC?: BookClub
// }

// const defaultBookClubState: BookClubState = {
//     mySnippets: []
// }

// export const bookClubState = atom<BookClubState>({
//     key: 'bookClubState',
//     default: defaultBookClubState
// })