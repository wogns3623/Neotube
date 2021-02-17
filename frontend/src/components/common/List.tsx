import React from "react";

import "styles/List.scss";

type ListProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "row" | "column";
};
const List = ({ children, className, direction }: ListProps) => {
  return (
    <div className={`react-list react-list-${direction} ${className}`}>
      {children}
    </div>
  );
};

List.defaultProps = {
  className: "",
  id: "",
  direction: "row",
};

Object.defineProperty(List, "component_name", {
  value: "List",
  writable: false,
});

export type { ListProps };
export default List;
