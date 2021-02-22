import React from "react";

import "styles/List.scss";
import { MultipleWrapperProps } from "utils/types";

type ListProps = MultipleWrapperProps & {
  direction?: "row" | "column";
};
const List = ({ children, className, direction }: ListProps) => {
  return (
    <div
      className={`react-list react-list-${direction} ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};
List.defaultProps = {
  direction: "row",
};

export type { ListProps };
export default List;
