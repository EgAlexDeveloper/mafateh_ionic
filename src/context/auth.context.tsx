// import { UserCredential } from "firebase/auth";
import React, { FC, HTMLAttributes, useState } from "react";

export type Auth = {
  updateIsLoggedInState: (isLoggedIn: boolean) => void;
  getIsLoggedInState: () => boolean;

  // updateUserState: (user: UserCredential) => void;
  // getUserState: () => UserCredential;
}

export const AuthContext = React.createContext<Auth | null>(null);

interface Props extends HTMLAttributes<HTMLDivElement> { }

const AuhtProvider: FC<Props> = (props: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [user, setUser] = useState<UserCredential>();

  const updateIsLoggedInState = (isLoggedIn: boolean): void => setIsLoggedIn(isLoggedIn);
  // const updateUserState = (user: UserCredential): void => setUser(user);

  const getIsLoggedInState = (): boolean => isLoggedIn;
  // const getUserState = (): UserCredential => user!;

  return (
    <>{props.children}</>
    // <AuthContext.Provider value={{ updateIsLoggedInState, getIsLoggedInState, updateUserState, getUserState }}>
    //   {props.children}
    // </AuthContext.Provider>
  );
}

export default AuhtProvider;