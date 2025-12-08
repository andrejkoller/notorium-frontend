import React, { useState } from "react";
import type { User } from "../models/user";
import { CurrentUserContext } from "../contexts/user-context";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
