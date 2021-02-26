import React from "react";

export const UserContext = React.createContext<{
  profile:
    | {
        username: string;
        email: string;
        id: string;
        first_name: string;
        last_name: string;
        image: string;
      }
    | undefined;
}>({
  profile: undefined,
});
