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
    members: [string]
}