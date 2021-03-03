import React from "react";
import { UserProfile } from "types";

interface UserInfo {
  token: string | null;
  changeToken: (value?: string | undefined) => void;
  profile: UserProfile | null;
}

export const UserContext = React.createContext<UserInfo>({
  token: null,
  changeToken: () => {},
  profile: null,
});
