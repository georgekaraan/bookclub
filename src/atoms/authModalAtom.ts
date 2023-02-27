import { atom } from "recoil";

export interface AuthModalState {
    open: boolean,
    view: "login" | "signup" | "resetPassword" | "firstTime"
}

const defaultModalState: AuthModalState = {
    open: false,
    view: "login"
}

export const authModalState = atom<AuthModalState>({
    key: 'authModalState',
    default: defaultModalState
})

export type ModalView = "login" | "signup" | "resetPassword";