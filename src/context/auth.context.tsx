import React, { createContext } from "react";

export class Auth {
  isLoggedIn: boolean = false
}

export const AuthContext = createContext<Auth>(new Auth());