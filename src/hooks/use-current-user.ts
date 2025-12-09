import { useContext } from "react";
import { CurrentUserContext } from "../contexts/user-context";

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a UserProvider");
  }
  return context;
};
