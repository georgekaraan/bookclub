import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Book {
    id?: string,
    authors: string[],
    title: string,
    publisher: string,
    publishedDate: string,
    pageCount: number,
    addedOn: Timestamp,
    imageURL?: string,
    bookClubId?: string,
    category: string[],
    startDate?: Timestamp,
    endDate?: Timestamp,
    schedule?: object[],
    numberOfActiveReaders?: number,
    numberofReads?: number,
    googleLink: string,
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