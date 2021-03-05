import React from "react";
import { UserProfile } from "types";

interface User {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  profile: UserProfile | null;
  signOut: () => void;
}

export const UserContext = React.createContext<User>({
  token: null,
  setToken: () => {},
  profile: null,
  signOut: () => {},
});
