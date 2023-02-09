import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Entry = {
    id?: string,
    bookClubId: string,
    bookId?: string,
    tag?: string,
    title: string,
    body: string,
    imageURL?: string,
    bookClubImageURL?: string,
    numberOfReplies: number,
    numberOfVotes: number,
    creatorId: string,
    creatorUserName: string,
    createdAt: Timestamp
}

interface EntryState {
    selectedEntry: Entry | null;
    entries: Entry[];
}

const defaultEntryState: EntryState = {
    selectedEntry: null,
    entries: [],
}

export const entryState = atom<EntryState>({
    key: 'entryState',
    default: defaultEntryState,

})