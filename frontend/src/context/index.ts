import React from "react";
import { UserProfile } from "types";

interface UserInfo {
  profile: UserProfile | null;
  token: string | null;
}

export const UserContext = React.createContext<UserInfo>({
  profile: null,
  token: null,
});
