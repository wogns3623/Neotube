import React from "react";

import "styles/Menu.scss";

type MenuProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  direction?: "row" | "column";
};
const Menu = ({ children, className, id, direction }: MenuProps) => {
  return (
    <div id={id} className={`react-menu react-menu-${direction} ${className}`}>
      {children}
    </div>
  );
};

Menu.defaultProps = {
  className: "",
  id: "",
  direction: "row",
};

export default Menu;
