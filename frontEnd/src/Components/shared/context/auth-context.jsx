import { createContext } from "react";

// the values will be handled by the useAuth hook
export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});