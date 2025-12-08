import { createContext } from "react";
import type { User } from "../models/user";

export type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const CurrentUserContext = createContext<UserContextType | undefined>(
  undefined
);
