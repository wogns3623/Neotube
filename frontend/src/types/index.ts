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
  username: string;
  email: string;
  id: string;
  first_name: string;
  last_name: string;
  image: string;
};
