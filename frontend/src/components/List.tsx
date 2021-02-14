import React from "react";

import "styles/List.scss";

type ListProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  direction?: "row" | "column";
};
const List = ({ children, className, id, direction }: ListProps) => {
  return (
    <div id={id} className={`react-list react-list-${direction} ${className}`}>
      {children}
    </div>
  );
};

List.defaultProps = {
  className: "",
  id: "",
  direction: "row",
};

export default List;
