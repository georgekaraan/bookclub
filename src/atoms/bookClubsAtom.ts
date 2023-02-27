import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface BookClub {
    id: string,
    creatorId: string,
    createdAt?: Timestamp,
    numberOfMembers: number,
    numberOfBooks: number,
    privacyType: 'public' | 'private',
    imageURL?: string,
    currentBookId?: string,

}

export interface BcSnippet {
    bookClubId: string,
    isModerator?: boolean,
    isOwner?: boolean,
    imageURL?: string,
    currentBookId?: string
}

interface BookClubState {
    mySnippets: BcSnippet[],
    currentBC?: BookClub
}

const defaultBookClubState: BookClubState = {
    mySnippets: []
}

export const bookClubState = atom<BookClubState>({
    key: 'bookClubState',
    default: defaultBookClubState
})