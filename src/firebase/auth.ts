import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { LoginPayload } from "./types";

export const signin = (payload: LoginPayload): Promise<UserCredential> => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, payload.email, payload.password);
}


export const register = (payload: LoginPayload): Promise<UserCredential> => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, payload.email, payload.password);
}