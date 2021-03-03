export type BasicProps = {
  className?: string;
};

export type SingleWrapperProps = BasicProps & {
  children: React.ReactNode;
};

export type MultipleWrapperProps = BasicProps & {
  children: React.ReactNodeArray;
};

export type ClickableProps = SingleWrapperProps & {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export type UserProfile = {
  user_id: number;
  username: string;
  email: string;
  // orig_iat: number;
  // exp: number;
};
