import React from "react";

type Props = { children: React.ReactNode };

export const Menu = ({ children }: Props) => {
  return <div className={`react-menu`}>{children}</div>;
};

export const MenuItem = ({ children }: Props) => {
  return <div className={`react-menu-item`}>{children}</div>;
};
